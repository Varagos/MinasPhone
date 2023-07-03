// Handles all material ui-related cache in the app.
/**
 * To finally add server-side-rendered CSS, we need to add/customize three final files.
 * ensures that Emotion’s default settings will be replaced with our custom styles and that this information
 * will be configured both on the client and server sides. The prepend option is set to be true,
 * which will cause our custom styles to load first.
 */
import createCache from '@emotion/cache';

export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
