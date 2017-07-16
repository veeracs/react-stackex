import App from './components/App'
import Home from './components/Home'

export default {
  path: '/',
  component: App,
  childRoutes: [
        {
            path: 'search',
            getComponent(nextState, cb) {
                System.import('./components/Search').then(module => cb(null, module.default))
            }
        }
  ],
  indexRoute: {
    component: Home
  }
}
