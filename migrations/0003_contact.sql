-- Contact inbox + lock Tobi's public identity to the real X handle.

alter table site_settings
  add column if not exists availability text not null default 'open';

create table if not exists contact_messages (
  id serial primary key,
  name text not null,
  email text not null,
  company text not null default '',
  role text not null,
  message text not null,
  ip_hash text,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists contact_messages_created_idx on contact_messages (created_at desc);

update site_settings
set
  x_username = 'ox_tobiiii',
  avatar_url = '/avatar.jpg',
  tagline = 'Web3 Creator • Content Creator • Community Manager',
  featured_links_json = '[{"id":"x","label":"View X Profile","href":"https://x.com/ox_tobiiii","external":true},{"id":"work","label":"Explore My Work","href":"#work","external":false}]',
  updated_at = now()
where id = 'site';

insert into collab_keywords (keyword) values
  ('collab'),
  ('collaboration'),
  ('ambassador'),
  ('community'),
  ('campaign')
on conflict (keyword) do nothing;
