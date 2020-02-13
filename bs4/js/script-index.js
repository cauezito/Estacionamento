window.addEventListener("load", exibePatio);
window.addEventListener("load", listaUsuariosEntrada);

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
    return JSON.parse(localStorage.getItem("patio"));
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

  //Armazena informações no navegador
  if (localStorage.getItem("patio") === null) {
    var clientes = [];
    clientes.push(cliente);
    //transforma em string para poder adicionar como valor no LS.
    localStorage.setItem("patio", JSON.stringify(clientes));
  } else {
    //retorna as informações em formato de objeto.
    var clientes = JSON.parse(localStorage.getItem("patio"));
    clientes.push(cliente);
    localStorage.setItem("patio", JSON.stringify(clientes));
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
  for (cliente of clientes) {
    $('#usu').append('<option value="'+ cliente.nome +'">' + cliente.nome +
    " " + cliente.sobrenome + '</option>'); 
  }
  var selectCliente = document.getElementById("usu");

  selectCliente.addEventListener("blur", function() {
    //pega o nome escolhido
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

function novaEntrada() {
  var selectCliente = document.getElementById("usu");
  var cliente = selectCliente.options[selectCliente.selectedIndex].value;
  var selectVeiculo = document.getElementById("vei");
  var veiculo = selectVeiculo.options[selectVeiculo.selectedIndex].value;
  var horario = new Date();
  //captura a forma de pagamento escolhida
  var pagamento = document.querySelector('input[name="pgto"]:checked').value;

  alert(pagamento)
    
  entrada = {
    cliente: cliente,
    veiculo: veiculo,
    formaPgto : pagamento,
    horaContratacao: horario.getHours(),
    minutoContratacao: horario.getMinutes()
  };

   //Armazenar informações no navegador
   if (localStorage.getItem("entradas") === null) {
    var entradas = [];
    entradas.push(entrada);
    //transforma em string para poder adicionar como valor no LS.
    localStorage.setItem("entradas", JSON.stringify(entradas));
  } else {
    //retorna as informações em formato de objeto.
    var entradas = JSON.parse(localStorage.getItem("entradas"));
    entradas.push(entrada);
    localStorage.setItem("entradas", JSON.stringify(entradas));
  }

  exibePatio();
}

function apagarCliente(cpf) {
  var clientes = JSON.parse(localStorage.getItem("patio"));
  for (var i = 0; i < clientes.length; i++) {
    if (clientes[i].cpf == cpf) {
      clientes.splice(i, 1);
    }

    localStorage.setItem("patio", JSON.stringify(clientes));
  }

  exibeClientes();
}
//exibe todos os veículos estacionados
function exibePatio() {
  var entradas = JSON.parse(localStorage.getItem("entradas"));
  var tabelaPatio = document.getElementById("resultado");

  tabelaPatio.innerHTML = '';
  for (var i = 0; i < entradas.length; i++) {
    var nomeCliente = entradas[i].cliente.nome;
    var sobrenomeCliente = entradas[i].cliente.sobrenome;
    var cpfCliente = entradas[i].cliente.cpf;
    var modelo = entradas[i].veiculo.modelo;
    var placa = entradas[i].veiculo.placa;
    var hora = entradas[i].horaContratacao;
    var minuto = entradas[i].minutoContratacao;  

    tabelaPatio.innerHTML += '<tr><td>' + nomeCliente + sobrenomeCliente + '</td><td>' + cpfCliente +
     '</td><td>' + modelo + '</td><td>' + placa + '</td><td>' + hora + ":" + minuto + '</td>' +
      '</tr>';
  }
}

//exibe os clientes na tela de clientes
function exibeClientes() {
  var clientes = JSON.parse(localStorage.getItem("patio"));
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
      "<tr><td>" +
      nome +
      "</td><td>" +
      sobrenome +
      "</td><td>" +
      cpf +
      "</td><td>" +
      logradouro +
      "</td><td>" +
      num +
      "</td><td>" +
      cidade +
      "</td><td>" +
      estado +
      "</td><td>" +
      modelo +
      "</td><td>" +
      placa +
      "</td><td>" +
      fabricante +
      "</td><td>" +
      isInadimplente +
      '</td><td><button class="btn btn-danger" onclick="apagarCliente(\'' +
      cpf +
      "')\">Excluir</button>" +
      "</td></tr>";
  }
}
