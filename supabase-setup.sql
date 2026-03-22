-- ========================================
-- NaoshiTE Supabase Setup
-- ========================================

-- Profiles table (auto-created on user signup)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  email text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Posts table
create table if not exists posts (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  image text default '',
  photo_url text,
  category text not null default 'その他',
  original text not null,
  bad text not null,
  correct text not null,
  location text default '',
  explanation text default '',
  user_comment text default '',
  author_id uuid references profiles(id) on delete set null,
  author_name text default '',
  likes_count int default 0
);

-- Likes table
create table if not exists likes (
  id bigint generated always as identity primary key,
  post_id bigint references posts(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(post_id, user_id)
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table posts enable row level security;
alter table likes enable row level security;

-- Profiles policies
create policy "profiles_select" on profiles for select using (true);
create policy "profiles_insert" on profiles for insert with check (auth.uid() = id);
create policy "profiles_update" on profiles for update using (auth.uid() = id);

-- Posts policies
create policy "posts_select" on posts for select using (true);
create policy "posts_insert" on posts for insert with check (auth.uid() = author_id);
create policy "posts_delete" on posts for delete using (auth.uid() = author_id);

-- Likes policies
create policy "likes_select" on likes for select using (true);
create policy "likes_insert" on likes for insert with check (auth.uid() = user_id);
create policy "likes_delete" on likes for delete using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, display_name, email, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Auto-update likes count
create or replace function update_likes_count()
returns trigger as $$
begin
  if TG_OP = 'INSERT' then
    update posts set likes_count = likes_count + 1 where id = new.post_id;
    return new;
  elsif TG_OP = 'DELETE' then
    update posts set likes_count = likes_count - 1 where id = old.post_id;
    return old;
  end if;
end;
$$ language plpgsql security definer;

create trigger on_like_change
  after insert or delete on likes
  for each row execute function update_likes_count();

-- Storage bucket for photos
insert into storage.buckets (id, name, public) values ('photos', 'photos', true)
on conflict do nothing;

create policy "photos_select" on storage.objects for select using (bucket_id = 'photos');
create policy "photos_insert" on storage.objects for insert with check (bucket_id = 'photos' and auth.role() = 'authenticated');

-- Seed data (sample posts)
insert into posts (image, category, original, bad, correct, location, likes_count, explanation, author_name) values
  ('🚻', 'トイレ', '御手洗い', 'Honorable Hand Wash', 'Restroom', '東京・渋谷', 2847, '「御」をhonorableと直訳。', '翻訳ハンター'),
  ('🍜', 'メニュー', '親子丼', 'Parent and Child Bowl', 'Chicken & Egg Rice Bowl', '大阪・なんば', 4210, '直訳すると不気味。', '大阪グルメ'),
  ('⚠️', '看板', '足元注意', 'Beware of Your Feet', 'Watch Your Step', '京都・嵐山', 3652, '足を警戒するのではなく足元に注意。', '京都散歩'),
  ('🚭', '看板', '歩きタバコ禁止', 'No Walking Tobacco', 'No Smoking While Walking', '福岡・天神', 5123, '行為を説明する必要がある。', '福岡レポーター'),
  ('🍣', 'メニュー', '回転寿司', 'Spinning Sushi', 'Conveyor Belt Sushi', '名古屋・栄', 3891, '寿司が回転しているイメージに。', '寿司マニア'),
  ('🚗', '看板', '徐行', 'Slow Slow', 'Slow Down', '北海道・小樽', 2156, '二回繰り返して訳した。', '北海道ドライブ'),
  ('🏨', 'ホテル', '精算機', 'Spirit Counting Machine', 'Payment Machine', '札幌・すすきの', 6204, '「精」をspiritと誤訳。', 'ホテル評論家'),
  ('🍱', 'メニュー', '天津飯', 'Tianjin Rice', 'Crab Omelette over Rice', '横浜・中華街', 1893, '地名だけでは伝わらない。', '横浜食べ歩き'),
  ('🚿', '温泉', 'かけ湯をしてください', 'Please Hang Hot Water', 'Please Rinse Off Before Entering', '箱根', 7891, '「かける」をhangと誤訳。', '温泉ソムリエ'),
  ('🏪', 'コンビニ', '肉まん', 'Meat Man', 'Steamed Pork Bun', '東京・新宿', 9320, '「まん」をmanと誤訳。', 'コンビニ研究家'),
  ('🎌', '看板', '立入禁止', 'Do Not Standing Enter', 'No Entry', '広島・宮島', 3456, '「立入」を分解した。', '広島観光'),
  ('🍶', 'メニュー', '飲み放題', 'Free Drinking', 'All-You-Can-Drink', '東京・新橋', 4567, '「自由に飲酒」の意味に。', '居酒屋マスター');
