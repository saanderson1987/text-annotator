\c text_annotator;

ALTER TABLE text
ADD created_at timestamptz NOT NULL DEFAULT now(),
ADD updated_at timestamp with time zone NOT NULL DEFAULT now();

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON text
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
