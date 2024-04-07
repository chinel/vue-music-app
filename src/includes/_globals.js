//import _ from 'lodash' // vite uses lodash internally
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

export default {
  install(app) {
    //search for the files
    // the asteriks acts like a wildcard character
    const baseComponents = import.meta.glob('../components/base/*.vue', {
      eager: true // this will load the modules immediately
    }) // this will return an object

    //path provides the path
    //module provides the data
    Object.entries(baseComponents).forEach(([path, module]) => {
      const componentName = upperFirst(
        camelCase(
          path
            .split('/')
            .pop()
            .replace(/\.\w+$/, '') // this regular expression will remove the extension from the file name
        )
      )

      // console.log(path, componentName)
      //export default
      app.component(`Base${componentName}`, module.default) // this will register each component globally, prefixing will help prevent naming conflicts
    })
  }
}
