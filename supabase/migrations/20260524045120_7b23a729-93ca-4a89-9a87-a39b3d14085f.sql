
-- Products
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('mulch','stone','additional')),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  price_cents integer NOT NULL DEFAULT 0,
  unit text NOT NULL DEFAULT 'per yd',
  image_key text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX products_category_sort_idx ON public.products (category, sort_order);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
-- No policies: only service-role (server) access.

-- Delivery zones
CREATE TABLE public.delivery_zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  town text NOT NULL,
  fee_cents integer NOT NULL DEFAULT 0,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX delivery_zones_sort_idx ON public.delivery_zones (sort_order);

ALTER TABLE public.delivery_zones ENABLE ROW LEVEL SECURITY;
-- No policies: only service-role (server) access.

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.tg_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TRIGGER products_set_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
CREATE TRIGGER delivery_zones_set_updated_at BEFORE UPDATE ON public.delivery_zones
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Seed products (image_key matches keys exported from src/assets/photos/index.ts via a lookup in code)
INSERT INTO public.products (category, name, description, price_cents, unit, image_key, sort_order) VALUES
('mulch','Brown Pine Mulch','Classic double-ground brown. Long-lasting color, holds moisture, suppresses weeds.',4200,'per yd','largePileOfDarkMulch',10),
('mulch','Black Pine Mulch','Deep black double-ground. The cleanest contrast against green plantings.',4200,'per yd','largePileOfBlackMulch',20),
('mulch','Hemlock Mix','Premium hemlock blend with a fine texture and a rich, natural brown.',4200,'per yd','largePileOfRedMulch',30),
('mulch','Playground Mulch','Engineered wood fiber. ASTM-tested for fall-zone safety under play sets.',4500,'per yd','dumpTruckBedFullOfBrownMulch',40),
('stone','1-1/2" Landscaping Stone','Decorative landscape stone in 1-1/2" size. Available in brown, blue, and dark gray.',8800,'per yd','pileOfCrushedLimestone',10),
('stone','3/4" Landscaping Stone','Our most versatile size. Available in brown, blue, white, red, purple, dark gray, and light gray.',9500,'per yd','reddishBrownLandscapeStoneWithCoinCloseup',20),
('stone','3/8" Landscaping Stone','Smooth, finer-scale decorative stone. Available in brown, blue, dark gray, and light gray.',7800,'per yd','tanPeaGravelWithCoinCloseup',30),
('stone','Specialty Stone','Lava rock and decorative accent stone for distinctive beds, borders, and dry features.',10500,'per yd','lavaRockCairnsKilauea',40),
('additional','1/2" Screened Loam','Premium screened topsoil for lawns, gardens, and grading work.',3200,'per yd','screenedTopsoilProcessing',10),
('additional','Brick / Mason Sand','Fine, washed sand for masonry, paver setting beds, and play boxes.',6800,'per yd','largePileOfLightSand',20),
('additional','Stone Dust','Crushed stone fines. Compacts hard — ideal under pavers and stone.',3500,'per yd','paleTanCrushedStoneWithPennyCloseup',30),
('additional','3/4" Gravel','Processed gravel for base layers, drainage, and parking pads.',3500,'per yd','lightGrayGravelWithQuarterCloseup',40),
('additional','Wood Chips','Coarse natural wood chips. Bulk ground cover for trails and beds.',1200,'per yd','woodChipPile',50),
('additional','Recycled Asphalt','Reclaimed asphalt millings. Affordable, durable driveway surface.',3000,'per yd','lightGrayCrushedRockWithQuarterCloseup',60),
('additional','Compost','Aged organic compost. Mix into beds or top-dress lawns.',4800,'per yd','finishedCompostBin',70);

-- Seed delivery zones
INSERT INTO public.delivery_zones (town, fee_cents, sort_order) VALUES
('Jefferson',3500,10),
('Holden',4500,20),
('Princeton',5500,30),
('Sterling',5500,40),
('West Boylston',5500,50),
('Rutland',6000,60),
('Paxton',6500,70),
('Boylston',6500,80),
('Clinton',7500,90),
('Leominster',8000,100),
('Worcester',8500,110),
('Shrewsbury',9000,120);

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('product-photos','product-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Public read of photos (bucket is public-listed, but explicit policy is clearer)
CREATE POLICY "Public read product photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-photos');
