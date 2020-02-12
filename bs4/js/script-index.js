window.addEventListener("load", exibePatio);
window.addEventListener("load", listaInfoEntrada);

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
  } 
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

function novaEntrada() {
  var selectCliente = document.getElementById("usu");
  var cliente = selectCliente.options[selectCliente.selectedIndex].value;
  var selectVeiculo = document.getElementById("vei");
  var veiculo = selectVeiculo.options[selectVeiculo.selectedIndex].value;
  var horario = new Date();
  var radio = document.getElementsByName("pgto");
  var pagamento = "";
  for(var i = 0; i < radio.length; i++){
    if(radio[i].checked){
     pagamento = radio[i];
    }
  }
    
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

  alteraQtdVagas();
}
//Lista o nome dos clientes e seus respectivos veículos no menu de entrada
function listaInfoEntrada() {
  var clientes = recuperaClientes();
  for (cliente of clientes) {
    $('#usu').append('<option value="'+ cliente.cpf + '">' + cliente.nome +
    " " + cliente.sobrenome + '</option>');
    $('#vei').append('<option value="'+ cliente.modelo + '">' + cliente.placa +
    " " + cliente.fabricante + '</option>');
  }
}

function alteraQtdVagas(){ 
  alert('chamou')   
    const VAGAS = 25;
    var totalVagasOcupadas = 1;
    var totalVagasRestantes = VAGAS - totalVagasOcupadas;


parent.document.getElementById('vagasOcu').innerHTML = 'Texto aqui =)';


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
//exibe todos os veículos no estacionados
function exibePatio() {
  var clientes = JSON.parse(localStorage.getItem("patio"));
  var tabelaPatio = document.getElementById("resultados");

  for (var i = 0; i < clientes.length; i++) {
    var nome = clientes[i].nome;
    var sobrenome = clientes[i].sobrenome;
    var cpf = clientes[i].cpf;
    var modelo = clientes[i].modelo;
    var placa = clientes[i].placa;
    var hora = clientes[i].horaContratacao;
    var minutos = clientes[i].minutoContratacao;
    tabelaPatio.innerHTML = "";

    tabelaPatio.innerHTML +=
      "<tr><td>" +
      nome +
      sobrenome +
      "</td><td>" +
      cpf +
      "</td><td>" +
      modelo +
      "</td><td>" +
      placa;
    "</td><td>" +
      hora +
      ":" +
      minutos +
      '</td><td><button class="btn btn-danger" onclick="apagarVeiculo(\'' +
      placa +
      "')\">Excluir</button>" +
      "</td></tr>";
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
