import { useState, useEffect } from 'react';
import { Stack, Title, Select, Paper, Table, Text, Button, Group, Modal, TextInput, Textarea, NumberInput, ColorInput, Alert, Loader, Center, Badge } from '@mantine/core';
import { useAuth } from '@clerk/clerk-react';

const CONTENT_TYPES = [
  { value: 'flashcard_categories', label: 'Flashcard Categories' },
  { value: 'flashcards', label: 'Flashcards' },
  { value: 'mcq_questions', label: 'MCQ Questions' },
  { value: 'written_questions', label: 'Written Questions' },
  { value: 'checklist_sections', label: 'Checklist Sections' },
  { value: 'specimen_questions', label: 'Specimen Questions' },
  { value: 'history_questions', label: 'History Questions' },
  { value: 'subjects', label: 'Subjects' },
  { value: 'units', label: 'Units' },
  { value: 'subtopics', label: 'Subtopics' },
];

const FORM_FIELDS = {
  flashcard_categories: ['slug', 'label', 'color'],
  flashcards: ['term', 'definition', 'formula'],
  mcq_questions: ['category', 'difficulty', 'question', 'options', 'answer_index', 'explanation'],
  written_questions: ['category', 'difficulty', 'marks', 'question', 'model_answer', 'question_type'],
  checklist_sections: ['slug', 'title', 'color', 'items'],
  specimen_questions: ['label', 'question', 'marks', 'markscheme'],
  history_questions: ['paper', 'number', 'topic', 'question', 'marks', 'markscheme'],
  subjects: ['slug', 'name', 'color', 'sort_order'],
  units: ['slug', 'name', 'sort_order'],
  subtopics: ['slug', 'name', 'color', 'sort_order'],
};

export default function ContentManager() {
  const [contentType, setContentType] = useState('mcq_questions');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [committing, setCommitting] = useState(false);
  const [message, setMessage] = useState(null);
  const { getToken } = useAuth();

  const fetchContent = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(`/api/admin/content?type=${contentType}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) setItems(await res.json());
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContent(); }, [contentType]);

  const openCreate = () => { setEditItem(null); setFormData({}); setModalOpen(true); };
  const openEdit = (item) => { setEditItem(item); setFormData({ ...item }); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = await getToken();
      const url = editItem
        ? `/api/admin/content?type=${contentType}&id=${editItem.id}`
        : `/api/admin/content?type=${contentType}`;
      const body = { ...formData };
      if (contentType === 'mcq_questions' && typeof body.options === 'string') {
        try { body.options = JSON.parse(body.options); } catch {}
      }
      if (contentType === 'checklist_sections' && typeof body.items === 'string') {
        try { body.items = JSON.parse(body.items); } catch {}
      }
      const res = await fetch(url, {
        method: editItem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setModalOpen(false);
        setMessage({ type: 'success', text: `Content ${editItem ? 'updated' : 'created'} successfully` });
        fetchContent();
      } else {
        const err = await res.json();
        setMessage({ type: 'error', text: err.error });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    try {
      const token = await getToken();
      await fetch(`/api/admin/content?type=${contentType}&id=${id}`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchContent();
    } catch (err) { console.error(err); }
  };

  const handleCommitToGitHub = async () => {
    setCommitting(true);
    try {
      const token = await getToken();
      const res = await fetch('/api/admin/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ contentType, message: `[CMS] Update ${contentType}` }),
      });
      const data = await res.json();
      if (res.ok) setMessage({ type: 'success', text: `Committed to GitHub (${data.commitSha?.slice(0, 7)})` });
      else setMessage({ type: 'error', text: data.error });
    } catch (err) { setMessage({ type: 'error', text: err.message }); }
    finally { setCommitting(false); }
  };

  const fields = FORM_FIELDS[contentType] || [];
  const displayCols = fields.slice(0, 4);

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={4} c="white">Content Manager</Title>
        <Group>
          <Button variant="light" color="green" onClick={handleCommitToGitHub} loading={committing}>Commit to GitHub</Button>
          <Button color="violet" onClick={openCreate}>Add New</Button>
        </Group>
      </Group>
      <Select value={contentType} onChange={setContentType} data={CONTENT_TYPES} label="Content Type" styles={{ label: { color: '#999' } }} />
      {message && <Alert color={message.type === 'success' ? 'green' : 'red'} withCloseButton onClose={() => setMessage(null)}>{message.text}</Alert>}
      {loading ? <Center py="xl"><Loader color="violet" /></Center> : (
        <Paper radius="md" style={{ background: '#12121A', border: '1px solid #2A2A3A', overflow: 'auto' }}>
          <Table striped>
            <Table.Thead>
              <Table.Tr>
                {displayCols.map(col => <Table.Th key={col}>{col.replace(/_/g, ' ')}</Table.Th>)}
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items.map((item) => (
                <Table.Tr key={item.id}>
                  {displayCols.map(col => (
                    <Table.Td key={col}>
                      <Text size="sm" c="white" lineClamp={1}>
                        {typeof item[col] === 'object' ? JSON.stringify(item[col]).slice(0, 50) : String(item[col] ?? '')}
                      </Text>
                    </Table.Td>
                  ))}
                  <Table.Td>
                    <Group gap="xs">
                      <Button size="xs" variant="light" color="blue" onClick={() => openEdit(item)}>Edit</Button>
                      <Button size="xs" variant="light" color="red" onClick={() => handleDelete(item.id)}>Delete</Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
              {items.length === 0 && (
                <Table.Tr><Table.Td colSpan={displayCols.length + 1}><Text c="dimmed" ta="center" py="md">No content found.</Text></Table.Td></Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Paper>
      )}
      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Content' : 'Add New Content'} size="lg">
        <Stack gap="sm">
          {fields.map(field => {
            if (field === 'difficulty') return <Select key={field} label="Difficulty" value={formData[field] || ''} onChange={(v) => setFormData(p => ({ ...p, [field]: v }))} data={['SL', 'HL', 'SL/HL']} />;
            if (field === 'question_type') return <Select key={field} label="Question Type" value={formData[field] || 'short'} onChange={(v) => setFormData(p => ({ ...p, [field]: v }))} data={[{ value: 'short', label: 'Short' }, { value: 'extended', label: 'Extended' }]} />;
            if (field === 'paper') return <Select key={field} label="Paper" value={formData[field] || 'paper2'} onChange={(v) => setFormData(p => ({ ...p, [field]: v }))} data={[{ value: 'paper2', label: 'Paper 2' }, { value: 'paper3', label: 'Paper 3' }]} />;
            if (field === 'color') return <ColorInput key={field} label="Color" value={formData[field] || '#7C6FFF'} onChange={(v) => setFormData(p => ({ ...p, [field]: v }))} />;
            if (['marks', 'answer_index', 'sort_order', 'number'].includes(field)) return <NumberInput key={field} label={field.replace(/_/g, ' ')} value={formData[field] ?? 0} onChange={(v) => setFormData(p => ({ ...p, [field]: v }))} />;
            if (['question', 'model_answer', 'markscheme', 'definition', 'explanation', 'items', 'options'].includes(field)) return <Textarea key={field} label={field.replace(/_/g, ' ') + (['options', 'items'].includes(field) ? ' (JSON array)' : '')} value={typeof formData[field] === 'object' ? JSON.stringify(formData[field], null, 2) : (formData[field] || '')} onChange={(e) => setFormData(p => ({ ...p, [field]: e.target.value }))} minRows={3} autosize />;
            return <TextInput key={field} label={field.replace(/_/g, ' ')} value={formData[field] || ''} onChange={(e) => setFormData(p => ({ ...p, [field]: e.target.value }))} />;
          })}
          <Group justify="flex-end" mt="md">
            <Button variant="subtle" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button color="violet" onClick={handleSave} loading={saving}>{editItem ? 'Update' : 'Create'}</Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
