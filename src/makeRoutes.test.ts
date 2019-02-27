import makeRoutes from './makeRoutes'

describe('makeRoutes', () => {
  const routeParams = {
    id: '1-job-title',
    companyId: '2-company-name'
  }

  type RouteName = 'root' | 'showJob' | 'showJobSubdomain' | 'featuresManage'

  const defaultConfig = {
    locale: 'en-us',
    baseUrl: 'http://example.com:3000',
    routes: [
      {
        name: 'root',
        locale: 'en-us',
        pattern: '/'
      },
      {
        name: 'root',
        locale: 'de-de',
        pattern: '/de-de'
      },
      {
        name: 'showJob',
        pattern: '/companies/:companyId/jobs/:id'
      },
      {
        name: 'showJobSubdomain',
        pattern: '/jobs/:id',
        options: { subdomain: true }
      },
      {
        name: 'featuresManage',
        pattern: '/features/ATS-applicant-management'
      },
      {
        name: 'featuresManage',
        pattern: '/de-de/features/bewerber-verwalten-bms',
        locale: 'de-de'
      },
      {
        name: 'featuresManage',
        pattern: '/de-ch/features/bewerber-verwalten-bms',
        locale: 'de-ch'
      }
    ]
  }

  const appRoute = makeRoutes<RouteName>(defaultConfig)

  const testRouteUrl = (
    routes: any,
    routeName: string,
    params: any,
    expectedUrl: string
  ) => {
    expect(routes(routeName)(params)).toEqual(expectedUrl) // old signature
    expect(routes[routeName](params)).toEqual(expectedUrl) // new signature
  }

  const testException = (routes: any, routeName: string, params: any) => {
    try {
      routes(routeName)(params)
    } catch (error) {
      expect(error).toMatchSnapshot()
    }

    try {
      routes[routeName](params)
    } catch (e) {
      expect(e).toMatchSnapshot()
    }
  }

  it('has route name type support', () => {
    appRoute('featuresManage')({})
    appRoute.featuresManage({})

    expect.assertions(0)
  })

  it('generate route for specified locale', () => {
    testRouteUrl(
      appRoute,
      'featuresManage',
      { locale: 'de-ch' },
      'http://example.com:3000/de-ch/features/bewerber-verwalten-bms'
    )

    expect.assertions(2)
  })

  it('applies route params', () => {
    testRouteUrl(
      appRoute,
      'showJob',
      routeParams,
      'http://example.com:3000/companies/2-company-name/jobs/1-job-title'
    )

    expect.assertions(2)
  })

  it('adds remain params to query', () => {
    testRouteUrl(
      appRoute,
      'showJob',
      {
        ...routeParams,
        key1: 'value1',
        key2: 'value2'
      },
      'http://example.com:3000/companies/2-company-name/jobs/1-job-title?key1=value1&key2=value2'
    )

    expect.assertions(2)
  })

  it('raises error when missing params', () => {
    const paramsMissingCountry = {
      id: '1-job-title'
    }

    testException(appRoute, 'showJob', paramsMissingCountry)

    expect.assertions(2)
  })

  it('raises error when route can not be found', () => {
    const options = {
      locale: 'ua'
    }

    testException(appRoute, 'featuresManage', options)

    expect.assertions(2)
  })

  it('generate route for fallback locale if specified locale was not found', () => {
    testRouteUrl(
      makeRoutes({ ...defaultConfig, fallbackLocale: 'en-us' }),
      'featuresManage',
      { locale: 'it-fr' },
      'http://example.com:3000/features/ATS-applicant-management'
    )

    expect.assertions(2)
  })

  describe('when route requires subdomain', () => {
    it('raises error when subdomain params is missed', () => {
      const params = {
        id: '1-job-title'
      }

      testException(appRoute, 'showJobSubdomain', params)

      expect.assertions(2)
    })

    it('applies route params', () => {
      const param = {
        id: '1-job-title',
        subdomain: 'test'
      }

      testRouteUrl(
        appRoute,
        'showJobSubdomain',
        param,
        'http://test.example.com:3000/jobs/1-job-title'
      )
    })
  })
})
