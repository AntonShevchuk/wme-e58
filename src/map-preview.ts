import { NAME } from './translations'

/**
 * Basic Map class
 */
export class MapPreview {
  uid: string
  map: any
  wrapper: HTMLDivElement
  settings: any
  controls: boolean
  interactive: boolean

  constructor (uid, container, settings) {
    this.uid = uid
    this.map = null
    this.wrapper = this._wrapper()

    container.append(this.wrapper)
    container.style.height = '256px'

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
    let center = new OpenLayers.Geometry.Point(W.map.getCenter().lon, W.map.getCenter().lat).transform('EPSG:900913', 'EPSG:4326')

    return {
      lon: center.x,
      lat: center.y,
    }
  }

  _zoom () {
    return W.map.getZoom() - 1
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
  constructor (container, settings) {
    super('Google', container, settings)
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
export class OSMPreview extends MapPreview {
  constructor (container, settings) {
    super('OSM', container, settings)
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
