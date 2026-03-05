import { Octokit } from '@octokit/rest';
import { getSupabaseAdmin } from '../lib/supabase-admin.js';
import { verifyAdmin } from '../lib/verify-admin.js';

const CONTENT_TABLES = {
  'business/checklist-sections': 'checklist_sections',
  'business/flashcard-categories': 'flashcard_categories',
  'business/flashcards': 'flashcards',
  'business/mcq-questions': 'mcq_questions',
  'business/written-questions': 'written_questions',
  'history/paper2-questions': { table: 'history_questions', filter: { paper: 'paper2' } },
  'history/paper3-questions': { table: 'history_questions', filter: { paper: 'paper3' } },
  'specimen/papers': 'specimen_papers',
  'specimen/questions': 'specimen_questions',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let adminInfo;
  try {
    adminInfo = await verifyAdmin(req);
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }

  const { contentType, message: commitMsg } = req.body;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;

  if (!owner || !repo || !token) {
    return res.status(500).json({ error: 'GitHub configuration missing' });
  }

  const supabase = getSupabaseAdmin();
  const octokit = new Octokit({ auth: token });

  try {
    // Build files to commit
    const filesToCommit = [];

    const typesToExport = contentType
      ? Object.entries(CONTENT_TABLES).filter(([key]) => key.includes(contentType))
      : Object.entries(CONTENT_TABLES);

    for (const [path, config] of typesToExport) {
      const tableName = typeof config === 'string' ? config : config.table;
      let query = supabase.from(tableName).select('*').order('created_at');

      if (typeof config === 'object' && config.filter) {
        for (const [key, value] of Object.entries(config.filter)) {
          query = query.eq(key, value);
        }
      }

      const { data } = await query;
      filesToCommit.push({
        path: `content/${path}.json`,
        content: JSON.stringify(data || [], null, 2),
      });
    }

    // Get current main branch ref
    const { data: ref } = await octokit.git.getRef({ owner, repo, ref: 'heads/main' });
    const latestCommitSha = ref.object.sha;

    // Get the tree of the latest commit
    const { data: commit } = await octokit.git.getCommit({
      owner, repo, commit_sha: latestCommitSha,
    });

    // Create blobs for each file
    const treeItems = await Promise.all(
      filesToCommit.map(async (file) => {
        const { data: blob } = await octokit.git.createBlob({
          owner, repo,
          content: Buffer.from(file.content).toString('base64'),
          encoding: 'base64',
        });
        return {
          path: file.path,
          mode: '100644',
          type: 'blob',
          sha: blob.sha,
        };
      })
    );

    // Create new tree
    const { data: newTree } = await octokit.git.createTree({
      owner, repo,
      base_tree: commit.tree.sha,
      tree: treeItems,
    });

    // Create commit
    const finalMessage = commitMsg || `[CMS] Update content (${new Date().toISOString()})`;
    const { data: newCommit } = await octokit.git.createCommit({
      owner, repo,
      message: finalMessage,
      tree: newTree.sha,
      parents: [latestCommitSha],
    });

    // Update main branch ref
    await octokit.git.updateRef({
      owner, repo,
      ref: 'heads/main',
      sha: newCommit.sha,
    });

    // Log the commit
    await supabase.from('content_commits').insert({
      admin_clerk_id: adminInfo.clerkUserId,
      commit_sha: newCommit.sha,
      commit_message: finalMessage,
      files_changed: filesToCommit.map(f => f.path),
      status: 'committed',
    });

    res.json({
      success: true,
      commitSha: newCommit.sha,
      filesChanged: filesToCommit.map(f => f.path),
    });
  } catch (error) {
    console.error('GitHub commit error:', error);

    // Log failed commit
    await supabase.from('content_commits').insert({
      admin_clerk_id: adminInfo.clerkUserId,
      commit_sha: null,
      commit_message: commitMsg || 'Failed commit attempt',
      files_changed: [],
      status: 'failed',
      error_message: error.message,
    });

    res.status(500).json({ error: 'GitHub commit failed', details: error.message });
  }
}
