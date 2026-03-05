import { useState } from 'react';
import { Stack, Title, Textarea, Select, NumberInput, Button, Paper, Text, Group, TextInput, Alert, Badge } from '@mantine/core';
import { useAuth } from '@clerk/clerk-react';

export default function AIContentGenerator() {
  const [text, setText] = useState('');
  const [contentType, setContentType] = useState('mcq');
  const [count, setCount] = useState(5);
  const [difficulty, setDifficulty] = useState('SL');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState([]);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState(null);
  const { getToken } = useAuth();

  const handleGenerate = async () => {
    if (!text.trim()) { setMessage({ type: 'error', text: 'Please enter some study material' }); return; }
    setGenerating(true); setMessage(null);
    try {
      const token = await getToken();
      const res = await fetch('/api/admin/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ text: text.trim(), contentType, count, difficulty }),
      });
      const data = await res.json();
      if (res.ok) { setGenerated(data.generated || []); setMessage({ type: 'success', text: `Generated ${data.count} items` }); }
      else setMessage({ type: 'error', text: data.error || 'Generation failed' });
    } catch (err) { setMessage({ type: 'error', text: err.message }); }
    finally { setGenerating(false); }
  };

  const removeItem = (index) => setGenerated(prev => prev.filter((_, i) => i !== index));
  const updateItem = (index, field, value) => setGenerated(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));

  const handlePublish = async () => {
    if (generated.length === 0) return;
    setPublishing(true);
    try {
      const token = await getToken();
      const tableMap = { mcq: 'mcq_questions', flashcard: 'flashcards', written: 'written_questions' };
      const res = await fetch(`/api/admin/content?type=${tableMap[contentType]}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(generated),
      });
      if (res.ok) {
        setMessage({ type: 'success', text: `Published ${generated.length} items!` });
        setGenerated([]);
        await fetch('/api/admin/commit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ contentType: tableMap[contentType], message: `[AI] Generated ${generated.length} ${contentType} items` }),
        });
      } else { const err = await res.json(); setMessage({ type: 'error', text: err.error }); }
    } catch (err) { setMessage({ type: 'error', text: err.message }); }
    finally { setPublishing(false); }
  };

  return (
    <Stack gap="lg">
      <Title order={4} c="white">AI Content Generator</Title>
      <Text c="dimmed" size="sm">Paste study material below. AI will generate questions or flashcards from the content.</Text>
      <Textarea label="Study Material" placeholder="Paste study notes, textbook content, or relevant material..." value={text} onChange={(e) => setText(e.target.value)} minRows={6} autosize styles={{ label: { color: '#999' } }} />
      <Group>
        <Select label="Content Type" value={contentType} onChange={setContentType} data={[{ value: 'mcq', label: 'Multiple Choice' }, { value: 'flashcard', label: 'Flashcards' }, { value: 'written', label: 'Written Questions' }]} styles={{ label: { color: '#999' } }} style={{ flex: 1 }} />
        <NumberInput label="Count" value={count} onChange={setCount} min={1} max={20} styles={{ label: { color: '#999' } }} style={{ width: 100 }} />
        {contentType !== 'flashcard' && <Select label="Difficulty" value={difficulty} onChange={setDifficulty} data={['SL', 'HL', 'SL/HL']} styles={{ label: { color: '#999' } }} style={{ width: 120 }} />}
      </Group>
      <Button color="violet" onClick={handleGenerate} loading={generating} disabled={!text.trim()}>Generate with AI</Button>
      {message && <Alert color={message.type === 'success' ? 'green' : 'red'} withCloseButton onClose={() => setMessage(null)}>{message.text}</Alert>}
      {generated.length > 0 && (
        <Stack gap="md">
          <Group justify="space-between">
            <Title order={5} c="white">Generated ({generated.length} items)</Title>
            <Group>
              <Button variant="light" color="red" size="xs" onClick={() => setGenerated([])}>Clear All</Button>
              <Button color="green" onClick={handlePublish} loading={publishing}>Publish All & Commit</Button>
            </Group>
          </Group>
          {generated.map((item, index) => (
            <Paper key={index} p="md" radius="md" style={{ background: '#12121A', border: '1px solid #2A2A3A' }}>
              <Group justify="space-between" mb="sm">
                <Badge color="violet" variant="light">#{index + 1}</Badge>
                <Button size="xs" variant="subtle" color="red" onClick={() => removeItem(index)}>Remove</Button>
              </Group>
              {contentType === 'mcq' && (
                <Stack gap="xs">
                  <Textarea label="Question" value={item.question || ''} onChange={(e) => updateItem(index, 'question', e.target.value)} autosize minRows={2} />
                  {(item.options || []).map((opt, oi) => (
                    <TextInput key={oi} label={`Option ${oi + 1}${oi === item.answer_index ? ' (Correct)' : ''}`} value={opt} onChange={(e) => { const o = [...(item.options || [])]; o[oi] = e.target.value; updateItem(index, 'options', o); }} styles={oi === item.answer_index ? { input: { borderColor: '#34D399' } } : {}} />
                  ))}
                  <Textarea label="Explanation" value={item.explanation || ''} onChange={(e) => updateItem(index, 'explanation', e.target.value)} autosize />
                </Stack>
              )}
              {contentType === 'flashcard' && (
                <Stack gap="xs">
                  <TextInput label="Term" value={item.term || ''} onChange={(e) => updateItem(index, 'term', e.target.value)} />
                  <Textarea label="Definition" value={item.definition || ''} onChange={(e) => updateItem(index, 'definition', e.target.value)} autosize />
                  <TextInput label="Formula" value={item.formula || ''} onChange={(e) => updateItem(index, 'formula', e.target.value || null)} />
                </Stack>
              )}
              {contentType === 'written' && (
                <Stack gap="xs">
                  <Textarea label="Question" value={item.question || ''} onChange={(e) => updateItem(index, 'question', e.target.value)} autosize />
                  <Textarea label="Model Answer" value={item.model_answer || ''} onChange={(e) => updateItem(index, 'model_answer', e.target.value)} autosize minRows={3} />
                  <Group>
                    <NumberInput label="Marks" value={item.marks || 4} onChange={(v) => updateItem(index, 'marks', v)} min={1} max={20} style={{ width: 100 }} />
                    <TextInput label="Category" value={item.category || ''} onChange={(e) => updateItem(index, 'category', e.target.value)} />
                  </Group>
                </Stack>
              )}
            </Paper>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
