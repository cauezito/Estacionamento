            window.addEventListener("load", exibePatio);
            window.addEventListener("load", listaUsuariosEntrada);
            window.addEventListener("load", listaVeiculosSaida);
            window.addEventListener("load", atualizaQtdVagas);

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

            document.querySelector("a.atualizarPg").addEventListener("click", function(){
               atualizaQtdVagas();
                exibePatio();
                exibeClientes();
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
              document.querySelector('div#erro').style.display='block'
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
              var nome = document.getElementById("nome_cliente").value;
              var sobrenome = document.getElementById("sobrenome_cliente").value;
              var cpf = document.getElementById("cpf_cliente").value;
              var logradouro = document.getElementById("logradouro_cliente").value;
              var num_logradouro = document.getElementById("numero_logradouro").value;
              var cidade = document.getElementById("cidade_cliente").value;
              var estado = document.getElementById("estado_cliente").value;

            if((nome || sobrenome || cpf || logradouro || num_logradouro || cidade || estado) === ""){
                return false;
            } else {
                cadastraCliente();

            }

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
                var clientes = recuperaClientes();
                clientes.push(cliente);
                localStorage.setItem("clientesRegistrados", JSON.stringify(clientes));
              }


              exibeMensagemSucesso();
            }
            function exibeMensagemSucesso(){
                  document.querySelector('div#sucesso').style.display='block'
            }
            //executada ao click do botão "limpar" na tela de entrada
            function limpaCampos(){
              $("#usu").empty();
              $('#usu').append('<option>Selecione o cliente</option>'); 

              $("#vei").empty();
              $('#vei').append('<option>Selecione o veículo</option>');

              listaUsuariosEntrada();
            }

    function atualizaQtdVagas(){
        var entradas = retornaEntradas();
        var totalVagas = 25;
        var divVagasOcupadas = document.getElementById("vagasOcu");
        var divVagasRestantes = document.getElementById("vagasRes")

        divVagasOcupadas.innerHTML = entradas.length;
        divVagasRestantes.innerHTML = totalVagas - entradas.length; 
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

            function preencheInfoSaida(){
              var entradas = retornaEntradas();
              var selectVeiSaida = document.getElementById("veiSaida");
              var selectFormaPgto = document.getElementById("formaPgto")
              var divHoraEntrada = document.getElementById("horaEntrada");
              var divTempoTotal = document.getElementById("tempoTotal");
              var divTotalPagar = document.getElementById("totalPagar");
              var inputValorRecebido = document.getElementById("inputRecebido");
              var divValorTroco = document.getElementById("valorTroco");
              var divPagamento = document.getElementById("pagamento");



              selectVeiSaida.addEventListener("blur", function() {
                //captura a placa do veículo escolhido
                var veiculoSelecionado = selectVeiSaida.options[selectVeiSaida.selectedIndex].value;
                  selectFormaPgto.disabled = false;

                  selectFormaPgto.addEventListener("blur", function(){
                      var formaPagamento = selectFormaPgto.options[selectFormaPgto.selectedIndex].value;

                      if(formaPagamento === "Dinheiro"){
                          divPagamento.style.display = 'block';
                      } else {
                          divPagamento.style.display = 'none';
                      }
                  });
                //captura a posição do cliente selecionado na lista de clientes
                for(var i=0; i<entradas.length; i++) {     
                  if(entradas[i].placa === veiculoSelecionado) {
                    var timeStamp = new Date (entradas[i].data).getTime();
                    var hora = new Date(entradas[i].data).getHours();
                    var minutos = new Date(entradas[i].data).getMinutes();
                    var data = new Date(entradas[i].data).toLocaleDateString('pt-BR')
                    var valorPgto = calculaValorPgto(calculaTempoEstacionado(timeStamp));
                    divHoraEntrada.innerHTML = data + ' - ' + hora + ':' + minutos;
                    divTempoTotal.innerHTML = calculaTempoEstacionado(timeStamp);
                    divTotalPagar.innerHTML = 'R$' + valorPgto;
                    inputValorRecebido.addEventListener("change", function(){
                       var valorRecebido = inputValorRecebido.value;
                       var valorTroco =  valorRecebido - valorPgto;

                        if(valorRecebido >= valorPgto){
                             divValorTroco.innerHTML = 'R$' + valorTroco;
                        } else {
                             divValorTroco.innerHTML = 'O valor recebido deve ser maior do que o valor total!';
                        }
                    });
                  }  
                }
              });  
            }

            function calculaTempoEstacionado(timeStamp){
              var agora = new Date().getTime();
              var entrada = new Date(timeStamp).getTime();    

              const diferenca = Math.abs(agora - entrada);
              const horas = Math.trunc(diferenca / (1000 * 60 * 60));
              const minutos = Math.trunc(diferenca / (1000 * 60));
                if(minutos >= 60){
                    return horas + ' hora(s)';
                } else {
                     return horas + ' hora(s) e ' + minutos + ' minuto(s).';
                }     

            }

            function calculaValorPgto(tempo){        
                const tempoTotal = tempo;
                const minutos = tempoTotal.split(' ')[3]; 
                const horas = tempoTotal.split(' ')[0];
                var valorHora = 18;
                var totalPagar = 0;
                //permanência mínima de 1h
                if(horas < 1){
                    totalPagar = 18;
                }

                totalPagar = horas * valorHora;      

                return totalPagar;        
            }

            function novaSaida(){
              var dataSaida = new Date().getDate();
              var horaSaida = new Date().getHours();
              var divSelectVeiculo = document.getElementById("veiSaida");
              var veiculoSelecionado =   divSelectVeiculo.options[divSelectVeiculo.selectedIndex].value;
              var horaEntrada = document.getElementById("horaEntrada").value;
              var tempoTotal = document.getElementById("tempoTotal").value;
              var totalPago = document.getElementById("totalPagar").value;
              var selectFormaPgto = document.getElementById("formaPgto");
              var formaPgto = selectFormaPgto.options[selectFormaPgto.selectedIndex].value;
              var recebido = document.getElementById("inputRecebido").value;
              var troco = document.getElementById("valorTroco").value;
              var entradas = retornaEntradas();
                
              //criação do objeto histórico
              historicoSaida = {
                dataSaida: dataSaida,
                horaSaida: horaSaida,
                veiculo: veiculoSelecionado,
                horaEntrada: horaEntrada,
                tempoPatio: tempoTotal,
                formaPgto: formaPgto,
                valorRecebido: recebido,
                valorTroco: troco
              };
                
              //Armazena informações no navegador
                if (localStorage.getItem("historico") === null) {
                  var historico = [];
                  historico.push(historicoSaida);
                  //transforma em string para poder adicionar como valor no LS.
                  localStorage.setItem("historico", JSON.stringify(historico));
                } else {
                  //retorna as informações em formato de objeto.
                  var historico = retornaHistorico();
                  historico.push(historicoSaida);
                  localStorage.setItem("historico", JSON.stringify(historico));
                }
                
                
                for(var i=0; i<entradas.length; i++){
                    if(entradas[i].placa === veiculoSelecionado.split(' ')[0]){
                        //deleta a entrada com o veículo correspondente
                        entradas.splice(i,1);
                        
                        localStorage.removeItem(entradas);
                        //reescreve a localStorage
                        localStorage.setItem("entradas", JSON.stringify(entradas)); 
                        break;
                    }
                }
                
                atualizaQtdVagas();
                exibePatio();
                alert('Saída incluída no histórico!')
              }

        function retornaHistorico(){
            return JSON.parse(localStorage.getItem("historico"));
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
                alert('Cliente incluído!')
                atualizaQtdVagas();
                exibePatio();
              }
            }

            function estaEstacionado(cpf){
                var entradas = retornaEntradas();
                var i;
                for(i of entradas){
                    if(i.cpf === cpf){
                        return true;
                    } else {
                        return false;
                    }
                }
            }

            function apagarCliente(cpf) {
              var clientes = recuperaClientes();
                
              if(estaEstacionado(cpf)){
                  for (var i = 0; i < clientes.length; i++) {
                    if (clientes[i].cpf === cpf) {
                        if(confirm("Tem certeza que deseja excluir o cliente " +
                             clientes[i].nome + "?")){
                            clientes.splice(i, 1);
                             localStorage.setItem("clientesRegistrados", JSON.stringify(clientes));
                            alert("Cliente excluído!")
                        } 
                    } 
                  }
              } else {
                  alert("O carro do cliente está estacionado. Solicite a saída e tente novamente!")
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

              tabelaPatio.innerHTML = '';
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
