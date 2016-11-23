# redis-skim
An easier way to scan Redis keys

### Usage
```bash
$ npm install redis-skim
```

### Example
```javascript
'use strict';

var redis = require('redis');
var skim = require('redis-skim');

var client = redis.createClient();

var keys = [];

skim({
  client: client,
  pattern: '*',
  onData: function(result) {
    keys = keys.concat(result);
  },
  onEnd: function(err) {
    var chores = [];

    if (err) {
      console.error(err);
      return client.end();
    }
    console.log('found all these keys: ', keys);

    keys.forEach(function(key) {
      chores.push(['get', key]);
    });

    client.multi(chores).exec(function(err, replies) {
      console.dir(replies);
    });

    return client.quit(function (err, res) {
        console.log('Exiting from quit command.');
    });
  }
});

```
