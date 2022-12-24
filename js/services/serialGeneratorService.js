angular.module("listaTelefonica").provider("serialGenerator", function () {
  var _length = 10;

  this.getLenght = function () {
    return _length;
  };

  this.setLength = function () {
    _length = length;
  };

  this.$get = function () {
    return {
      generate: function () {
        var serial = "";
        while (serial.length < _length) {
          serial += String.fromCharCode(Math.floor(Math.random() * 64) + 32);
        }
        return serial;
      },
    };
  };
});
