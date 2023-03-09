angular
  .module("listaTelefonica")
  .controller(
    "listaTelefonicaCtrl",
    function ($scope, contatos, operadoras, serialGenerator) {
      $scope.app = "Lista Telefônica";
      $scope.contatos = contatos.data;
      $scope.operadoras = operadoras.data;
      $scope.contato = {
        data: 1034218800000,
      };

      var init = function () {
        calcularImpostos($scope.contatos);
      };

      var calcularImpostos = function (contatos) {
        contatos.forEach((contato) => {
          contato.operadora.precoComImposto = calcularImposto(
            contato.operadora.preco
          );
        });
      };

      var calcularImposto = function (preco) {
        var imposto = 1.2;
        return preco * imposto;
      };

      $scope.apagarContatos = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
          if (!contato.selecionado) return contato;
        });
        $scope.verificarContatoSelecionado($scope.contatos);
      };

      $scope.verificarContatoSelecionado = function (contatos) {
        $scope.hasContatoSelecionado = contatos.some(function (contato) {
          return contato.selecionado;
        });
      };

      $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
      };

      init();
    }
  );
