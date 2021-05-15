import { useState } from "react";
import "./App.css";
import Loading from "./components/Loading";
import axios from "axios";

function App() {
  const arr = [0, 1, 2];
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const clickHandler = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:4000");
    setResult(response.data);
    setLoading(false);
  };

  console.log(result);

  return (
    <div className="flex">
      <button onClick={clickHandler}>Find Subsrcibers</button>
      <div className="main">
        {arr.map((a) => (
          <div key={a} className="card">
            {loading ? (
              <Loading></Loading>
            ) : result.length === 0 ? (
              <h2>Click find button</h2>
            ) : (
              <>
                <img src={result[a].image} alt="" />
                <h2 className="name">{result[a].name}</h2>
                <h3 className="subs">{result[a].subscribers}</h3>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
