/**
 *
 * @author     richen
 * @copyright  Copyright (c) 2017 - <richenlin(at)gmail.com>
 * @license    MIT
 * @version    17/6/6
 */
const lib = require('think_lib');
const orm = require('thinkorm');
/*eslint-disable consistent-return */
module.exports = function (options) {
    think.app.once('appReady', () => {
        let models = think._caches.models || null;
        if (!options || !models || !options.db_type || !options.db_host) {
            return;
        }
        //print sql
        options.db_ext_config.db_log_sql = think.app_debug || false;
        let ps = [], n;
        for (n in models) {
            ps.push(orm.setCollection(models[n], options));
        }
        return Promise.all(ps);
    });

    return function (ctx, next) {
        return next();
    };
};