alter table x_posts
  add column if not exists is_paid_partnership boolean not null default false;

create index if not exists x_posts_paid_idx on x_posts (is_paid_partnership);

insert into collab_keywords (keyword) values
  ('paid partnership'),
  ('#ad'),
  ('#paidpartnership'),
  ('#paid')
on conflict (keyword) do nothing;
