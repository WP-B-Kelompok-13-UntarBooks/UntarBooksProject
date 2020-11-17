import 'regenerator-runtime'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'feather-icons'
import './styles/main.css'
import './scripts/component/page-navigation.js'
import main from './scripts/view/main'
require("babel-register")
require("./server")
main()
