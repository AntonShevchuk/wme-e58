import { NAME } from './translations'

/**
 * Basic Map class
 */
export class MapPreview {
  uid: string
  map: any
  wrapper: HTMLDivElement
  settings: any
  wmeSDK: any
  controls: boolean
  interactive: boolean

  constructor (uid: string, container: any, settings: any, wmeSDK: any) {
    this.uid = uid
    this.map = null
    this.wrapper = this._wrapper()

    container.append(this.wrapper)
    container.style.height = '256px'

    this.settings = settings
    this.wmeSDK = wmeSDK
    this.controls = settings.get('options', 'controls')
    this.interactive = settings.get('options', 'interactive')
  }

  /**
   * Load external JS Map library
   * @param  {String} url
   * @return {Promise<*>}
   */
  async script (url) {
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
    div.style.height = '256px'
    return div
  }

  _uid () {
    return NAME + '-map-' + this.uid
  }

  _center () {
    let center = this.wmeSDK.Map.getMapCenter()
    return {
      lon: center.lon,
      lat: center.lat,
    }
  }

  _zoom () {
    return this.wmeSDK.Map.getZoomLevel() - 1
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
 * Google Maps
 */
export class GooglePreview extends MapPreview {
  constructor (container: any, settings: any, wmeSDK: any) {
    super('Google', container, settings, wmeSDK)
  }

  async render () {
    let pos = this._center()
    this.map = new google.maps.Map(this.wrapper, {
      center: new google.maps.LatLng(pos.lat, pos.lon),
      zoom: this._zoom(),
      mapTypeId: 'roadmap',
      mapTypeControl: false,
      streetViewControl: false,
      disableDefaultUI: !this.controls,
      gestureHandling: this.interactive ? 'cooperative' : 'none',
      zoomControl: this.controls,
    })

    // Setup handler
    this.wmeSDK.Events.on({ eventName: 'wme-map-move-end', eventHandler: () => this.update() })
  }

  _update (lat, lon, zoom) {
    this.map.setZoom(zoom)
    this.map.setCenter(new google.maps.LatLng(lat, lon))
  }
}

/**
 * Open Street Maps
 */
export class OSMPreview extends MapPreview {
  constructor (container: any, settings: any, wmeSDK: any) {
    super('OSM', container, settings, wmeSDK)
  }

  async render () {
    let pos = this._center()
    this.map = new google.maps.Map(this.wrapper, {
      center: new google.maps.LatLng(pos.lat, pos.lon),
      zoom: this._zoom(),
      mapTypeId: 'OSM',
      mapTypeControl: false,
      streetViewControl: false,
      disableDefaultUI: !this.controls,
      gestureHandling: this.interactive ? 'cooperative' : 'none',
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
    this.wmeSDK.Events.on({ eventName: 'wme-map-move-end', eventHandler: () => this.update() })
  }

  _update (lat, lon, zoom) {
    this.map.setZoom(zoom)
    this.map.setCenter(new google.maps.LatLng(lat, lon))
  }
}
