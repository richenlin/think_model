/**
 *
 * @author     richen
 * @copyright  Copyright (c) 2017 - <richenlin(at)gmail.com>
 * @license    MIT
 * @version    17/6/6
 */
const lib = require('think_lib');
const loader = require('think_loader');
const thinkorm = require('thinkorm');
/**
 * default options
 */
const defaultOptions = {
    db_type: 'mysql', // 数据库类型,支持mysql,mongo,postgressql
    db_host: '127.0.0.1', // 服务器地址
    db_port: 3306, // 端口
    db_name: '', // 数据库名
    db_user: 'root', // 用户名
    db_pwd: '', // 密码
    db_prefix: 'think_', // 数据库表前缀
    db_charset: 'utf8', // 数据库编码默认采用utf8
    db_nums_per_page: 20, //查询分页每页显示的条数
    db_ext_config: { //数据库连接时候额外的参数
        db_log_sql: true, //打印sql
        read_write: false, //读写分离(mysql, postgresql)
        db_pool_size: 10, //连接池大小
        db_replicaset: '', //mongodb replicaset
        db_conn_url: '', //数据链接
    }
};
/*eslint-disable consistent-return */
module.exports = function (options, app) {
    options = options ? lib.extend(defaultOptions, options, true) : defaultOptions;
    
    app.once('appReady', () => {
        let models = loader(app.app_path, {root: 'model', prefix: ''}) || null;
        if (!options || !models || !options.db_type || !options.db_host) {
            return;
        }
        //print sql
        options.db_ext_config.db_log_sql = process.env.NODE_ENV === 'development' ? true : false;
        //load models..
        let ps = [], n;
        for (n in models) {
            ps.push(thinkorm.setCollection(models[n], options));
        }
        return Promise.all(ps);
    });

    return function (ctx, next) {
        return next();
    };
};