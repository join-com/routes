import appendQueryString from './appendQueryString'

describe('appendQueryString', () => {
  it('appends query string to empty url', () => {
    expect(appendQueryString('http://test.com', 'key3=value3')).toEqual(
      'http://test.com?key3=value3'
    )
  })

  it('appends query string to url with params', () => {
    expect(
      appendQueryString('http://test.com?key1=value1', 'key3=value3')
    ).toEqual('http://test.com?key1=value1&key3=value3')
  })

  it('trims ? from query strings', () => {
    expect(
      appendQueryString('http://test.com?key1=value1', '?key3=value3')
    ).toEqual('http://test.com?key1=value1&key3=value3')
  })
})
