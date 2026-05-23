
-- Add icon_url to social_links
ALTER TABLE public.social_links ADD COLUMN IF NOT EXISTS icon_url text NOT NULL DEFAULT '';

-- Experiences table
CREATE TABLE IF NOT EXISTS public.experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  year text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read experiences" ON public.experiences
  FOR SELECT USING (true);
CREATE POLICY "Admins manage experiences" ON public.experiences
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  message text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read reviews" ON public.reviews
  FOR SELECT USING (true);
CREATE POLICY "Anyone can submit a review" ON public.reviews
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 80
    AND length(message) BETWEEN 1 AND 2000
    AND rating BETWEEN 1 AND 5
  );
CREATE POLICY "Admins manage reviews" ON public.reviews
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
