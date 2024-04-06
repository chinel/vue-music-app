import NProgress from 'nprogress'

export default (router) => {
  router.beforeEach((to, from, next) => {
    NProgress.start()
    next() // call the next function so that the browser can begin loading components
  })
  router.afterEach(NProgress.done) //This will be called after the afterEach guard runs
}
