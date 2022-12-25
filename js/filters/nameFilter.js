angular.module("listaTelefonica").filter("name", function(){
    return function(input){
        var listaDeNomes = input.split(" ");
        var listaDeNomesFormatada = listaDeNomes.map(function(nome){
            if(/(Da|DA|De|DE)/.test(nome)){
                return nome.toLowerCase();
            }
            return nome.charAt(0) + nome.substring(1).toLowerCase();
        })
        return listaDeNomesFormatada.join(" ");
    }
})