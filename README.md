# 介绍
-----

[![npm version](https://badge.fury.io/js/think_model.svg)](https://badge.fury.io/js/think_model)
[![Dependency Status](https://david-dm.org/thinkkoa/think_model.svg)](https://david-dm.org/thinkkoa/think_model)

Model for ThinkKoa, used ThinkORM

# 安装
-----

```
npm i thinkorm --save
//使用mysql数据库
npm i thinkorm_adapter_mysql --save

npm i think_model --save
```

# 使用
-----

1、项目中增加中间件 middleware/model.js
```
module.exports = require('think_model');
```

2、项目中间件配置 config/middleware.js:
```
list: [...,'model'], //加载的中间件列表
config: { //中间件配置
    ...,
    model: {
        db_type: 'mysql', // 数据库类型,支持mysql,postgressql
        db_host: '', // 服务器地址
        db_port: 3306, // 端口
        db_name: '', // 数据库名
        db_user: '', // 用户名
        db_pwd: '', // 密码
        db_prefix: '', // 数据库表前缀
        db_charset: '', // 数据库编码默认采用utf8
        db_nums_per_page: 20, //查询分页每页显示的条数
        db_ext_config: { //数据库连接时候额外的参数
            db_log_sql: true, //打印sql
            read_write: false, //读写分离(mysql, postgresql)
            db_pool_size: 10, //连接池大小
            db_replicaset: '', //mongodb replicaset
            db_conn_url: '', //数据链接
        } 
    }
}
```