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

document.querySelector("a.fechar").addEventListener("click", ocultaIframe);
/*document.querySelector("a.fechar").addEventListener("click", function(){
  var iframe = document.getElementsByTagName("iframe"); 
  for (index of iframe){
     index.style.display = "none";
  } 
  qtd = 0;
  ocultaBotaoFechar(); 
});*/

function ocultaIframe(){
  var iframe = document.getElementsByTagName("iframe"); 
  for (index of iframe){
     index.style.display = "none";
  } 
  qtd = 0;
  ocultaBotaoFechar(); 
}

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

function validaCliente(){
  //cliente
  var nome = document.getElementById("nome_cliente").value;
  var sobrenome = document.getElementById("sobrenome_cliente").value;
  var cpf = document.getElementById("cpf_cliente").value;
  var logradouro = document.getElementById("logradouro_cliente").value;
  var cidade = document.getElementById("cidade_cliente").value;
  var estado = document.getElementById("estado_cliente").value;

  //veículo
  var modelo = document.getElementById("modelo_veiculo").value;
  var placa = document.getElementById("placa_veiculo").value;
  var fabricante = document.getElementById("fabricante_veiculo").value;

  if(nome.length() > 4 && nome.length() < 12){
    if(sobrenome.length() > 4 && sobrenome.length() < 15){
      if(cpf.length() === 11){
        if(logradouro.length() > 6 && logradouro.length() < 20){
          if(cidade.length() > 5 && cidade.length() < 20){
            if(estado.length() === 2){
              if(modelo.length() > 2 && modelo.length() < 15){
                if(placa.length() === 7){
                  if(fabricante.length() > 2 && fabricante.length() < 20){
                    alert('test')
                    return true;
                  }
                }
              }
            }
          }
        }
      }
    }
  } else {
    alert('Revise os dados!')
    return false;
  }
}
function cadastraCliente() {
  if(validaCliente()){
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
    alert('Cliente incluído!')
  } else {
    alert('testeeee')
  }
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

  //se a lista de entrada já estiver formada, captura todas as placas
  if(entradas !== null){
    for(entrada of entradas){
      $('#veiSaida').append('<option value="'+ entrada.placa +'">' + entrada.modelo +
      " " + entrada.placa + '</option>');
    }
  }
}

function preencheInfoPagamento(){
  const entradas = retornaEntradas();
  var selectVeiSaida = document.getElementById("veiSaida");
  var divHoraEntrada = document.getElementById("horaEntrada");
  var divTempoTotal = document.getElementById("tempoTotal");
  var divTotalPagar = document.getElementById("totalPagar");


  selectVeiSaida.addEventListener("blur", function() {
    //captura a placa do veículo escolhido
    var veiculoSelecionado = selectVeiSaida.options[selectVeiSaida.selectedIndex].value;

    //captura a posição do cliente selecionado na lista de clientes
    for(var i=0; i<entradas.length; i++) {     
      if(entradas[i].placa === veiculoSelecionado) {
        var data = new Date(entradas[i].data).toLocaleDateString('pt-BR');
        var hora = new Date(entradas[i].data).getHours();
        var minutos = new Date(entradas[i].data).getMinutes();
        divHoraEntrada.innerHTML = data + ' - ' + hora + ':' + minutos;
        divTempoTotal.innerHTML = calculaTempoEstacionado(new Date(entradas[i].data).getTime()); 
        divTotalPagar.innerHTML = 'R$' + calculaPagamento(minutos);       
      }
    }
  })  
}

function calculaPagamento(min){ 
  const min30 = 10;
  const min45 = 16;
  var minutos = min; 

  if(minutos <= 30){
    minutos = 30; 
  } 
}

function calculaTempoEstacionado(timeStamp){
  var diff = (new Date() - new Date(timeStamp));
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor(diff / (1000 * 60 * 60));
  const minutos = Math.floor(diff / 60000);
  const segundos = Math.floor((diff % 60000) / 1000);  

  return dias + ' dia(s), ' + horas + ' hora(s), ' + minutos + ' minuto(s) e ' + segundos + ' segundo(s).';
}

function novaSaida(){
  var selectVeiculo = document.getElementById("veiSaida");
  var divHoraEntrada = document.getElementById("horaEntrada");
  var divTempoTotal = document.getElementById("tempoTotal")
  var tempoTotal;
  var pos;
    //captura a forma de pagamento escolhida
    var pagamento = document.querySelector('input[name="pgto"]:checked').value;

    saida = {
      nomeCliente: nomeCliente,
      sobrenomeCliente: sobrenomeCliente,
      cpfCliente : cpfCliente,
      modelo: modelo,
      placa : placa,
      tipoVeiculo : tipo,
      data : new Date()
    };


  }


function validaEntrada(nomeCliente, tipoVeiculo){
  if(nomeCliente === "Selecione o cliente" || tipoVeiculo === "Selecione o tipo do veículo"){
    alert('Por favor, escolha um usuário, um veículo e um tipo.');
    return false;
  } else {
    if(confirm('Tem certeza que deseja incluir o cliente ' + nomeCliente + ' na lista de entrada?')) {
      return true;
    } else {
      alert('Cliente não incluído');
      return false;
    }
  }
}

function setaOptionsEntrada(nomeCliente, veiculoSelecionado, tipoVeiculo){
  nome = nomeCliente;
  veiculo = veiculoSelecionado;
  tipo = tipoVeiculo;
  
  nome = 'Selecione o cliente';
  veiculo = 'Selecione o veículo';
  tipo = 'Selecione o tipo do veículo';
}

//nova entrada no pátio
function novaEntrada() {
  var selectCliente = document.getElementById("usu");
  var selectTipo = document.getElementById("tipo");
  //captura a escolha de cliente (nome) do combobox
  var nomeCliente = selectCliente.options[selectCliente.selectedIndex].value;
  var sobrenomeCliente = null;
  var cpfCliente = null;
  var selectVeiculo = document.getElementById("vei");
  var veiculoSelecionado = selectVeiculo.options[selectVeiculo.selectedIndex].value;
  //captura a escolha de veículo (do cliente selecionado) do combobox
  var tipoVeiculo = selectTipo.options[selectTipo.selectedIndex].value;
  var modelo = null;
  var placa = null;

  if(validaEntrada(nomeCliente, tipoVeiculo)){
    //retorna a lista de clientes registrados
    var clientes = recuperaClientes();

    for(cliente of clientes){
      if(cliente.nome === nomeCliente){
        sobrenomeCliente = cliente.sobrenome;
        cpfCliente = cliente.cpf;  
        modelo = cliente.modelo;
        placa = cliente.placa;    
      }
    }; 
      
    entrada = {
      nomeCliente: nomeCliente,
      sobrenomeCliente: sobrenomeCliente,
      cpfCliente : cpfCliente,
      modelo: modelo,
      placa : placa,
      tipoVeiculo : tipo,
      data : new Date()
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
    exibePatio();
    alert('Cliente incluído!');
    setaOptionsEntrada(nomeCliente, veiculoSelecionado, tipoVeiculo);

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
    var hora = new Date(entradas[i].data).toLocaleString("pt-BR" , {hour: "numeric", minute: "numeric"});

    tabelaPatio.innerHTML += '<tr><td>' + nomeCliente + ' ' + sobrenomeCliente + '</td><td>' + cpfCliente +
     '</td><td>' + modelo + '</td><td>' + placa + '</td><td data-hora=' + entradas[i].data + '>' + hora + 
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

