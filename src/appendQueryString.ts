function trimQueryString(queryString: string) {
  return queryString && queryString.replace(/^[?&]/, '')
}

export default function appendQueryString(
  url: string,
  queryString: string | undefined
) {
  if (!queryString) {
    return url
  }

  return (
    url + (url.indexOf('?') === -1 ? '?' : '&') + trimQueryString(queryString)
  )
}
