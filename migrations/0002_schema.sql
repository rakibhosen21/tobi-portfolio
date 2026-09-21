-- Tobi portfolio: public profile, X analytics, collab detection, sync jobs

create table if not exists site_settings (
  id text primary key default 'site',
  owner_user_id text,
  display_name text not null default 'Tobi',
  x_username text not null default '',
  tagline text not null default 'Web3 Creator • CT Contributor • Community Builder',
  bio text not null default '',
  avatar_url text not null default '/avatar.jpg',
  featured_links_json text not null default '[]',
  x_bearer_token text,
  x_api_key text,
  x_api_secret text,
  x_access_token text,
  x_access_secret text,
  x_user_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists collab_keywords (
  id serial primary key,
  keyword text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists collab_partners (
  id serial primary key,
  handle text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists x_snapshot_latest (
  id text primary key default 'latest',
  captured_at timestamptz,
  followers integer not null default 0,
  following integer not null default 0,
  tweet_count integer not null default 0,
  listed_count integer not null default 0,
  total_likes integer not null default 0,
  total_replies integer not null default 0,
  total_reposts integer not null default 0,
  total_quotes integer not null default 0,
  total_views integer not null default 0,
  indexed_posts integer not null default 0,
  engagement_rate double precision,
  source text not null default 'none'
);

create table if not exists x_snapshot_history (
  id serial primary key,
  captured_at timestamptz not null default now(),
  followers integer not null default 0,
  following integer not null default 0,
  tweet_count integer not null default 0,
  total_likes integer not null default 0,
  total_replies integer not null default 0,
  total_reposts integer not null default 0,
  total_views integer not null default 0,
  indexed_posts integer not null default 0,
  engagement_rate double precision
);

create table if not exists analytics_windows (
  id serial primary key,
  window_start timestamptz not null,
  window_end timestamptz not null,
  posts_delta integer not null default 0,
  replies_delta integer not null default 0,
  likes_delta integer not null default 0,
  views_delta integer not null default 0,
  reposts_delta integer not null default 0,
  followers_delta integer not null default 0,
  engagement_rate double precision,
  best_post_id text,
  created_at timestamptz not null default now()
);

create table if not exists x_posts (
  id text primary key,
  body text not null,
  created_at timestamptz not null,
  url text not null,
  likes integer not null default 0,
  replies integer not null default 0,
  reposts integer not null default 0,
  quotes integer not null default 0,
  views integer not null default 0,
  bookmarks integer not null default 0,
  engagement_rate double precision,
  is_collab boolean not null default false,
  collab_reason text,
  last_synced_at timestamptz,
  manually_marked boolean not null default false,
  manually_unmarked boolean not null default false
);

create index if not exists x_posts_created_at_idx on x_posts (created_at desc);
create index if not exists x_posts_is_collab_idx on x_posts (is_collab);

create table if not exists sync_log (
  id serial primary key,
  job text not null,
  status text not null,
  message text,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  details_json text
);

create index if not exists sync_log_started_at_idx on sync_log (started_at desc);

create table if not exists scheduler_state (
  job text primary key,
  last_run_at timestamptz,
  next_run_at timestamptz,
  last_status text,
  last_error text
);

insert into site_settings (
  id,
  display_name,
  x_username,
  tagline,
  bio,
  avatar_url,
  featured_links_json
) values (
  'site',
  'Tobi',
  '',
  'Web3 Creator • CT Contributor • Community Builder',
  'In Web3 since 2021 — first as a lurker reading every thread, then as a contributor who actually shows up. The work spans ecosystems, community rooms, and the unglamorous craft of making Crypto Twitter slightly more useful than it was yesterday. Collaborations are the point: better rooms, clearer signal, people who still reply like humans.',
  '/avatar.jpg',
  '[{"id":"x","label":"View X Profile","href":"https://x.com","external":true},{"id":"work","label":"Explore My Work","href":"#work","external":false}]'
)
on conflict (id) do nothing;

insert into collab_keywords (keyword) values ('#collab'), ('#community')
on conflict (keyword) do nothing;

insert into scheduler_state (job, next_run_at) values
  ('user_stats', now()),
  ('analytics_12h', now()),
  ('collab_metrics', now())
on conflict (job) do nothing;
