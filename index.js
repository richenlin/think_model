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
        return Promise.all(ps).then(() => {
            think.model = function (name, config) {
                try {
                    let cls;
                    if (!lib.isString(name) && name.__filename) {
                        cls = lib.require(name.__filename);
                    } else if (think._caches.models[name]) {
                        cls = think._caches.models[name];
                    }
                    if (!cls) {
                        return think.log(`Model ${name} is undefined`, 'ERROR');
                    }
                    if (config === undefined) {
                        return cls;
                    }
                    config = lib.extend(options || {}, config);
                    //print sql
                    config.db_ext_config && (config.db_ext_config.db_log_sql = think.app_debug || false);
                    return new cls(config || {});
                } catch (e) {
                    think.log(e);
                    return null;
                }
            };
            return;
        });
    });

    return function (ctx, next) {
        return next();
    };
};