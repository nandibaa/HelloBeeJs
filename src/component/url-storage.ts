const urlKey = 'urls';

export function persistUrl(
  reference: string,
  prefix: string = 'http://localhost:1663/bzz/'
) {
  const fullUrl = `${prefix}${reference}/`;
  const existingUrls = readUrls();
  localStorage.setItem(urlKey, JSON.stringify([...existingUrls, fullUrl]));
}

export function readUrls() {
  const persistedUrls = localStorage.getItem(urlKey);
  return persistedUrls === null ? [] : (JSON.parse(persistedUrls) as string[]);
}
