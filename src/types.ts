export interface Route {
  name: string
  pattern: string
  locale?: string
  options?: {
    subdomain?: boolean
  }
}

export interface RoutesConfig {
  baseUrl: string
  routes: Route[]
  locale: string
  fallbackLocale?: string
}

export interface Options {
  subdomain?: string
  locale?: string
  [key: string]: any
}

type CallSignature<T extends string> = (
  routeName: T
) => (options?: Options) => string

type MethodSignature<T extends string> = {
  [K in T]: (options?: Options) => string
}

export type Routes<T extends string> = CallSignature<T> & MethodSignature<T>
