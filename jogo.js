var timeId = null; //variavel que armazena a chamada da funçao time out
//Start the Game
function iniciaJogo(){

  var url = window.location.search;


  var nivel_jogo = url.replace("?", "");
  alert(nivel_jogo);
  var tempo_segundos =0;

  //Verificar Nivel
  if(nivel_jogo == 1)
    {// 1 fácil -> 120 segundos
      tempo_segundos = 120;
    }
  if(nivel_jogo == 2)
    {// 2 normal -> 60 segundos
      tempo_segundos = 60;
    }
  if(nivel_jogo == 3)
    {// 3 difícil -> 30 segundos
      tempo_segundos = 30;
    }
  //Inserindo segundos no span
  document.getElementById('cronometro').innerHTML = tempo_segundos;

  //quantidade de baloes
  var qtde_baloes = 80;

  cria_baloes(qtde_baloes);

  //imprimir qtde baloes inteiros
  document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
  document.getElementById('baloes_estourados').innerHTML = 0;

  contagem_tempo(tempo_segundos + 1)
}
// Contagem de Tempo
function contagem_tempo(segundos) {

    segundos = segundos - 1;

    if(segundos == -1) {
      clearTimeout(timeId); //para execução da função do setTimeout
      game_over();
      return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;

    timeID = setTimeout("contagem_tempo("+segundos+")", 1000);

}
// Game Over
function game_over() {
  alert('Fim do jogo, você não conseguiu estourar todos os balões a tempo!')
}
// Gerar os Baloes para o cenario
function cria_baloes(qtde_baloes){

    for(var i = 1; i <= qtde_baloes; i++){

    var balao = document.createElement("img");
    balao.src = 'imagens/balao_azul_pequeno.png';
    balao.style.margin = '10px';
    balao.id = 'b'+i;
    balao.onclick = function(){estourar(this);}


    document.getElementById('cenario').appendChild(balao);

  }
}
// Estourar os Baloes
function estourar(e){

  var id_balao = e.id;
  //Corrigindo o Evento dos baloes
  document.getElementById(id_balao).setAttribute("onclick", "");

  document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
  pontucao(-1);

}
// Efetuar a Contagem de Pontuação
function pontucao(acao) {
  var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
  var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

  baloes_inteiros = parseInt(baloes_inteiros);
  baloes_estourados = parseInt(baloes_estourados);

  baloes_inteiros = baloes_inteiros + acao;
  baloes_estourados = baloes_estourados - acao;

  document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
  document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

  situacao_jogo(baloes_inteiros, baloes_estourados);

}
// Verificar a Situacao Do Jogo
function situacao_jogo(baloes_inteiros){
  if(baloes_inteiros == 0){
    alert('Parabéns, você conseguiu estourar todos os balões a tempo!');
    parar_jogo();
  }
}
// Parar o Jogo
function parar_jogo(){
  clearTimeout(timeID);
}
