function gerarJogos() {
  tabela.innerHTML = ""
  let timesTextArea = document.getElementById("times");
  let timesTexto = timesTextArea.value;
  let partidas = timesTexto.split("\n");
  let listaTimes = [];
  for (let i = 0; i < partidas.length; i++) {
    let partida = partidas[i];
    let timeCidade = partida.split(";");
    let time = { nome: timeCidade[0], cidade: timeCidade[1] };
    listaTimes.push(time);
  }

  let jogosIda = [];
  let rodadaIda = 1;
  let turnoIda = "ida";
  while (rodadaIda <= 2) {
    for (let i = 0; i < listaTimes.length - 1; i++) {
      for (let j = i + 1; j < listaTimes.length; j++) {
        let jogo = {
          time1: listaTimes[i].nome,
          cidade1: listaTimes[i].cidade,
          time2: listaTimes[j].nome,
          cidade2: listaTimes[j].cidade,
          rodada: rodadaIda,
          turno: turnoIda,
          gols1: null,
          gols2: null,
        };
        jogosIda.push(jogo);
      }
    }
    rodadaIda++;
    turnoIda = turnoIda == "ida" ? "volta" : "ida";
  }

  let jogosVolta = [];
  let rodadaVolta = 1;
  let turnoVolta = "ida";
  while (rodadaVolta <= 2) {
    for (let i = 0; i < jogosIda.length; i++) {
      let jogoIda = jogosIda[i];
      let jogoVolta = {
        time1: jogoIda.time2,
        cidade1: jogoIda.cidade2,
        time2: jogoIda.time1,
        cidade2: jogoIda.cidade1,
        rodada: rodadaVolta,
        turno: turnoVolta,
        gols1: null,
        gols2: null,
      };
      jogosVolta.push(jogoVolta);
    }
    rodadaVolta++;
    turnoVolta = turnoVolta == "ida" ? "volta" : "ida";
  }
  for (let i = 0; i < jogosVolta.length; i++) {
    let jogo = jogosVolta[i];
    let gols1 = Math.floor(Math.random() * 5);
    let gols2 = Math.floor(Math.random() * 5);
    jogo.gols1 = gols1;
    jogo.gols2 = gols2;
  }

  jogosVolta.sort(function (a, b) {
    if (a.rodada != b.rodada) {
      return a.rodada - b.rodada;
    } else {
      if (a.turno == "ida") {
        return -1;
      } else {
        return 1;
      }
    }
  });
  
  for (let i = 0; i < jogosVolta.length; i++) {
    let jogo = jogosVolta[i];
    let partida =
      "<tr><td>" +
      jogo.time1 +
      "</td><td>" +
      jogo.time2 +
      "</td><td>" +
      jogo.cidade1 +
      "</td><td>" +
      jogo.turno +
      "</td><td>" +
      jogo.rodada +
      "</td><td>" +
      jogo.gols1 +
      "x" +
      jogo.gols2;
    ("</td><td>");
    tabela.innerHTML += partida;
  }
  let classificacao = {};
  for (let i = 0; i < listaTimes.length; i++) {
    let time = listaTimes[i].nome;
    classificacao[time] = 0;
  }

  for (let i = 0; i < jogosVolta.length; i++) {
    let jogo = jogosVolta[i];
    if (jogo.gols1 > jogo.gols2) {
      classificacao[jogo.time1] += 3;
    } else if (jogo.gols2 > jogo.gols1) {
      classificacao[jogo.time2] += 3;
    } else {
      classificacao[jogo.time1] += 1;
      classificacao[jogo.time2] += 1;
    }
  }
  let campeaoDoCampeonato = document.getElementById("campeaoText");
  let campeao = null;
  let pontuacaoMaxima = 0;
  for (let time in classificacao) {
    let pontuacao = classificacao[time];
    if (pontuacao > pontuacaoMaxima) {
      campeao = time;
      pontuacaoMaxima = pontuacao;
    }
  }

  campeaoDoCampeonato.innerHTML = "O Campeão e o: " + campeao;
}
