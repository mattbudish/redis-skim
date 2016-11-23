module.exports = function(opts) {
  var cursor = '0',
    onEnd = opts.onEnd || function() {},
    onData = opts.onData || function() {};

  return function scan(opts) {
    opts.client.scan(cursor, 'MATCH', opts.pattern, function(err, res) {
      if (err) {
        return onEnd(err);
      }

      cursor = res[0];
      onData(res[1]);

      if (cursor === '0') {
        onEnd();
        return;
      }

      return scan(opts);
    });
  }(opts);
}
