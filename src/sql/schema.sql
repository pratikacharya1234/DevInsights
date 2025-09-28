-- Create tables
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  name TEXT,
  github_username TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES teams(id),
  user_id UUID REFERENCES users(id),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  achievement_name TEXT,
  description TEXT,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE share_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  token TEXT UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE insights_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  repo_owner TEXT,
  repo_name TEXT,
  data JSONB,
  cached_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights_cache ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view teams they own or are members of" ON teams FOR SELECT USING (
  auth.uid() = owner_id OR EXISTS (
    SELECT 1 FROM team_members WHERE team_id = teams.id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can create teams" ON teams FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Team members can view memberships" ON team_members FOR SELECT USING (
  auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM teams WHERE id = team_members.team_id AND owner_id = auth.uid()
  )
);

CREATE POLICY "Users can join teams" ON team_members FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own achievements" ON achievements FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own share tokens" ON share_tokens FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create share tokens" ON share_tokens FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own cached insights" ON insights_cache FOR SELECT USING (auth.uid() = user_id);