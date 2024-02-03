ALTER TABLE resumes
ADD COLUMN summary TEXT;

ALTER TABLE resumes
ADD COLUMN scores JSON;

ALTER TABLE resumes
ADD COLUMN resume_doc_id UUID;