// ==UserScript==
// @name         WME E58 Map's previews
// @name:uk      WME 🇺🇦 E58 Map's previews
// @name:ru      WME 🇺🇦 E58 Map's previews
// @version      {{version}}
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
// @require      https://update.greasyfork.org/scripts/389765/1794584/CommonUtils.js
// @require      https://update.greasyfork.org/scripts/450160/1792042/WME-Bootstrap.js
// @require      https://update.greasyfork.org/scripts/450221/1804989/WME-Base.js
// @require      https://update.greasyfork.org/scripts/450320/1796236/WME-UI.js
// ==/UserScript==
