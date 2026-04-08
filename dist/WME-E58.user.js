// ==UserScript==
// @name         WME E58 Map's previews
// @name:uk      WME 🇺🇦 E58 Map's previews
// @name:ru      WME 🇺🇦 E58 Map's previews
// @version      0.9.0
// @description  Create small previews for chosen map providers
// @description:uk Створює невеличку карту для перегляду
// @description:ru Создаёт небольшую карту для просмотра
// @license      MIT License
// @author       Anton Shevchuk
// @namespace    https://greasyfork.org/users/227648-anton-shevchuk
// @supportURL   https://github.com/AntonShevchuk/wme-e58/issues
// @match        https://*.waze.com/editor*
// @match        https://*.waze.com/*/editor*
// @exclude      https://*.waze.com/user/editor*
// @icon         data:image/png;base64,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
// @grant        none
// @require      https://update.greasyfork.org/scripts/389765/1785927/CommonUtils.js
// @require      https://update.greasyfork.org/scripts/450160/1785943/WME-Bootstrap.js
// @require      https://update.greasyfork.org/scripts/450221/1785960/WME-Base.js
// @require      https://update.greasyfork.org/scripts/450320/1785964/WME-UI.js
// ==/UserScript==

(function () {
    'use strict';

    const NAME = 'E58';
    const TRANSLATION = {
        'en': {
            // Tab title
            title: 'Map preview',
            // Tab description
            description: 'Open a small preview modal window with the map',
            // Tab help
            help: 'You can use the <strong>Keyboard shortcuts</strong> to open the map preview window. It\'s more convenient than clicking on the button.',
            maps: {
                // Fieldset's legend
                title: 'Sources',
                // Fieldset's description
                description: 'Choose a map provider',
                // Description for option `Google`
                google: 'Google',
                // Description for option `OSM`
                osm: 'Open Street Map',
            },
            options: {
                title: 'Options',
                description: 'Choose a map provider in the settings',
                controls: 'Controls on the map',
                interactive: 'Interaction with the map',
            },
        },
        'uk': {
            title: 'Карта',
            description: 'Відкрити маленьку карту',
            help: 'Використовуйте <strong>гарячі клавіши</strong>, це значно швидше ніж використовувати кнопку',
            maps: {
                title: 'Джерела',
                description: 'Оберіть карту для відображення',
                google: 'Google',
                osm: 'Open Street Map',
            },
            options: {
                title: 'Налаштування',
                description: 'Оберіть у налаштуваннях карту для відображення',
                controls: 'Елементи управління',
                interactive: 'Можливість взаємодіяти с картою',
            },
        },
        'ru': {
            title: 'Карта',
            description: 'Открыть маленькую карту',
            help: 'Используйте <strong>комбинации клавиш</strong>, и не надо будет клацать кнопку',
            maps: {
                title: 'Источники',
                description: 'Выберите карту для отображения',
                google: 'Google',
                osm: 'Open Street Map',
            },
            options: {
                title: 'Настройки',
                description: 'Выберите в настройках карту для отображения',
                controls: 'Элементы управления карты',
                interactive: 'Возможность взаимодействия с картой',
            },
        }
    };

    const SETTINGS = {
        map: 'google',
        maps: [
            'google', 'osm'
        ],
        options: {
            controls: false,
            interactive: false,
        }
    };

    /**
     * Basic Map class
     */
    class MapPreview {
        constructor(uid, container, settings, wmeSDK) {
            this.uid = uid;
            this.map = null;
            this.wrapper = this._wrapper();
            container.append(this.wrapper);
            container.style.height = '256px';
            this.settings = settings;
            this.wmeSDK = wmeSDK;
            this.controls = settings.get('options', 'controls');
            this.interactive = settings.get('options', 'interactive');
        }
        /**
         * Load external JS Map library
         * @param  {String} url
         * @return {Promise<*>}
         */
        async script(url) {
            return $.ajax({
                url: url,
                cache: true,
                dataType: 'script',
                success: () => console.log(NAME, this.uid, 'loaded')
            });
        }
        /**
         * Build div for map
         * @return {HTMLDivElement}
         * @protected
         */
        _wrapper() {
            let div = document.createElement('div');
            div.id = this._uid();
            div.style.height = '256px';
            return div;
        }
        _uid() {
            return NAME + '-map-' + this.uid;
        }
        _center() {
            let center = this.wmeSDK.Map.getMapCenter();
            return {
                lon: center.lon,
                lat: center.lat,
            };
        }
        _zoom() {
            return this.wmeSDK.Map.getZoomLevel() - 1;
        }
        update() {
            let center = this._center();
            this._update(center.lat, center.lon, this._zoom());
        }
        _update(lat, lon, zoom) {
            throw new Error('Abstract method');
        }
    }
    /**
     * Google Maps
     */
    class GooglePreview extends MapPreview {
        constructor(container, settings, wmeSDK) {
            super('Google', container, settings, wmeSDK);
        }
        async render() {
            let pos = this._center();
            this.map = new google.maps.Map(this.wrapper, {
                center: new google.maps.LatLng(pos.lat, pos.lon),
                zoom: this._zoom(),
                mapTypeId: 'roadmap',
                mapTypeControl: false,
                streetViewControl: false,
                disableDefaultUI: !this.controls,
                gestureHandling: this.interactive ? 'cooperative' : 'none',
                zoomControl: this.controls,
            });
            // Setup handler
            this.wmeSDK.Events.on({ eventName: 'wme-map-move-end', eventHandler: () => this.update() });
        }
        _update(lat, lon, zoom) {
            this.map.setZoom(zoom);
            this.map.setCenter(new google.maps.LatLng(lat, lon));
        }
    }
    /**
     * Open Street Maps
     */
    class OSMPreview extends MapPreview {
        constructor(container, settings, wmeSDK) {
            super('OSM', container, settings, wmeSDK);
        }
        async render() {
            let pos = this._center();
            this.map = new google.maps.Map(this.wrapper, {
                center: new google.maps.LatLng(pos.lat, pos.lon),
                zoom: this._zoom(),
                mapTypeId: 'OSM',
                mapTypeControl: false,
                streetViewControl: false,
                disableDefaultUI: !this.controls,
                gestureHandling: this.interactive ? 'cooperative' : 'none',
                zoomControl: this.controls,
            });
            // Define OSM map type pointing at the OpenStreetMap tile server
            this.map.mapTypes.set('OSM', new google.maps.ImageMapType({
                getTileUrl: function (coord, zoom) {
                    return 'https://tile.openstreetmap.org/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
                },
                tileSize: new google.maps.Size(256, 256),
                name: 'OpenStreetMap',
                maxZoom: 18
            }));
            // Setup handler
            this.wmeSDK.Events.on({ eventName: 'wme-map-move-end', eventHandler: () => this.update() });
        }
        _update(lat, lon, zoom) {
            this.map.setZoom(zoom);
            this.map.setCenter(new google.maps.LatLng(lat, lon));
        }
    }

    /**
     * E58 Map Preview class
     */
    class E58 extends WMEBase {
        constructor(name, settings) {
            super(name, settings);
            this.initTab(settings);
            this.initShortcuts();
        }
        initTab(settings) {
            let tab = this.helper.createTab(WMEUI.t(NAME).title, {
                sidebar: this.wmeSDK.Sidebar,
                image: GM_info.script.icon
            });
            tab.addText('description', WMEUI.t(NAME).description);
            tab.addButton('preview', WMEUI.t(NAME).title, '', () => this.toggleMap(), { className: 'waze-btn waze-btn-small waze-btn-white waze-btn-blue' });
            // Setup providers map settings
            let fsMap = this.helper.createFieldset(WMEUI.t(NAME).maps.title);
            for (let i = 0; i < settings.maps.length; i++) {
                let map = settings.maps[i];
                fsMap.addRadio('maps-' + map, WMEUI.t(NAME).maps[map], () => this.settings.set('map', map), 'maps', map, this.settings.get('map') === map);
            }
            tab.addElement(fsMap);
            // Setup options for maps
            let fsOptions = this.helper.createFieldset(WMEUI.t(NAME).options.title);
            let checkboxes = {};
            for (let item in settings.options) {
                if (settings.options.hasOwnProperty(item)) {
                    checkboxes['options-' + item] = {
                        title: WMEUI.t(NAME).options[item],
                        callback: (event) => this.settings.set('options', item, event.target.checked),
                        checked: this.settings.get('options', item),
                    };
                }
            }
            fsOptions.addCheckboxes(checkboxes);
            tab.addElement(fsOptions);
            tab.addDiv('text', WMEUI.t(NAME).help);
            tab.addText('info', '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version);
            tab.addText('blue', 'made in');
            tab.addText('yellow', 'Ukraine');
            tab.inject();
        }
        initShortcuts() {
            this.createShortcut('toggle', WMEUI.t(NAME).description, 'A+N', () => this.toggleMap());
        }
        /**
         * Show modal with map preview
         */
        toggleMap() {
            if (document.getElementById('e58-map-preview')) {
                this.log('hide preview map');
                $('.wme-ui-panel.e58 button.wme-ui-close-panel').click();
                return;
            }
            /** @type {WMEUIHelperModal} */
            let modal = this.helper.createModal(WMEUI.t(NAME).title);
            // Setup Preview Map element
            let map = modal.addDiv('map-preview').html();
            modal.inject();
            this.log('show preview map', this.settings.get('map'));
            if (this.settings.get('map') === 'google') {
                let Google = new GooglePreview(map, this.settings, this.wmeSDK);
                Google.render();
            }
            else if (this.settings.get('map') === 'osm') {
                let OSM = new OSMPreview(map, this.settings, this.wmeSDK);
                OSM.render();
            }
            else {
                // disabled
                map.innerText = WMEUI.t(NAME).maps.description;
            }
        }
    }

    var css_248z = ".e58 .header h5 {\n  padding: 16px 16px 0;\n  font-size: 16px;\n}\n.e58 legend {\n  cursor: pointer;\n  font-size: 12px;\n  font-weight: bold;\n  width: auto;\n  text-align: right;\n  border: 0;\n  margin: 0;\n  padding: 0 8px;\n}\n.e58 fieldset {\n  border: 1px solid #ddd;\n  padding: 4px;\n}\n.e58 fieldset p {\n  padding: 0;\n  margin: 0 8px !important;\n}\n.e58 fieldset.e58 .wme-ui-fieldset-content label {\n  white-space: normal;\n  font-weight: 400;\n}\ndiv.e58.e58-text {\n  margin: 15px 0;\n}\n.e58 .wme-ui-tab-content {\n  padding: 8px;\n}\np.e58-info {\n  border-top: 1px solid #ccc;\n  color: #777;\n  font-size: x-small;\n  margin-top: 15px;\n  padding-top: 10px;\n  text-align: center;\n}\n#sidebar p.e58-blue {\n  background-color: #0057B8;\n  color: white;\n  height: 32px;\n  text-align: center;\n  line-height: 32px;\n  font-size: 24px;\n  margin: 0;\n}\n#sidebar p.e58-yellow {\n  background-color: #FFDD00;\n  color: black;\n  height: 32px;\n  text-align: center;\n  line-height: 32px;\n  font-size: 24px;\n  margin: 0;\n}\n";

    $(document).on('bootstrap.wme', () => {
        WMEUI.addTranslation(NAME, TRANSLATION);
        WMEUI.addStyle(css_248z);
        new E58(NAME, SETTINGS);
    });

})();
