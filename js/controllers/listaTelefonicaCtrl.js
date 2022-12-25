angular
  .module("listaTelefonica")
  .controller("listaTelefonicaCtrl", function ($scope, contatosAPI, operadorasAPI, serialGenerator) {
    $scope.app = "Lista Telefônica";
    $scope.contatos = [];
    $scope.operadoras = [];

    var carregarContatos = function (params) {
      contatosAPI.getContatos().then(
        (data) => {
            $scope.contatos = data.data;
        },
        (err) => {
          $scope.message = err;
          console.log("Houve um erro ao buscar contatos:", err);
        }
      );
    };

    var carregarOperadoras = function (params) {
      operadorasAPI.getOperadoras().then((data) => {
        $scope.operadoras = data.data;
      });
    };

    $scope.adicionarContato = function (contato) {
      contato.serial =  serialGenerator.generate();
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
  });