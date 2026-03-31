import { NAME, TRANSLATION } from './translations'
import { SETTINGS } from './settings'
import { E58 } from './e58'
import css from './style.css'

WMEUI.addTranslation(NAME, TRANSLATION)
WMEUI.addStyle(css)

$(document).on('bootstrap.wme', () => {
  new E58(NAME, SETTINGS)
})
