# @fibjs/pool

pool module for fibjs.

This module can be used to implement db connection pool or other situation like this.

# Usage

```js

const pool = require('@fibjs/pool');
const db = require('db');

const sqlConnString = 'mysql://root:123456@localhost/test';
const ConnPool =  Pool(() => db.open(config), 20, 10000);

const apps = ConnPool(conn => {
    const sql = "select * from apps where appid = ? and version = ?";
    const appid = 2;
    const version = '2.3.0';
    return conn.execute(sql, appid, version);
});

```

# License

[MIT](./License)
