import { RoutesConfig, Routes, Options } from './types'

import buildRoute from './buildRoute'

const routeNames = (config: RoutesConfig) => [
  ...new Set(config.routes.map(({ name }) => name))
]

const makeRoutes = <T extends string>(config: RoutesConfig): Routes<T> => {
  const routes = (routeName: T) => (options?: Options) =>
    buildRoute(config, routeName, options)

  routeNames(config).forEach(routeName => {
    routes[routeName] = (options?: Options) =>
      buildRoute(config, routeName, options)
  })

  return routes as Routes<T>
}

export default makeRoutes
