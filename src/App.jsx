import { useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import Timer from "./components/Timer";
import Ranking from "./components/Ranking";
import { supabase } from "./helpers/supabaseClient";

function App() {
  const [start, setStart] = useState(false);
  const [save, setSave] = useState(false);
  const [name, setName] = useState(false);
  const [warning, setWarning] = useState(false);
  const [error, setError] = useState(false);
  const score = useRef(0)


  const handleSave = async () => {
    if (name !== "") {
      const error = await supabase
        .from('Ranking')
        .insert({name: name, score: score.current })

      error.status === 409 ? setError(true) : location.reload();
      setWarning(false);
    } else {
      setWarning(true);
    }
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <Timer start={start} setStart={setStart} setSave={setSave} />
      <div className="buttons">
        {
          !start && !save ?
            <button onClick={() => setStart(true)}>Start</button> : 
            <button onClick={() => location.reload()}>Restart</button>
        }
        {
          save && 
          <>
            <input className={`${warning ? 'warning': ''}`} type="text" onChange={(e) => setName(e.target.value)} />
            <button onClick={handleSave}>Save</button>
          </>
        }
        { error && <p className="error">The name exist.</p>}
      </div>
      <div className="ranking">
        <Ranking />
      </div>
      <Cards start={start} score={score} />
    </div>
  );
}

export default App;
