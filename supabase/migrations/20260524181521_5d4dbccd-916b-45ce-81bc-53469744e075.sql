
DROP POLICY IF EXISTS "Public can read product photos" ON storage.objects;

-- Public files are still accessible via their public CDN URL (bucket is public);
-- this policy only governs listing/metadata access via the API.
CREATE POLICY "Service role can list product photos"
ON storage.objects FOR SELECT
TO service_role
USING (bucket_id = 'product-photos');
