// Maps DB `image_key` values to bundled asset URLs.
// When `image_key` starts with "http" it's an uploaded photo and used as-is.
import * as photos from "@/assets/photos";

const map = photos as unknown as Record<string, string>;

export function resolveImage(imageKey: string | null | undefined): string | undefined {
  if (!imageKey) return undefined;
  if (/^https?:\/\//i.test(imageKey)) return imageKey;
  return map[imageKey];
}

export const BUNDLED_PHOTO_KEYS: string[] = Object.keys(map).sort();