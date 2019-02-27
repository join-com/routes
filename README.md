## JOIN Routes

Routes generator lib for JOIN

### Install
```bash
yarn add @join-com/routes
```

### Usage
```typescript
import { makeRoutes } from '@join-com/routes'

type RouteNames = 'root' | 'dashboard'

const routes = [
  {
    name: 'root',
    pattern: '/'
  },
  {
    name: 'root',
    locale: 'de-de',
    pattern: '/de-de'
  },
  {
    name: 'showJob',
    pattern: '/job/:jobId'
  },
  {
    name: 'showJob',
    locale: 'de-de',
    pattern: '/de-de/job/:jobId'
  }
]

const appRoutes = makeRoutes<RouteNames>({
  locale: 'en-us',
  fallbackLocale: 'en-us',
  routes
})

const rootUrl = appRoutes('root')()

const deRootUrl = appRoutes('root')({ locale: 'de-de' })

const jobUrl = appRoutes.showJob({ jobId: 1234 })

const deJobUrl = appRoutes.showJob({ locale: 'de-de', jobId: 1234 })
```
