function gerarJogos() {

  tabela.innerHTML = "";
  
  let timesTextArea = document.getElementById("times");
  let campeaoDoCampeonato = document.getElementById("campeaoText");
  let timesTexto = timesTextArea.value;
  let partidas = timesTexto.split("\n");
  let listaTimes = [];
  for (let i = 0; i < partidas.length; i++) {
    let partida = partidas[i];
    let timeCidade = partida.split(";");
    let time = { nome: timeCidade[0], cidade: timeCidade[1] };
    listaTimes.push(time);
  }

  if (listaTimes.length < 2) {
    alert("Preencha as informações com ao menos 2 Times");
    campeaoDoCampeonato.innerHTML = "";
    return;
  }

  let jogosIda = [];
  let rodadaIda = 1;
  let turnoIda = "ida";
  while (rodadaIda <= 1) {
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
    turnoIda = turnoIda == "Ida" ? "Volta" : "Ida";
  }

  let jogosVolta = [];
  let rodadaVolta = 1;
  let turnoVolta = "Ida";
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
    turnoVolta = turnoVolta == "Ida" ? "Volta" : "Ida";
  }
  for (let i = 0; i < jogosVolta.length; i++) {
    let jogo = jogosVolta[i];
    let gols1 = Math.floor(Math.random() * 5);
    let gols2 = Math.floor(Math.random() * 5);
    jogo.gols1 = gols1;
    jogo.gols2 = gols2;
  }

  for (let i = 0; i < jogosVolta.length; i++) {
    let jogo = jogosVolta[i];
    let time1 = jogo.time1;
    let time2 = jogo.time2;
    let partida;

    let jogosAnteriores = jogosVolta.slice(0, i);
    let jaSeEnfrentaram = jogosAnteriores.some((j) => {
      return (
        (j.time1 === time1 && j.time2 === time2) ||
        (j.time1 === time2 && j.time2 === time1)
      );
    });

    if (jaSeEnfrentaram) {
      time1 = jogo.time2;
      time2 = jogo.time1;
      jogo.cidade1 = jogo.cidade2;
    }

    partida =
      "<tr><td>" +
      time1 +
      "</td><td>" +
      time2 +
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

    if (i > 0) {
      let jogoAnterior = jogosVolta[i - 1];
      if (
        jogoAnterior.cidade1 == jogo.cidade1 &&
        jogoAnterior.rodada == jogo.rodada
      ) {
        partida += " <td>Rodada Dupla</td>";
      }
    }

    if (i < jogosVolta.length - 1) {
      let proximoJogo = jogosVolta[i + 1];
      if (
        proximoJogo.rodada == jogo.rodada &&
        proximoJogo.cidade1 == jogo.cidade1
      ) {
        partida += " <td>Rodada Dupla</td>";
      }
    }
    partida += "</td></tr>";
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

  if (timesTexto == "") {
    campeaoDoCampeonato.innerHTML = "";
    return;
  } else {
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
}
