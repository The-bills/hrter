ALTER TABLE jobs
ADD COLUMN organisation_id UUID NOT NULL REFERENCES organisations(id);