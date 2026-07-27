
-- Restrict blog-images write access to admins
DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete blog images" ON storage.objects;

CREATE POLICY "Admins can upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'blog-images'
  AND (storage.foldername(name))[1] <> 'avatars'
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update blog images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'blog-images'
  AND (storage.foldername(name))[1] <> 'avatars'
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete blog images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'blog-images'
  AND (storage.foldername(name))[1] <> 'avatars'
  AND public.has_role(auth.uid(), 'admin')
);

-- Remove broad listing policy on public bucket. Direct public URLs still work.
DROP POLICY IF EXISTS "Blog images are publicly accessible" ON storage.objects;

-- Revoke EXECUTE on SECURITY DEFINER functions from anon/authenticated.
-- has_role is called by RLS policies (runs as policy owner), so revoking client EXECUTE is safe.
-- handle_new_user is a trigger function, never called directly by clients.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
