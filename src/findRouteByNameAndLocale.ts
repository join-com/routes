import { RoutesConfig, Route } from './types'

const byNameAndLocale = <T extends string>(
  name: T,
  locale: string,
  defaultLocale: string
) => (route: Route) =>
  route.name === name && (route.locale || defaultLocale) === locale

const findRouteByNameAndLocale = <T extends string>(
  config: RoutesConfig,
  routeName: T,
  locale: string,
  fallbackLocale?: string
) => {
  let route = config.routes.find(
    byNameAndLocale(routeName, locale, config.locale)
  )

  if (!route && fallbackLocale && fallbackLocale !== locale) {
    route = config.routes.find(
      byNameAndLocale(routeName, fallbackLocale, config.locale)
    )
  }

  if (!route) {
    throw new Error(`Route ${routeName} with locale ${locale} does not exist.`)
  }

  return route
}

export default findRouteByNameAndLocale
