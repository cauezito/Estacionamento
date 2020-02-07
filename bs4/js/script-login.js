function valida(){
    var nome = formulario.nome.value;
    var senha = formulario.senha.value;

    if(nome == 'cauezito'){
       if(senha == '134679'){
        window.location.replace("");    
       }
    } else {
        alert('Usuário não encontrado!');
        return false;
    }
}