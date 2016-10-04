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

window.Playbasis = module.exports = Playbasis;