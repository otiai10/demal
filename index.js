module.exports = (function() {
  var Demal = function(raw, dict) {
    this.raw  = raw  || '';
    this.dict = dict || {};
  };
  Demal.parse = function(str) {
    const dict = str.split(',')
    .map(function(e) { return e.split('|'); })
    .reduce(function(self, kvp) {
      if (kvp.length < 2) return self;
      var key = kvp[0], val = kvp[1];
      return Demal._recursiveSet(self, key.split('.'), val);
    }, {});
    return new Demal(str, dict);
  };
  Demal._recursiveSet = function(self, keys, val) {
    if (keys.length == 1) {
      self[keys[0]] = Demal._primitiveCast(val);
      return self;
    }
    self[keys[0]] = Demal._recursiveSet(self[keys[0]] ? self[keys[0]] : {}, keys.slice(1), val);
    return self;
  };
  Demal._primitiveCast = function(val) {
    // TODO: refactor
    switch(val) {
    case "true": return  true;
    case "false": return false;
    }
    if (val.match(/[0-9]+\.?[0-9]*/)) return parseFloat(val);
    return val;
  }
  Demal.prototype.json = function() {
    return this.dict;
  };
  return Demal;
})();