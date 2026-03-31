import { NAME } from './translations'
import { GooglePreview, OSMPreview } from './map-preview'

/**
 * E58 Map Preview class
 */
export class E58 extends WMEBase {
  helper: any

  constructor (name, settings) {
    super(name, settings)

    this.initHelper()

    this.initTab(settings)

    this.initShortcuts()
  }

  initHelper() {
    this.helper = new WMEUIHelper(this.name)
  }

  initTab (settings) {
    let tab = this.helper.createTab(
      I18n.t(this.name).title,
      {
        sidebar: this.wmeSDK.Sidebar,
        image: GM_info.script.icon
      }
    )
    tab.addText('description', I18n.t(this.name).description)
    let button = tab.addButton('preview', I18n.t(this.name).title, '', () => this.toggleMap())
    button.html().className += ' waze-btn-blue'

    // Setup providers map settings
    let fsMap = this.helper.createFieldset(I18n.t(this.name).maps.title)

    for (let i = 0; i < settings.maps.length; i++) {
      let map = settings.maps[i]
      fsMap.addRadio(
        'maps-' + map,
        I18n.t(this.name).maps[map],
        () => this.settings.set(['map'], map),
        'maps',
        map,
        this.settings.get('map') === map
      )
    }
    tab.addElement(fsMap)

    // Setup options for maps
    let fsOptions = this.helper.createFieldset(I18n.t(this.name).options.title)
    for (let item in settings.options) {
      if (settings.options.hasOwnProperty(item)) {
        fsOptions.addCheckbox(
          'options-' + item,
          I18n.t(this.name).options[item],
          (event) => this.settings.set(['options', item], event.target.checked),
          this.settings.get('options', item))
      }
    }
    tab.addElement(fsOptions)

    tab.addDiv('text', I18n.t(this.name).help)
    tab.addText(
      'info',
      '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version
    )
    tab.addText('blue', 'made in')
    tab.addText('yellow', 'Ukraine')
    tab.inject()
  }

  initShortcuts () {
    let shortcut = {
      callback: () => this.toggleMap(),
      description: I18n.t(this.name).description,
      shortcutId: this.id,
      shortcutKeys: 'A+N',
    };

    if (this.wmeSDK.Shortcuts.areShortcutKeysInUse({ shortcutKeys: shortcut.shortcutKeys })) {
      this.log('Shortcut already in use')
      shortcut.shortcutKeys = null
    }
    this.wmeSDK.Shortcuts.createShortcut(shortcut);
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
      I18n.t(this.name).title
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
      map.innerText = I18n.t(this.name).maps.description
    }
  }
}
