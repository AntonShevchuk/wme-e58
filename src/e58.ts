import { NAME } from './translations'
import { GooglePreview, OSMPreview } from './map-preview'

/**
 * E58 Map Preview class
 */
export class E58 extends WMEBase {
  constructor (name, settings) {
    super(name, settings)

    this.initTab(settings)

    this.initShortcuts()
  }

  initTab (settings) {
    let tab = this.helper.createTab(
      WMEUI.t(NAME).title,
      {
        sidebar: this.wmeSDK.Sidebar,
        image: GM_info.script.icon
      }
    )
    tab.addText('description', WMEUI.t(NAME).description)
    tab.addButton('preview', WMEUI.t(NAME).title, '', () => this.toggleMap(), { className: 'waze-btn waze-btn-small waze-btn-white waze-btn-blue' })

    // Setup providers map settings
    let fsMap = this.helper.createFieldset(WMEUI.t(NAME).maps.title)

    for (let i = 0; i < settings.maps.length; i++) {
      let map = settings.maps[i]
      fsMap.addRadio(
        'maps-' + map,
        WMEUI.t(NAME).maps[map],
        () => this.settings.set(['map'], map),
        'maps',
        map,
        this.settings.get('map') === map
      )
    }
    tab.addElement(fsMap)

    // Setup options for maps
    let fsOptions = this.helper.createFieldset(WMEUI.t(NAME).options.title)
    let checkboxes: Record<string, any> = {}
    for (let item in settings.options) {
      if (settings.options.hasOwnProperty(item)) {
        checkboxes['options-' + item] = {
          title: WMEUI.t(NAME).options[item],
          callback: (event: any) => this.settings.set(['options', item], event.target.checked),
          checked: this.settings.get('options', item),
        }
      }
    }
    fsOptions.addCheckboxes(checkboxes)
    tab.addElement(fsOptions)

    tab.addDiv('text', WMEUI.t(NAME).help)
    tab.addText(
      'info',
      '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version
    )
    tab.addText('blue', 'made in')
    tab.addText('yellow', 'Ukraine')
    tab.inject()
  }

  initShortcuts () {
    this.createShortcut('toggle', WMEUI.t(NAME).description, 'A+N', () => this.toggleMap())
  }

  /**
   * Show modal with map preview
   */
  toggleMap () {
    if (document.getElementById('e58-map-preview')) {
      this.log('hide preview map')
      $('.wme-ui-panel.e58 button.wme-ui-close-panel').click()
      return
    }

    /** @type {WMEUIHelperModal} */
    let modal = this.helper.createModal(
      WMEUI.t(NAME).title
    )
    // Setup Preview Map element
    let map = modal.addDiv('map-preview').html()
    modal.inject()

    this.log('show preview map', this.settings.get('map'))

    if (this.settings.get('map') === 'google') {
      let Google = new GooglePreview(map, this.settings, this.wmeSDK)
      Google.render()
    } else if (this.settings.get('map') === 'osm') {
      let OSM = new OSMPreview(map, this.settings, this.wmeSDK)
      OSM.render()
    } else {
      // disabled
      map.innerText = WMEUI.t(NAME).maps.description
    }
  }
}
