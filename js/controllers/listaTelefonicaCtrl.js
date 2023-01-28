angular
  .module("listaTelefonica")
  .controller(
    "listaTelefonicaCtrl",
    function ($scope, contatosAPI, operadorasAPI, serialGenerator) {
      $scope.app = "Lista Telefônica";
      $scope.contatos = [];
      $scope.operadoras = [];
      $scope.contato = {
        data: 1034218800000
      }

      var carregarContatos = function (params) {
        contatosAPI.getContatos().then(
          (data) => {
            $scope.contatos = data.data;
          },
          () => {
            $scope.error = "Não foi possível carregar os dados!";
          }
        );
      };

      var carregarOperadoras = function (params) {
        operadorasAPI.getOperadoras().then((data) => {
          $scope.operadoras = data.data;
        });
      };

      $scope.adicionarContato = function (contato) {
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        contatosAPI.saveContato(contato).then((data) => {
          delete $scope.contato;
          $scope.contatoForm.$setPristine();
          carregarContatos();
        });
      };
      $scope.apagarContatos = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
          if (!contato.selecionado) return contato;
        });
      };
      $scope.isContatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
          return contato.selecionado;
        });
      };
      $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
      };

      carregarContatos();
      carregarOperadoras();
    }
  );
