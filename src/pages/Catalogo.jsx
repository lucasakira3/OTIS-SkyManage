import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Catalogo.css";
import gen2 from "../assets/gen2.jpg";
import lightplus from "../assets/lightplus.jpg";
import skyrise from "../assets/skyrise.jpg";

export default function Catalogo() {
  const elevador = {
    nome: "Gen2 Comfort",
    imagem: gen2,
    capacidade: "1600 kg",
    velocidade: "1 m/s",
    percurso: "120 metros",
    descricao:
      "Alto conforto, eficiência energética e sem casa de máquinas em certas configurações.",
  };

  const elevador_2 = {
    nome: "Gen2 Light Plus",
    imagem: lightplus,
    capacidade: "1000 kg",
    velocidade: "1,75 m/s",
    percurso: "90 metros",
    descricao:
      "Modelo econômico, sem casa de máquinas, indicado para edifícios de menor porte.",
  };

  const elevador_3 = {
    nome: "Gen 2 Skyrise",
    imagem: skyrise,
    capacidade: "1600 kg",
    velocidade: "12,5 m/s",
    percurso: "600 metros",
    descricao:
      "Uso em edifícios altos e sofisticados, desempenho superior.",
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        {/* Card do Gen2 Comfort */}
        <div className="col-md-10 mb-4">
          <div className="card-horizontal">
            <img
              src={elevador.imagem}
              alt={elevador.nome}
              className="card-img-left"
            />
            <div className="card-body-horizontal">
              <h5 className="card-title card-title-otis mb-2">{elevador.nome}</h5>
              <p className="card-text card-text-otis mb-1">
                <strong className="card-text-strong">Capacidade:</strong> {elevador.capacidade}
              </p>
              <p className="card-text card-text-otis mb-1">
                <strong className="card-text-strong">Velocidade:</strong> {elevador.velocidade}
              </p>
              <p className="card-text card-text-otis mb-2">
                <strong className="card-text-strong">Percurso:</strong> {elevador.percurso}
              </p>
              <p className="card-text card-text-otis mb-3">{elevador.descricao}</p>
              <button className="btn btn-otis">Ver Detalhes</button>
            </div>
          </div>
        </div>

        {/* Card do Gen2 Light Plus */}
        <div className="col-md-10 mb-4">
          <div className="card-horizontal">
            <img
              src={elevador_2.imagem}
              alt={elevador_2.nome}
              className="card-img-left"
            />
            <div className="card-body-horizontal">
              <h5 className="card-title card-title-otis mb-2">{elevador_2.nome}</h5>
              <p className="card-text card-text-otis mb-1">
                <strong className="card-text-strong">Capacidade:</strong> {elevador_2.capacidade}
              </p>
              <p className="card-text card-text-otis mb-1">
                <strong className="card-text-strong">Velocidade:</strong> {elevador_2.velocidade}
              </p>
              <p className="card-text card-text-otis mb-2">
                <strong className="card-text-strong">Percurso:</strong> {elevador_2.percurso}
              </p>
              <p className="card-text card-text-otis mb-3">{elevador_2.descricao}</p>
              <button className="btn btn-otis">Ver Detalhes</button>
            </div>
          </div>
        </div>

        {/* Card do Gen 2 Skyrise */}
        <div className="col-md-10 mb-4">
          <div className="card-horizontal">
            <img
              src={elevador_3.imagem}
              alt={elevador_3.nome}
              className="card-img-left"
            />
            <div className="card-body-horizontal">
              <h5 className="card-title card-title-otis mb-2">{elevador_3.nome}</h5>
              <p className="card-text card-text-otis mb-1">
                <strong className="card-text-strong">Capacidade:</strong> {elevador_3.capacidade}
              </p>
              <p className="card-text card-text-otis mb-1">
                <strong className="card-text-strong">Velocidade:</strong> {elevador_3.velocidade}
              </p>
              <p className="card-text card-text-otis mb-2">
                <strong className="card-text-strong">Percurso:</strong> {elevador_3.percurso}
              </p>
              <p className="card-text card-text-otis mb-3">{elevador_3.descricao}</p>
              <button className="btn btn-otis">Ver Detalhes</button>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
