// Prefixes internal paths so the site keeps working if `base` is set in astro.config.
export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
