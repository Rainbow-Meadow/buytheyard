
-- Public read on products and delivery_zones
CREATE POLICY "Public can read products"
ON public.products FOR SELECT
USING (true);

CREATE POLICY "Public can read delivery zones"
ON public.delivery_zones FOR SELECT
USING (true);

-- Storage policies for product-photos bucket
-- Public read (bucket is public)
CREATE POLICY "Public can read product photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-photos');

-- Writes restricted: only service role (admin server functions) can mutate.
-- Authenticated/anon users cannot upload, update, or delete via the client.
CREATE POLICY "Service role can insert product photos"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'product-photos');

CREATE POLICY "Service role can update product photos"
ON storage.objects FOR UPDATE
TO service_role
USING (bucket_id = 'product-photos')
WITH CHECK (bucket_id = 'product-photos');

CREATE POLICY "Service role can delete product photos"
ON storage.objects FOR DELETE
TO service_role
USING (bucket_id = 'product-photos');
