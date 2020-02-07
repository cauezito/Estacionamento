//document.getElementById('formulario').addEventListener('submit', cadastraVeiculo);
window.addEventListener('load', exibePatio)
document.querySelector('a.valores').addEventListener('click' , function(){
    var url ='file:///C:/Users/Cau%C3%AA/Desktop/Estudo/JavaScript/Estacionamento/valores.html';
    exibeConteudo(url)
});
document.querySelector('a.clientes').addEventListener('click' , function(){
    var url = 'file:///C:/Users/Cau%C3%AA/Desktop/Estudo/JavaScript/Estacionamento/clientes.html'
    exibeConteudo(url);
});

document.querySelector('a.fechar').addEventListener('click', ocultaConteudo);

/*window.getElementById('formulario'.addEventListener('submit', function(){
    var modelo = document.getElementById('modeloCarro').value;
    var placa = document.getElementById('placaCarro').value;
  
    } else {
        cadastraVeiculo(modelo, placa);
    }
}));*/
//document.getElementById('enviar').addEventListener('click', window.location.reload());
function exibeConteudo(url){
    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src", url );
    iframe.style.width = 650+"px";
    iframe.style.height = 250+"px";
    iframe.style.backgroundColor = "#E5F2C9";
    var div = document.querySelector('div.obs'); 
    div.appendChild(iframe);
   // div.style="position:absolute; left: 280px; top: -250px";
}

function ocultaConteudo(){
    var iframe = document.getElementsByTagName('iframe')[0];
    iframe.style.display = 'none';
}
function cadastraVeiculo(modelo, placa){
    var modelo = document.getElementById('modeloCarro').value;
    var placa = document.getElementById('placaCarro').value;
    var horario = new Date();

    if(modelo.length < 3 || placa.length <6){
        alert("Por favor, corrija os campos!");
        return false;
    }    


    carro = {
        modelo : modelo,
        placa : placa,
        horaContratacao : horario.getHours(),
        minutoContratacao : horario.getMinutes()
    }

    //Armazenar informações no navegador

    if(localStorage.getItem('patio') === null){
        var carros = [];
        carros.push(carro);
        //transforma em string para poder adicionar como valor no LS.
        localStorage.setItem('patio' , JSON.stringify(carros));
    } else {
        //retorna as informações em formato de objeto.
        var carros = JSON.parse(localStorage.getItem('patio'));
        carros.push(carro);
        localStorage.setItem('patio', JSON.stringify(carros));
    }

    //exibePatio();

}

function apagarVeiculo(placa){
    var carros = JSON.parse(localStorage.getItem('patio'));
    for(var i = 0; i < carros.length; i++){
        if(carros[i].placa == placa){
            carros.splice(i, 1);         
        }

        localStorage.setItem('patio', JSON.stringify(carros));
    }

    exibePatio();
}

function exibePatio(){
    var carros = JSON.parse(localStorage.getItem('patio'));
    var carrosResultado = document.getElementById('resultados');
    carrosResultado.innerHTML = '';

    for(var i = 0; i < carros.length; i++){
        var modelo = carros[i].modelo;
        var placa = carros[i].placa;
        var hora = carros[i].horaContratacao;
        var minutos = carros[i].minutoContratacao;

        carrosResultado.innerHTML +=
        '<tr><td>' + modelo + 
        '</td><td>' + placa + 
        '</td><td>' + hora + ':' + minutos +
        '</td><td><button class="btn btn-danger" onclick="apagarVeiculo(\''+placa+'\')">Excluir</button>' +
        '</td></tr>';
    }
}

