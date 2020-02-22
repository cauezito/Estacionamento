window.addEventListener("load", exibePatio);
window.addEventListener("load", listaUsuariosEntrada);
window.addEventListener("load", listaVeiculosSaida);

//variável que permite um iframe por vez
var qtd = document.getElementsByTagName("iframe").length;
document.querySelector("a.valores").addEventListener("click", function() {
  var url = "valores.html";
  var height = 250;
  exibeConteudo(url, height);
});
document.querySelector("a.clientes").addEventListener("click", function() {
  var url = "clientes.html";
  var height = 300;
  exibeConteudo(url, height);
});

document.querySelector("a.entrada").addEventListener("click", function() {
  var url = "entrada.html";
  var height = 480;
  exibeConteudo(url, height);
});

document.querySelector("a.saida").addEventListener("click", function() {
  var url = "saida.html";
  var height = 480;
  exibeConteudo(url, height);
});

document.querySelector("a.historico").addEventListener("click", function() {
  var url = "historico.html";
  var height = 300;
  exibeConteudo(url, height);
});

document.querySelector("a.fechar").addEventListener("click", function(){
  var iframe = document.getElementsByTagName("iframe"); 
  for (index of iframe){
     index.style.display = "none";
  } 
  qtd = 0;
  ocultaBotaoFechar(); 
});

//recupera todos os clientes salvos no LS
function recuperaClientes(){
    return JSON.parse(localStorage.getItem("clientesRegistrados"));
}

//exibe um iframe com o conteúdo selecionado no menu lateral
function exibeConteudo(url, height) {
  //iframe
  var iframe = document.createElement("IFRAME");
  iframe.setAttribute("src", url);
  iframe.style.width = 650 + "px";
  iframe.style.height = height + "px";
  iframe.style.backgroundColor = "#E5F2C9";
  var div = document.querySelector("div.obs");

  //Se não houver um iframe aberto
  if(qtd == 0){
    div.appendChild(iframe);
    exibeBotaoFechar();
    qtd = 1;
  } else {
    exibeMensagemErro();
  }
}
function exibeMensagemErro(){
  document.querySelector('div.alert').style.display='block'
}
function exibeBotaoFechar(){
  var botao = document.getElementById("fechar");
  return botao.style.display = "block";
}
function ocultaBotaoFechar(){
  var botao = document.getElementById("fechar");
  return botao.style.display = "none";
}
function cadastraCliente() {
  //cliente
  var nome = document.getElementById("nome_cliente").value;
  var sobrenome = document.getElementById("sobrenome_cliente").value;
  var cpf = document.getElementById("cpf_cliente").value;
  var logradouro = document.getElementById("logradouro_cliente").value;
  var num_logradouro = document.getElementById("numero_logradouro").value;
  var cidade = document.getElementById("cidade_cliente").value;
  var estado = document.getElementById("estado_cliente").value;
  var inadimplente = "não";

  //veículo
  var modelo = document.getElementById("modelo_veiculo").value;
  var placa = document.getElementById("placa_veiculo").value;
  var fabricante = document.getElementById("fabricante_veiculo").value;

  //validação do formulário

  //criação do objeto cliente
  cliente = {
    nome: nome,
    sobrenome: sobrenome,
    cpf: cpf,
    logradouro: logradouro,
    num_logradouro: num_logradouro,
    cidade: cidade,
    estado: estado,
    modelo: modelo,
    placa: placa,
    fabricante: fabricante,
    inadimplente: inadimplente
  };

  //Armazena informações do cliente no navegador
  if (localStorage.getItem("clientesRegistrados") === null) {
    var clientes = [];
    clientes.push(cliente);
    //transforma em string para poder adicionar como valor no LS.
    localStorage.setItem("clientesRegistrados", JSON.stringify(clientes));
  } else {
    //retorna as informações em formato de objeto.
    var clientes = JSON.parse(localStorage.getItem("clientesRegistrados"));
    clientes.push(cliente);
    localStorage.setItem("clientesRegistrados", JSON.stringify(clientes));
  }
  exibeClientes();
}

//executada ao click do botão "limpar" na tela de entrada
function limpaCampos(){
  $("#usu").empty();
  $('#usu').append('<option>Selecione o cliente</option>'); 

  $("#vei").empty();
  $('#vei').append('<option>Selecione o veículo</option>');

  listaUsuariosEntrada();
}

//Lista o nome dos clientes e seus respectivos veículos no menu de entrada
function listaUsuariosEntrada() {
  //recupera a lista de clientes
  var clientes = recuperaClientes();
  //recupera a lista de entradas 
  var entradas = retornaEntradas();
  var placaEntradas = [];

  //se a lista de entrada já estiver formada, captura todas as placas
  if(entradas !== null){
    for(var i=0 ; i< entradas.length; i++){
      placaEntradas[i] = entradas[i].placa;
    }
  }

  for(var i = 0; i< clientes.length; i++){
    //se já houver alguma entrada
    if(entradas !== null){
      //verifica se a placa do veículo do cliente consta na lista de placas que já deram entrada
      if(placaEntradas.indexOf(clientes[i].placa) === -1){
        $('#usu').append('<option value="'+ clientes[i].nome +'">' + clientes[i].nome +
        " " + clientes[i].sobrenome + '</option>');
        alert('aqui') 
      }
    } //se ainda não houver entrada
    else {
      //adiciona todos os clientes no combobox
      $('#usu').append('<option value="'+ clientes[i].nome +'">' + clientes[i].nome +
        " " + clientes[i].sobrenome + '</option>'); 
    }
  }
 
  var selectCliente = document.getElementById("usu");

  selectCliente.addEventListener("blur", function() {
    //captura o nome escolhido
    var clienteSelecionado = selectCliente.options[selectCliente.selectedIndex].value;
    //captura a posição do cliente selecionado na lista de clientes
    for(var i=0; i<clientes.length; i++) {
      if(clientes[i].nome === clienteSelecionado) {
        var pos = i;
      }
    }

    //apaga todas as options anteriores
    $("#vei").empty();

    //adiciona todos os veículos do cliente selecionado
    $('#vei').append('<option value="'+ clientes[pos].modelo + '">' + clientes[pos].placa +
    " " + clientes[pos].fabricante + '</option>');

  }); 
}

function listaVeiculosSaida(){
  //recupera a lista de entradas 
  var entradas = retornaEntradas();
  var placaEntradas = [];

  //se a lista de entrada já estiver formada, captura todas as placas
  if(entradas !== null){
    for(entrada of entradas){
      $('#veiSaida').append('<option value="'+ entrada.placa +'">' + entrada.modelo +
      " " + entrada.placa + '</option>');
      alert('aqui')
    }
  }

  
 
  var selectVeiculo = document.getElementById("veiSaida");
  var horaEntrada = document.getElementById("horaEntrada");
  var pos;

  selectVeiculo.addEventListener("blur", function() {
    //captura o veículo escolhido
    var veiculoSelecionado = selectVeiculo.options[selectVeiculo.selectedIndex].value;
    //captura a posição do veículo selecionado na lista de entradas
    for(var i=0; i<entradas.length; i++) {
      if(entradas[i].placa === veiculoSelecionado) {
        pos = i;
        
      }
    }

    horaEntrada.innerHTML = entradas[pos].horaContratacao + ":" + entradas[pos].minutoContratacao;

    




  });
}


function validaEntrada(nomeCliente){
  if(nomeCliente === "Selecione o cliente"){
    alert('Por favor, escolha um usuário e um veículo');
    return false;
  } else {
    if(confirm('Tem certeza que deseja incluir o cliente ' + nomeCliente + ' na lista de entrada?')) {
      // limpar os campos
      
    return true;
  } else {
    return false;
  }
}
}

//nova entrada no pátio
function novaEntrada() {
  var selectCliente = document.getElementById("usu");
  //captura a escolha de cliente (nome) do combobox
  var nomeCliente = selectCliente.options[selectCliente.selectedIndex].value;
  var sobrenomeCliente = null;
  var cpfCliente = null;
  var selectVeiculo = document.getElementById("vei");
  //captura a escolha de veículo (do cliente selecionado) do combobox
  var veiculo = selectVeiculo.options[selectVeiculo.selectedIndex].value;
  var modelo = null;
  var placa = null;
  var horario = new Date();
  //captura a forma de pagamento escolhida
  var pagamento = document.querySelector('input[name="pgto"]:checked').value;

  if(validaEntrada(nomeCliente)){


    //retorna a lista de clientes registrados
    var clientes = recuperaClientes();

    for(cliente of clientes){
      if(cliente.nome === nomeCliente){
        sobrenomeCliente = cliente.sobrenome;
        cpfCliente = cliente.cpf;  
        modelo = cliente.modelo;
        placa = cliente.placa;    
      }
    }
      
    entrada = {
      nomeCliente: nomeCliente,
      sobrenomeCliente: sobrenomeCliente,
      cpfCliente : cpfCliente,
      modelo: modelo,
      placa : placa,
      formaPgto : pagamento,
      horaContratacao: horario.getHours(),
      minutoContratacao: horario.getMinutes()
    };

    //Armazena informações no navegador
    if (localStorage.getItem("entradas") === null) {
      var entradas = [];
      entradas.push(entrada);
      //transforma em string para poder adicionar como valor no LS.
      localStorage.setItem("entradas", JSON.stringify(entradas));
    } else {
      //retorna as informações em formato de objeto.
      var entradas = retornaEntradas();
      entradas.push(entrada);
      localStorage.setItem("entradas", JSON.stringify(entradas));
    }
    //recarrega a lista de carros no pátio
    alert('Cliente incluído!')
    exibePatio();
  }
}

function apagarCliente(cpf) {
  var clientes = JSON.parse(localStorage.getItem("clientesRegistrados"));
  for (var i = 0; i < clientes.length; i++) {
    if (clientes[i].cpf == cpf) {
      clientes.splice(i, 1);
    }

    localStorage.setItem("patio", JSON.stringify(clientes));
  }

  exibeClientes();
}

//retorna a lista de entradas
function retornaEntradas(){
  return JSON.parse(localStorage.getItem("entradas"));
}
//exibe todos os veículos estacionados
function exibePatio() {
  var entradas = retornaEntradas();
  var tabelaPatio = document.getElementById("resultado");

  //tabelaPatio.innerHTML = '';
  for (var i = 0; i < entradas.length; i++) {
    var nomeCliente = entradas[i].nomeCliente;
    var sobrenomeCliente = entradas[i].sobrenomeCliente;
    var cpfCliente = entradas[i].cpfCliente;
    var modelo = entradas[i].modelo;
    var placa = entradas[i].placa;
    var hora = entradas[i].horaContratacao;
    var minuto = entradas[i].minutoContratacao;  

    tabelaPatio.innerHTML += '<tr><td>' + nomeCliente + ' ' + sobrenomeCliente + '</td><td>' + cpfCliente +
     '</td><td>' + modelo + '</td><td>' + placa + '</td><td>' + hora + ":" + minuto + '</td>' +
      '</tr>';
  }
}

//exibe os clientes na tela de clientes
function exibeClientes() {
  var clientes = JSON.parse(localStorage.getItem("clientesRegistrados"));
  var tabelaClientes = document.getElementById("tabelaClientes");
  tabelaClientes.innerHTML = "";

  for (var i = 0; i < clientes.length; i++) {
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
      "<tr><td>" + nome + "</td><td>" + sobrenome + "</td><td>" +  cpf +
      "</td><td>" + logradouro + "</td><td>" + num + "</td><td>" + cidade +
      "</td><td>" + estado + "</td><td>" + modelo + "</td><td>" + placa +
      "</td><td>" + fabricante + "</td><td>" + isInadimplente +
      '</td><td><button class="btn btn-danger" onclick="apagarCliente(\'' +
      cpf + "')\">Excluir</button>" + "</td></tr>";
  }
}
