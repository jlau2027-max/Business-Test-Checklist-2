import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Import fallback JSON data
import checklistData from '../data/business-checklist.json';
import flashcardData from '../data/business-flashcards.json';
import mcqData from '../data/business-mcq.json';
import writtenData from '../data/business-written.json';
import writtenExtendedData from '../data/business-written-extended.json';
import specimenData from '../data/business-specimen.json';
import historyPaper2Data from '../data/history-paper2.json';
import historyPaper3Data from '../data/history-paper3.json';
import levelDescriptorsData from '../data/history-level-descriptors.json';

const FALLBACK_DATA = {
  checklist_sections: checklistData,
  flashcard_categories: flashcardData,
  mcq_questions: mcqData,
  written_questions: writtenData,
  written_extended_questions: writtenExtendedData,
  specimen_questions: specimenData,
  history_paper2: historyPaper2Data,
  history_paper3: historyPaper3Data,
  level_descriptors: levelDescriptorsData,
};

const cache = {};

export function useContent(contentType, options = {}) {
  const [data, setData] = useState(cache[contentType] || FALLBACK_DATA[contentType] || []);
  const [loading, setLoading] = useState(!cache[contentType]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache[contentType]) {
      setData(cache[contentType]);
      setLoading(false);
      return;
    }

    if (!isSupabaseConfigured()) {
      setData(FALLBACK_DATA[contentType] || []);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Map content types to Supabase tables
        const tableMap = {
          checklist_sections: 'checklist_sections',
          flashcard_categories: 'flashcard_categories',
          mcq_questions: 'mcq_questions',
          written_questions: { table: 'written_questions', filter: { question_type: 'short' } },
          written_extended_questions: { table: 'written_questions', filter: { question_type: 'extended' } },
          specimen_questions: 'specimen_questions',
          history_paper2: { table: 'history_questions', filter: { paper: 'paper2' } },
          history_paper3: { table: 'history_questions', filter: { paper: 'paper3' } },
        };

        const config = tableMap[contentType];
        if (!config) {
          setData(FALLBACK_DATA[contentType] || []);
          setLoading(false);
          return;
        }

        const tableName = typeof config === 'string' ? config : config.table;
        let query = supabase.from(tableName).select('*');

        if (typeof config === 'object' && config.filter) {
          for (const [key, value] of Object.entries(config.filter)) {
            query = query.eq(key, value);
          }
        }

        if (options.orderBy) {
          query = query.order(options.orderBy, { ascending: options.ascending ?? true });
        } else {
          query = query.order('created_at', { ascending: true });
        }

        const { data: result, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        if (result && result.length > 0) {
          cache[contentType] = result;
          setData(result);
        } else {
          // No data in Supabase yet, use fallback
          setData(FALLBACK_DATA[contentType] || []);
        }
      } catch (err) {
        console.warn(`Failed to fetch ${contentType} from Supabase, using fallback:`, err.message);
        setError(err);
        setData(FALLBACK_DATA[contentType] || []);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contentType]);

  const refetch = async () => {
    delete cache[contentType];
    setLoading(true);
    // Re-trigger the effect by updating a dependency
    // Since we're using contentType as dep and it won't change,
    // we manually re-fetch here
    if (!isSupabaseConfigured()) {
      setData(FALLBACK_DATA[contentType] || []);
      setLoading(false);
      return;
    }

    try {
      const tableMap = {
        checklist_sections: 'checklist_sections',
        flashcard_categories: 'flashcard_categories',
        mcq_questions: 'mcq_questions',
        written_questions: { table: 'written_questions', filter: { question_type: 'short' } },
        written_extended_questions: { table: 'written_questions', filter: { question_type: 'extended' } },
        specimen_questions: 'specimen_questions',
        history_paper2: { table: 'history_questions', filter: { paper: 'paper2' } },
        history_paper3: { table: 'history_questions', filter: { paper: 'paper3' } },
      };

      const config = tableMap[contentType];
      if (!config) {
        setData(FALLBACK_DATA[contentType] || []);
        setLoading(false);
        return;
      }

      const tableName = typeof config === 'string' ? config : config.table;
      let query = supabase.from(tableName).select('*').order('created_at', { ascending: true });

      if (typeof config === 'object' && config.filter) {
        for (const [key, value] of Object.entries(config.filter)) {
          query = query.eq(key, value);
        }
      }

      const { data: result } = await query;
      if (result && result.length > 0) {
        cache[contentType] = result;
        setData(result);
      } else {
        setData(FALLBACK_DATA[contentType] || []);
      }
    } catch {
      setData(FALLBACK_DATA[contentType] || []);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

// Hook to get flashcards for a specific category
export function useFlashcards(categoryId) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured() || !categoryId) {
      setLoading(false);
      return;
    }

    supabase
      .from('flashcards')
      .select('*')
      .eq('category_id', categoryId)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data) setCards(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryId]);

  return { cards, loading };
}

// Invalidate cache (call after admin content changes)
export function invalidateContentCache(contentType) {
  if (contentType) {
    delete cache[contentType];
  } else {
    Object.keys(cache).forEach(key => delete cache[key]);
  }
}
