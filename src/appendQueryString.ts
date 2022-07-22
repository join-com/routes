export default function appendQueryString(
  url: string,
  queryString: string | undefined
) {
  if (!queryString) {
    return url
  }

  return url + (url.indexOf('?') === -1 ? '?' : '&') + queryString
}
