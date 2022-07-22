export default function appendQueryString(url: string, queryString: string) {
  if (!queryString) {
    return url
  }

  return url + (url.indexOf('?') === -1 ? '?' : '&') + queryString
}
