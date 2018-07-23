# 介绍
-----

[![npm version](https://badge.fury.io/js/think_model.svg)](https://badge.fury.io/js/think_model)
[![Dependency Status](https://david-dm.org/thinkkoa/think_model.svg)](https://david-dm.org/thinkkoa/think_model)

Model for ThinkKoa, used ThinkORM

# 注意

仅适用于ThinkORM 3.x版本。预加载项目模型类，并创建连接池。

# 安装
-----

```
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
        db_type: 'mysql', //support  postgresql,mysql...
        db_host: '127.0.0.1',
        db_port: 3306,
        db_name: '',
        db_user: '',
        db_pwd: '',
        db_prefix: 'think_',
        db_charset: 'utf8'
    }
}
```