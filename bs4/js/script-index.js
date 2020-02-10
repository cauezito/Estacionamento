//document.getElementById('formulario').addEventListener('submit', cadastraVeiculo);
window.addEventListener('load', exibePatio)
document.querySelector('a.valores').addEventListener('click' , function(){
    var url ='valores.html';
    var height = 250;
    exibeConteudo(url, height)
});
document.querySelector('a.clientes').addEventListener('click' , function(){
    var url = 'clientes.html'
    var height = 300;
    exibeConteudo(url, height);
});

document.querySelector('a.entrada').addEventListener('click', function(){
    var url = 'entrada.html'
    var height = 480;
    exibeConteudo(url, height);
});

document.querySelector('a.historico').addEventListener('click', function(){
    var url = 'historico.html'
    var height = 300;
    exibeConteudo(url, height)
});

document.querySelector('button.fechar').addEventListener('click', ocultaConteudo);
document.querySelector('a.fechar').addEventListener('click', ocultaConteudo);
//document.querySelector('button#cadastrar').addEventListener('click', cadastraCliente);

/*window.getElementById('formulario'.addEventListener('submit', function(){
    var modelo = document.getElementById('modeloCarro').value;
    var placa = document.getElementById('placaCarro').value;
  
    } else {
        cadastraVeiculo(modelo, placa);
    }
}));*/
//document.getElementById('enviar').addEventListener('click', window.location.reload());
function exibeConteudo(url, height){
    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src", url );
    iframe.style.width = 650+"px";
    iframe.style.height = height+"px";
    iframe.style.backgroundColor = "#E5F2C9";
    var div = document.querySelector('div.obs'); 
    div.appendChild(iframe);
   // div.style="position:absolute; left: 280px; top: -250px";
}

function ocultaConteudo(){
    var iframe = document.getElementsByTagName('iframe')[0];
    iframe.style.display = 'none';
}

function cadastraCliente(){
    alert('entrou');
    //cliente
    var nome = document.getElementById('nome_cliente').value;
    var sobrenome = document.getElementById('sobrenome_cliente').value;
    var cpf = document.getElementById('cpf_cliente').value;
    var logradouro = document.getElementById('logradouro_cliente').value;
    var num_logradouro = document.getElementById('numero_logradouro').value;
    var cidade = document.getElementById('cidade_cliente').value;
    var estado = document.getElementById('estado_cliente').value;
    var inadimplente = 'não';
 
    //veículo
    var modelo = document.getElementById('modelo_veiculo').value;
    var placa = document.getElementById('placa_veiculo').value;
    var fabricante = document.getElementById('fabricante_veiculo').value;

    //validação do formulário

    //criação do objeto cliente
    cliente = {
        nome : nome,
        sobrenome : sobrenome,
        cpf : cpf,
        logradouro : logradouro,
        num_logradouro : num_logradouro,
        cidade : cidade,
        estado : estado,
        modelo : modelo,
        placa : placa,
        fabricante : fabricante,
        inadimplente : inadimplente
    }

    //Armazenar informações no navegador
    if(localStorage.getItem('patio') === null){
        var clientes = [];
        clientes.push(cliente);
        //transforma em string para poder adicionar como valor no LS.
        localStorage.setItem('patio' , JSON.stringify(clientes));
    } else {
        //retorna as informações em formato de objeto.
        var clientes = JSON.parse(localStorage.getItem('patio'));
        clientes.push(cliente);
        localStorage.setItem('patio', JSON.stringify(clientes));
    }
    exibeClientes();   

}

function novaEntrada(){
    var selectCliente = document.getElementById('usu');
    var cliente = selectCliente.options[selectCliente.selectedIndex].value;
    var selectVeiculo = document.getElementById('vei');
    var veiculo = selectVeiculo.options[selectVeiculo.selectedIndex].value;
    var horario = new Date();

    entrada = {
    cliente : cliente,
    veiculo : veiculo,
    horaContratacao : horario.getHours(),
    minutoContratacao : horario.getMinutes()
    }

}

function apagarCliente(cpf){
    var clientes = JSON.parse(localStorage.getItem('patio'));
    for(var i = 0; i < clientes.length; i++){
        if(clientes[i].cpf == cpf){
            clientes.splice(i, 1);         
        }

        localStorage.setItem('patio', JSON.stringify(clientes));
    }

    exibeClientes();
}

function exibePatio(){
    var clientes = JSON.parse(localStorage.getItem('patio'));
    var tabelaPatio = document.getElementById('resultados');
    tabelaPatio.innerHTML = '';

    for(var i = 0; i < clientes.length; i++){
        var nome = clientes[i].nome;
        var sobrenome = clientes[i].sobrenome;
        var cpf = clientes[i].cpf;
        var modelo = clientes[i].modelo;
        var placa = clientes[i].placa;
        var hora = clientes[i].horaContratacao;
        var minutos = clientes[i].minutoContratacao;

        tabelaPatio.innerHTML +=
        '<tr><td>' + nome + sobrenome +  '</td><td>' + cpf + 
        '</td><td>' + modelo + '</td><td>' + placa
        '</td><td>' + hora + ':' + minutos +
        '</td><td><button class="btn btn-danger" onclick="apagarVeiculo(\''+placa+'\')">Excluir</button>' +
        '</td></tr>';
    }
}

function exibeClientes(){
    var clientes = JSON.parse(localStorage.getItem('patio'));
    var tabelaClientes = document.getElementById('tabelaClientes');
    tabelaClientes.innerHTML = '';

    for(var i = 0; i < clientes.length; i++){
        var nome = clientes[i].nome;
        var sobrenome = clientes[i].sobrenome;
        var cpf = clientes[i].cpf;
        var logradouro = clientes[i].logradouro;
        var num = clientes[i].num_logradouro;
        var cidade = clientes[i].cidade;
        var estado = clientes[i].estado;
        var modelo = clientes[i].modelo;
        var placa = clientes[i].placa;
        var fabricante = clientes[i].fabricante;
        var isInadimplente = clientes[i].inadimplente;

        tabelaClientes.innerHTML +=
        '<tr><td>' + nome + '</td><td>' + sobrenome +  '</td><td>' + cpf + 
        '</td><td>' + logradouro + '</td><td>' + num + '</td><td>'  + cidade +
        '</td><td>' + estado + '</td><td>' + modelo + '</td><td>' + placa + '</td><td>'
        + fabricante + '</td><td>' + isInadimplente +
        '</td><td><button class="btn btn-danger" onclick="apagarCliente(\''+cpf+'\')">Excluir</button>' +
        '</td></tr>'
    }

}

