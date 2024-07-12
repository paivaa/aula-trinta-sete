import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  let [news, setNews] = useState(null)


  useEffect(() => {
    
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const chamadaApi = (numero) =>{
      fetch("https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia&page="+numero)
      .then(response => response.json())
          
      .then(data => setNews(data.items[0]))
    }

    chamadaApi(getRandomInt(1, 70));

    let id = setInterval(() =>{
      chamadaApi(getRandomInt(1, 70));
      setNews(null)
    },10000);

    return () => {
      clearInterval(id);
      setNews(null)
    }
  },[])

console.log(news)
  return (
    <div className="App">
      {news && (
        <>
          <span>Atualiza noticias a cada 10 segundos...</span>
          <h1>{news.titulo}</h1>
          <p>{news.introducao}</p>
          </>
        ) }
    </div>
  );
}
export default App;
