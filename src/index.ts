import { NAME, TRANSLATION } from './translations'
import { SETTINGS } from './settings'
import { E58 } from './e58'
import css from './style.css'

$(document).on('bootstrap.wme', () => {
  WMEUI.addTranslation(NAME, TRANSLATION)
  WMEUI.addStyle(css)

  new E58(NAME, SETTINGS)
})
