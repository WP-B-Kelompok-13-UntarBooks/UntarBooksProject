import 'regenerator-runtime'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'feather-icons'
import './css/main.css'
import './js/component/page-navigation.js'
import main from './js/view/main'
main()
import logMessage from './js/logger'

// Log message to console
logMessage('Its finished!!')

if (module.hot)       // eslint-disable-line no-undef
  module.hot.accept() // eslint-disable-line no-undef