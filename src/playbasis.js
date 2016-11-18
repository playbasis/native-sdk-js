/**
 * @namespace  Playbasis
 */

var Playbasis = require('./core/core.js')();

// -- constant -- //
require('./core/core.constant.js')(Playbasis);

// -- helpers -- //
require('./helpers/helpers.js')(Playbasis);
require('./helpers/helpers.builder.js')(Playbasis);

// -- http -- //
require('./http/http.js')(Playbasis);

// -- api -- //
require('./api/api.auth.js')(Playbasis);
require('./api/api.player.js')(Playbasis);
require('./api/api.badge.js')(Playbasis);
require('./api/api.goods.js')(Playbasis);
require('./api/api.merchant.js')(Playbasis);
require('./api/api.engine.js')(Playbasis);
require('./api/api.quest.js')(Playbasis);
require('./api/api.redeem.js')(Playbasis);
require('./api/api.communication.js')(Playbasis);
require('./api/api.livefeed.js')(Playbasis);
require('./api/api.service.js')(Playbasis);
require('./api/api.storeOrganize.js')(Playbasis);
require('./api/api.content.js')(Playbasis);
require('./api/api.quiz.js')(Playbasis);

// -- vendors -- //
require('./vendors/vendor.qrcode.generator.js')(Playbasis);

module.exports = Playbasis;
// if it's in browser environment
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
if (isBrowser()) {
    window.Playbasis = Playbasis;
}