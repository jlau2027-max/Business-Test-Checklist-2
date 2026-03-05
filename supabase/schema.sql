-- ============================================================
-- Supabase Schema for IB Business Management Revision Hub
-- Run this in the Supabase SQL Editor
-- ============================================================

-- profiles: linked to Clerk user IDs
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  display_name TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_profiles_clerk_id ON profiles(clerk_user_id);

-- subjects (top-level grouping)
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#7C6FFF',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- units within subjects
CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(subject_id, slug)
);

-- subtopics within units
CREATE TABLE subtopics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#7C6FFF',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(unit_id, slug)
);

-- checklist sections
CREATE TABLE checklist_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  subtopic_id UUID REFERENCES subtopics(id) ON DELETE SET NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  color TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- flashcard categories
CREATE TABLE flashcard_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  subtopic_id UUID REFERENCES subtopics(id) ON DELETE SET NULL,
  slug TEXT NOT NULL,
  label TEXT NOT NULL,
  color TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- individual flashcards
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES flashcard_categories(id) ON DELETE CASCADE,
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  formula TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- MCQ questions
CREATE TABLE mcq_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  subtopic_id UUID REFERENCES subtopics(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('SL', 'HL', 'SL/HL')),
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  answer_index INTEGER NOT NULL,
  explanation TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Written questions (short + extended)
CREATE TABLE written_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  subtopic_id UUID REFERENCES subtopics(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('SL', 'HL', 'SL/HL')),
  marks INTEGER NOT NULL,
  question TEXT NOT NULL,
  model_answer TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'short' CHECK (question_type IN ('short', 'extended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Specimen papers (grouping)
CREATE TABLE specimen_papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  case_study_title TEXT,
  case_study_text TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Specimen questions
CREATE TABLE specimen_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id UUID NOT NULL REFERENCES specimen_papers(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  question TEXT NOT NULL,
  marks INTEGER NOT NULL,
  markscheme TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- History questions (Paper 2 and Paper 3)
CREATE TABLE history_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  paper TEXT NOT NULL CHECK (paper IN ('paper2', 'paper3')),
  number INTEGER NOT NULL,
  topic TEXT NOT NULL,
  question TEXT NOT NULL,
  marks INTEGER NOT NULL DEFAULT 15,
  markscheme TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User progress (flexible storage)
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL,
  progress_type TEXT NOT NULL CHECK (progress_type IN (
    'checklist_check', 'written_answer', 'written_grade',
    'mcq_attempt', 'specimen_answer', 'specimen_grade',
    'history_answer', 'history_grade'
  )),
  content_id TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(clerk_user_id, progress_type, content_id)
);
CREATE INDEX idx_user_progress_user ON user_progress(clerk_user_id);

-- Content commits audit log
CREATE TABLE content_commits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_clerk_id TEXT NOT NULL,
  commit_sha TEXT,
  commit_message TEXT NOT NULL,
  files_changed JSONB NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'committed', 'failed')),
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_commits ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Service insert profiles" ON profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update profiles" ON profiles FOR UPDATE USING (true);

-- User progress policies
CREATE POLICY "Public read progress" ON user_progress FOR SELECT USING (true);
CREATE POLICY "Service insert progress" ON user_progress FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update progress" ON user_progress FOR UPDATE USING (true);

-- Content commits policies
CREATE POLICY "Public read commits" ON content_commits FOR SELECT USING (true);
CREATE POLICY "Service insert commits" ON content_commits FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update commits" ON content_commits FOR UPDATE USING (true);

-- ============================================================
-- Seed initial subjects
-- ============================================================

INSERT INTO subjects (slug, name, color, sort_order) VALUES
  ('business', 'Business Management', '#7C6FFF', 1),
  ('history', 'IB History', '#FB923C', 2);
