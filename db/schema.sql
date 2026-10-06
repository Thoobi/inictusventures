-- DAM Street Battle registrations (submitted from /dam/registration).
-- Apply with: node --env-file=.env scripts/db-migrate.mjs
CREATE TABLE IF NOT EXISTS dam_registrations (
	id            BIGSERIAL PRIMARY KEY,
	full_name     TEXT        NOT NULL,
	email         TEXT        NOT NULL,
	phone         TEXT        NOT NULL,
	address       TEXT        NOT NULL,
	source        TEXT        NOT NULL,  -- where they heard about DAM
	category      TEXT        NOT NULL CHECK (category IN ('dance', 'music', 'art')),
	music_type    TEXT        CHECK (music_type IN ('solo', 'team')),
	why_join      TEXT        NOT NULL,
	created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
	-- music entries must say solo or team; other categories must not
	CHECK ((category = 'music') = (music_type IS NOT NULL))
);

CREATE INDEX IF NOT EXISTS dam_registrations_created_at_idx
	ON dam_registrations (created_at DESC);
