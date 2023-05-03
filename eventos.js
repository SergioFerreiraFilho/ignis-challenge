function gerarJogos() {
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
            turno: turnoIda
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
          turno: turnoVolta
        };
        jogosVolta.push(jogoVolta);
      }
      rodadaVolta++;
      turnoVolta = turnoVolta == "ida" ? "volta" : "ida";
    }
  
    let tabela = document.getElementById("tabela");
    tabela.innerHTML = "";
    let cabecalho = "<tr><th>Time 1</th><th>Time 2</th><th>Cidade</th><th>Turno</th><th>Rodada</th></tr>";
    tabela.innerHTML += cabecalho;
    for (let i = 0; i < jogosVolta.length; i++) {
      let jogo = jogosVolta[i];
      let partida = "<tr><td>" + jogo.time1 + "</td><td>" + jogo.time2 + "</td><td>" + jogo.cidade1 + "</td><td>" + jogo.turno + "</td><td>" + jogo.rodada + "</td></tr>";
    tabela.innerHTML += partida;
  }
}