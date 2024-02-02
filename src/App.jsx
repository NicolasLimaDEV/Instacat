import "./index.css";
import { useState, useEffect } from "react";

export default function App() {
  const [fotos, setFotos] = useState([]);
  const [count, setCount] = useState(0);
  const [botoesDesabilitados, setBotoesDesabilitados] = useState([]);

  useEffect(() => {
    let api = "https://api.thecatapi.com/v1/images/search?limit=10";

    const loadApi = () => {
      fetch(api)
        .then((res) => res.json())
        .then((json) => {
          setFotos(json);
          // Inicializa o array de botões desabilitados com 'false' para cada botão
          setBotoesDesabilitados(Array(json.length).fill(false));
        });
    };

    loadApi();
  }, []);

  const handleLike = (index) => {
    // Desabilita o botão clicado
    setBotoesDesabilitados((e) => {
      const newState = [...e];
      newState[index] = true;
      return newState;
    });

    if (count === 5) {
      alert("Você atingiu o limite de curtida! A página será atualizada!");
      window.location.reload();
      return;
    }
    setCount(count + 1);
  };

  return (
    <div>
      <header className="header">
        <h1>InstaCat</h1>

        <h3>
          Fotos que você curtiu: <span>{count}</span>
        </h3>
      </header>

      <section>
        <div className="container">
          {fotos.map((item, index) => (
            <div className="feed" key={index}>
              <img src={item.url} alt="" width={300} height={300} />
              <button
                onClick={() => handleLike(index)}
                disabled={botoesDesabilitados[index]}
                className={
                  botoesDesabilitados[index] ? "botaoDesaparecido" : ""
                }
              >
                ❤
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
