import { stringify } from 'qs'
import { URL } from 'url'
import * as pathToRegexp from 'path-to-regexp'

import { RoutesConfig, Options } from './types'

import findRouteByNameAndLocale from './findRouteByNameAndLocale'

const extractName = (token: pathToRegexp.Token) => {
  if (typeof token === 'string') {
    return
  }

  if (typeof token.name === 'number') {
    return
  }

  return token.name
}

const routePathParams = (path: string) =>
  pathToRegexp
    .parse(path)
    .map(extractName)
    .filter(Boolean) as string[]

const buildUrl = (
  baseUrl: string,
  path: string,
  queryParams: any,
  useSubdomain: boolean = false,
  subdomain?: string
) => {
  const url = new URL(baseUrl)
  url.pathname = path
  url.search = stringify(queryParams) || ''
  url.hostname = useSubdomain ? `${subdomain}.${url.hostname}` : url.hostname

  return url.href
}

const omit = (keys: string[], obj: object) =>
  Object.keys(obj)
    .filter(key => !keys.includes(key))
    .reduce((newObj, key) => ({ ...newObj, [key]: obj[key] }), {})

const buildRoute = <T extends string>(
  config: RoutesConfig,
  routeName: T,
  options: Options = {}
) => {
  const { subdomain, locale = config.locale, ...params } = options

  const route = findRouteByNameAndLocale<T>(
    config,
    routeName,
    locale,
    config.locale
  )

  const useSubdomain = Boolean(route.options && route.options.subdomain)
  if (useSubdomain && !subdomain) {
    throw new Error('Expected "subdomain" to be defined')
  }
  const path = pathToRegexp.compile(route.pattern)(params)
  const queryParams = omit(routePathParams(route.pattern), params)

  return buildUrl(config.baseUrl, path, queryParams, useSubdomain, subdomain)
}

export default buildRoute
