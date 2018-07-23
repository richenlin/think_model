/**
 *
 * @author     richen
 * @copyright  Copyright (c) 2017 - <richenlin(at)gmail.com>
 * @license    MIT
 * @version    17/6/6
 */
const lib = require('think_lib');
const loader = require('think_loader');
const logger = require('think_logger');
/**
 * default options
 */
const defaultOptions = {
    db_type: 'mysql', //support  postgresql,mysql...
    db_host: '127.0.0.1',
    db_port: 3306,
    db_name: '',
    db_user: '',
    db_pwd: '',
    db_prefix: 'think_',
    db_charset: 'utf8'
};
/*eslint-disable consistent-return */
module.exports = function (options, app) {
    options = options ? lib.extend(defaultOptions, options, true) : defaultOptions;
    app.once('appReady', () => {
        let models = loader(app.app_path, { root: 'model', prefix: '' }) || null;
        if (!options || !models || !options.db_type || !options.db_host) {
            return;
        }
        //get db instances
        let n = Object.keys(models);
        if (n && n[0]) {
            //set proterty
            lib.define(app, 'model', models);
            try{
                let cls = new (models[n[0]])(options);
                return cls.getInstance();
            } catch (e){
                logger.warn(e.message);
                return;
            }
        }
        return;
    });

    return function (ctx, next) {
        return next();
    };
};