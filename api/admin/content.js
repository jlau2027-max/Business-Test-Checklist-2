import { getSupabaseAdmin } from '../lib/supabase-admin.js';
import { verifyAdmin } from '../lib/verify-admin.js';

const VALID_TYPES = {
  checklist_sections: 'checklist_sections',
  flashcard_categories: 'flashcard_categories',
  flashcards: 'flashcards',
  mcq_questions: 'mcq_questions',
  written_questions: 'written_questions',
  specimen_papers: 'specimen_papers',
  specimen_questions: 'specimen_questions',
  history_questions: 'history_questions',
  subjects: 'subjects',
  units: 'units',
  subtopics: 'subtopics',
};

export default async function handler(req, res) {
  try {
    await verifyAdmin(req);
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }

  const supabase = getSupabaseAdmin();
  const { type, id } = req.query;

  if (!type || !VALID_TYPES[type]) {
    return res.status(400).json({ error: 'Invalid content type', validTypes: Object.keys(VALID_TYPES) });
  }

  const table = VALID_TYPES[type];

  // GET - List content
  if (req.method === 'GET') {
    if (id) {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).single();
      if (error) return res.status(404).json({ error: 'Not found' });
      return res.json(data);
    }

    const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  }

  // POST - Create
  if (req.method === 'POST') {
    const items = Array.isArray(req.body) ? req.body : [req.body];
    const { data, error } = await supabase.from(table).insert(items).select();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  // PUT - Update
  if (req.method === 'PUT') {
    if (!id) return res.status(400).json({ error: 'ID required for update' });
    const { data, error } = await supabase
      .from(table)
      .update({ ...req.body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  }

  // DELETE
  if (req.method === 'DELETE') {
    if (!id) return res.status(400).json({ error: 'ID required for delete' });
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(204).end();
  }

  res.status(405).json({ error: 'Method not allowed' });
}
