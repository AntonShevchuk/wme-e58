// ==UserScript==
// @name         WME E58 Map's previews
// @version      0.4.7
// @description  Create small previews for chosen map providers
// @license      MIT License
// @author       Anton Shevchuk
// @namespace    https://greasyfork.org/users/227648-anton-shevchuk
// @supportURL   https://github.com/AntonShevchuk/wme-e58/issues
// @match        https://*.waze.com/editor*
// @match        https://*.waze.com/*/editor*
// @exclude      https://*.waze.com/user/editor*
// @icon         data:image/png;base64,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
// @grant        none
// @connect      maps.api.2gis.ru
// @connect      vector.hereapi.com
// @require      https://greasyfork.org/scripts/389765-common-utils/code/CommonUtils.js?version=1090053
// @require      https://greasyfork.org/scripts/450160-wme-bootstrap/code/WME-Bootstrap.js?version=1126584
// @require      https://greasyfork.org/scripts/450221-wme-base/code/WME-Base.js?version=1101617
// @require      https://greasyfork.org/scripts/450320-wme-ui/code/WME-UI.js?version=1127617
// ==/UserScript==

/* jshint esversion: 8 */
/* global require */
/* global $ */
/* global W */
/* global I18n */
/* global WME, WMEBase, WMEUI, WMEUIHelper */
/* global Container, Settings, SimpleCache, Tools  */
/* global H, google */

(function () {
  'use strict'

  const NAME = 'E58'

  // Translation
  const TRANSLATION = {
    'en': {
      // Tab title
      title: 'Maps',
      // Tab description
      description: 'Reload page for apply changes',
      maps: {
        // Fieldset's legend
        title: 'Sources',
        // Fieldset's description
        description: 'To avoid UI issues don\'t use more than two maps providers',
        // Description for option `gis`
        gis: '2GIS',
        // Description for option `Google`
        google: 'Google',
        // Description for option `HERE`
        here: 'HERE',
        // Description for option `OSM`
        osm: 'Open Street Map',
      },
      options: {
        title: 'Options',
        controls: 'Controls on the map',
        interactive: 'Interaction with the map',
      },
      position: {
        title: 'Position',
        options: {
          top: 'Top',
          bottom: 'Bottom',
        }
      },
      height: {
        title: 'Height of the map'
      },
    },
    'uk': {
      title: 'Карти',
      description: 'Оновіть сторінку після внесення змін',
      maps: {
        title: 'Джерела',
        description: 'Для запобігання проблем з інтерфейсом не використовуйте одразу більше ніж дві карти',
        gis: '2GIS',
        google: 'Google',
        here: 'HERE',
        osm: 'Open Street Map',
      },
      options: {
        title: 'Налаштування',
        controls: 'Елементи управління',
        interactive: 'Можливість взаємодіяти с картою',
      },
      position: {
        title: 'Розташування',
        options: {
          top: 'Зверху',
          bottom: 'Знизу',
        },
      },
      height: {
        title: 'Висота карти'
      },
    },
    'ru': {
      title: 'Карты',
      description: 'Обновите страницу после изменений',
      maps: {
        title: 'Источники',
        description: 'Для избежания проблем с интерфейсом не используйте больше двух карт',
        gis: '2GIS',
        google: 'Google',
        here: 'HERE',
        osm: 'Open Street Map',
      },
      options: {
        title: 'Настройки',
        controls: 'Элементи управления карты',
        interactive: 'Возможность взаимодествия с картой',
      },
      position: {
        title: 'Позиция панели',
        options: {
          top: 'Вверху',
          bottom: 'Внизу',
        },
      },
      height: {
        title: 'Высота элемента'
      },
    }
  }

  const STYLE = '#sidebar #links:before { display: none; }' +
    '#E58-map-container { max-height: 50vh; }' +
    '.e58 legend { cursor:pointer; font-size: 12px; font-weight: bold; width: auto; text-align: right; border: 0; margin: 0; padding: 0 8px; }' +
    '.e58 fieldset { border: 1px solid #ddd; padding: 4px; }' +
    '.e58 fieldset p { padding: 0; margin: 0 8px !important; }' +
    '.e58 fieldset.e58 div.controls label { white-space: normal; font-weight: 400; }' +
    '.e58 .e58-height input { margin-bottom: 4px }' +
    '.e58 .e58-height label { display:block; text-align: center }' +
    '.e58 .e58-height label::after { margin: 0 0 0 8px; padding: 4px; border: 0; }' +
    'p.e58-info { border-top: 1px solid #ccc; color: #777; font-size: x-small; margin-top: 15px; padding-top: 10px; text-align: center; }'

  WMEUI.addTranslation(NAME, TRANSLATION)
  WMEUI.addStyle(STYLE)

  // Default settings
  const SETTINGS = {
    maps: {
      gis: false,
      google: false,
      here: false,
      osm: false,
    },
    options: {
      controls: false,
      interactive: false,
    },
    position: 'bottom',
    height: 200,
  }

  const position = [
    'top', 'bottom'
  ]

  const height = {
    min: 100, max: 250, value: 200, step: 10
  }

  /**
   * Basic Map class
   */
  class MapPreview {
    constructor (uid, container, settings) {
      this.uid = uid
      this.map = null
      this.wrapper = this._wrapper()
      container.append(this.wrapper)

      this.settings = settings
      this.controls = settings.get('options', 'controls')
      this.interactive = settings.get('options', 'interactive')
    }

    /**
     * Load external JS Map library
     * @param  {String} url
     * @return {Promise<*>}
     */
    async script (url) {
      this.wrapper.style.height = this.settings.get('height') + 'px'
      return $.ajax({
        url: url,
        cache: true,
        dataType: 'script',
        success: () => console.log(NAME, this.uid, 'loaded')
      })
    }

    /**
     * Build div for map
     * @return {HTMLDivElement}
     * @protected
     */
    _wrapper () {
      let div = document.createElement('div')
      div.id = this._uid()
      return div
    }

    _uid () {
      return NAME + '-map-' + this.uid
    }

    _center () {
      return W.map.getCenter().transform('EPSG:900913', 'EPSG:4326')
    }

    _zoom () {
      return W.map.getZoom()
    }

    update () {
      let center = this._center()
      this._update(center.lat, center.lon, this._zoom())
    }

    _update (lat, lon, zoom) {
      throw new Error('Abstract method')
    }
  }

  /**
   * 2Gis
   */
  class GisPreview extends MapPreview {
    constructor (container, settings) {
      super('2Gis', container, settings)
    }

    async render () {
      await this.script('https://maps.api.2gis.ru/2.0/loader.js?pkg=basic')
      let pos = this._center()
      DG.then(() => {
        this.map = DG.map(this._uid(), {
          center: [pos.lat, pos.lon],
          zoom: this._zoom(),
          fullscreenControl: this.controls,
          zoomControl: this.controls,
          boxZoom: this.controls,
          doubleClickZoom: this.interactive,
          scrollWheelZoom: this.interactive,
          dragging: this.interactive,
          keyboard: this.interactive,
          currentLang: 'ru' // language interface
        })
        // Setup handler
        W.map.events.register('moveend', null, () => this.update())
      })
    }

    _update (lat, lon, zoom) {
      this.map.setZoom(zoom)
      this.map.panTo([lat, lon])
    }
  }

  /**
   * Google Maps
   */
  class GooglePreview extends MapPreview {
    constructor (container, settings) {
      super('Google', container, settings)
    }

    async render () {
      let pos = this._center()
      let container = document.getElementById(this._uid())
      container.style.height = settings.get('height') + 'px'
      this.map = new google.maps.Map(container, {
        center: new google.maps.LatLng(pos.lat, pos.lon),
        zoom: this._zoom(),
        mapTypeId: 'roadmap',
        mapTypeControl: false,
        streetViewControl: false,
        disableDefaultUI: !this.controls,
        gestureHandling: this.interactive ? 'cooperative ' : 'none',
        zoomControl: this.controls,
      })

      // Setup handler
      W.map.events.register('moveend', null, () => this.update())
    }

    _update (lat, lon, zoom) {
      this.map.setZoom(zoom)
      this.map.setCenter(new google.maps.LatLng(lat, lon))
    }
  }

  /**
   * Open Street Maps
   */
  class OSMPreview extends MapPreview {
    constructor (container, settings) {
      super('OSM', container, settings)
    }

    async render () {
      let pos = this._center()
      let container = document.getElementById(this._uid())
      container.style.height = settings.get('height') + 'px'
      this.map = new google.maps.Map(container, {
        center: new google.maps.LatLng(pos.lat, pos.lon),
        zoom: this._zoom(),
        mapTypeId: 'OSM',
        mapTypeControl: false,
        streetViewControl: false,
        disableDefaultUI: !this.controls,
        gestureHandling: this.interactive ? 'cooperative ' : 'none',
        zoomControl: this.controls,
      })

      // Define OSM map type pointing at the OpenStreetMap tile server
      this.map.mapTypes.set('OSM', new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
          return 'https://tile.openstreetmap.org/' + zoom + '/' + coord.x + '/' + coord.y + '.png'
        },
        tileSize: new google.maps.Size(256, 256),
        name: 'OpenStreetMap',
        maxZoom: 18
      }))

      // Setup handler
      W.map.events.register('moveend', null, () => this.update())
    }

    _update (lat, lon, zoom) {
      this.map.setZoom(zoom)
      this.map.setCenter(new google.maps.LatLng(lat, lon))
    }
  }

  /**
   * Here Maps
   */
  class HerePreview extends MapPreview {
    constructor (container, settings) {
      super('Here', container, settings)
    }

    async render () {
      await this.script('https://js.api.here.com/v3/3.1/mapsjs-core.js')
      await this.script('https://js.api.here.com/v3/3.1/mapsjs-service.js')

      let pos = this._center()

      // Initialize the platform object:
      let platform = new H.service.Platform({
        'apikey': 'vmj30nPbru3jmJdcln4' + '-wJe-' + 'w3BH6CrCxHZaku8UbY4'
      })

      // Obtain the default map types from the platform object
      let mapTypes = platform.createDefaultLayers()

      // Instantiate (and display) a map object:
      this.map = new H.Map(
        document.getElementById(this._uid()),
        mapTypes.vector.normal.map,
        {
          zoom: this._zoom(),
          center: { lng: pos.lon, lat: pos.lat }
        })
      // Setup handler
      W.map.events.register('moveend', null, () => this.update())
    }

    _update (lat, lon, zoom) {
      this.map.setZoom(zoom)
      this.map.setCenter(new H.geo.Point(lat, lon))
    }
  }

  let helper, tab, sidebar
  let settings = new Settings(NAME, SETTINGS)

  // Handlers
  $(document).on('bootstrap.wme', ready)
  $(window).on('beforeunload', () => settings.save())

  function ready () {
    // Setup Tab with options
    helper = new WMEUIHelper(NAME)
    tab = helper.createTab(
      I18n.t(NAME).title,
      I18n.t(NAME).description,
      {
        icon: '<i class="w-icon panel-header-component-icon w-icon-map"></i>'
      }
    )

    // Setup providers map settings
    let fsMap = helper.createFieldset(I18n.t(NAME).maps.title, I18n.t(NAME).maps.description)
    let maps = settings.get('maps')
    for (let item in maps) {
      if (maps.hasOwnProperty(item)) {
        fsMap.addCheckbox('maps-' + item, I18n.t(NAME).maps[item], I18n.t(NAME).maps[item], function (event) {
          settings.set(['maps', item], event.target.checked)
        }, settings.get('maps', item))
      }
    }
    tab.addElement(fsMap)

    // Setup options for maps
    let fsOptions = helper.createFieldset(I18n.t(NAME).options.title)
    let options = settings.get('options')
    for (let item in options) {
      if (options.hasOwnProperty(item)) {
        fsOptions.addCheckbox('options-' + item, I18n.t(NAME).options[item], I18n.t(NAME).options[item], function (event) {
          settings.set(['options', item], event.target.checked)
        }, settings.get('options', item))
      }
    }
    tab.addElement(fsOptions)

    // Setup position and height options for maps
    let fsPosition = helper.createFieldset(I18n.t(NAME).position.title)
    position.forEach(value => {
      fsPosition.addRadio('position', I18n.t(NAME).position.options[value], I18n.t(NAME).position.options[value], function (event) {
        if (event.target.checked) {
          settings.set(['position'], event.target.value)
        }
      }, value, settings.get('position') === value)
    })

    fsPosition.addRange('height', I18n.t(NAME).height.title, I18n.t(NAME).height.title, function (event) {
      settings.set(['height'], event.target.value)
      console.log(event.target)
      addHeightStyle(event.target.value)
    }, height.min, height.max, settings.get('height'), height.step)
    addHeightStyle(settings.get('height'))

    tab.addElement(fsPosition)

    tab.addText(
      'info',
      '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version
    )

    tab.inject()

    // Setup Preview Map element
    sidebar = document.createElement('div')
    sidebar.id = NAME + '-map-container'
    sidebar.className = 'flex-noshrink'

    // Injection
    let content = document.getElementById('sidebarContent')
    if (settings.get('position') === 'top') {
      document.getElementById('sidebar').insertBefore(sidebar, content)
    } else {
      document.getElementById('sidebar').insertBefore(sidebar, content.nextSibling)
    }

    if (settings.get('maps', 'gis')) {
      let Gis = new GisPreview(sidebar, settings)
      Gis.render()
    }
    if (settings.get('maps', 'google')) {
      let Google = new GooglePreview(sidebar, settings)
      Google.render()
    }
    if (settings.get('maps', 'here')) {
      let Here = new HerePreview(sidebar, settings)
      Here.render()
    }
    if (settings.get('maps', 'osm')) {
      let OSM = new OSMPreview(sidebar, settings)
      OSM.render()
    }
  }

  function addHeightStyle (height) {
    WMEUI.addStyle('.e58 .e58-height label::after { content: "' + height + '" }')
  }
})()
