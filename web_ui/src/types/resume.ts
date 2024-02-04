export type Resume = {
  id: string;
  name: string;
  content: string;
  created_at: string;
  summary: string | null;
  scores: Record<string, number>;
  resume_doc_id: string;
};
