jest.unmock('../index.js');
var Demal = require('../');

describe('Demal', () => {
  describe('parse', () => {
    it('should parse demal string', () => {
      const str = `u|http://google.com,s.w|520,s.h|338,o.l|0,o.t|0,z|1`;
      const demal = Demal.parse(str);
      expect(demal).toBeInstanceOf(Demal);
      expect(demal.json()).toEqual({
        u: 'http://google.com',
        s: {w:520, h:338},
        o: {l:  0, t:  0},
        z: 1,
      });
    });
  });
});