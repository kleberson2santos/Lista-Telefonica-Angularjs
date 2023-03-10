angular.module("serialGenerator", []);
angular.module("listaTelefonica").provider("serialGenerator", function () {
  var _length = 10;

  this.getLength = function () {
    return _length;
  };

  this.setLength = function (length) {
    _length = length;
  };

  this.$get = function () {
    console.log("Serial Generator Provider | _length: ", _length);
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
