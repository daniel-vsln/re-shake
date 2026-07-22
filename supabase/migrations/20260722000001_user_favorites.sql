CREATE TABLE IF NOT EXISTS user_favorites (
  user_id  UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cocktail_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, cocktail_id)
);

ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own favorites"
  ON user_favorites FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
