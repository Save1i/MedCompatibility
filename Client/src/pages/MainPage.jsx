import { useEffect, useRef, useState } from "react";
import { ResultBox } from "../components/ResultBox";
import SmartClue from "../components/SmartClue";
import SmartClue2 from "../components/SmartClue2";
import { useClickOutside } from "../components/useClickOutside";

export const MainPage = () => {
  const [med1, setMed1] = useState("");
  const [med2, setMed2] = useState("");
  const [searchMed1, setSearchMed1] = useState("");
  const [searchMed2, setSearchMed2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const [promt1, setPromt1] = useState([]);
  const [promt2, setPromt2] = useState([]);
  const [active1, setActive1] = useState(false)
  const [active2, setActive2] = useState(false)

  useEffect(() => {
    active1 && elasticSearch() 
    active2 && elasticSearch2()
  }, [med1, med2])

  const ref1 = useRef(null);
  useClickOutside(ref1, () => setActive1(false));

  const ref2 = useRef(null);
  useClickOutside(ref2, () => setActive2(false));



  console.log(med1)
  
  const response = {
    strong_enhancement: "Усиление действия",
    mild_enhancement: "Слабое усиление действия",
    reduction: "Ослабление действия",
    toxicity_increase: "Усиление токсичности",
    no_data: "Нет информации о взаимодействии",
    incompatible: "Не совместимы",
  }


  const elasticSearch = async () => {
    try {

      const res = await fetch(
        `${import.meta.env.VITE_LOCAL_URL}/api/_search?value=${med1}`
      );
      const data = await res.json();
      if (Array.isArray(data) && med1) {
        setPromt1(data);
      } else {
        setPromt1([]);
      }

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const elasticSearch2 = async () => {
    try {

      const res = await fetch(
        `${import.meta.env.VITE_LOCAL_URL}/api/_search?value=${med2}`
      );
      const data = await res.json();
      if (Array.isArray(data) && med2) {
        setPromt2(data);
      } else {
        setPromt2([]);
      }

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const checkInteraction = async () => {
    setError("");
    setResult(null);
    setLoading(true)

    if (!med1 || !med2) {
      setError("Пожалуйста, введите оба названия препаратов.");
      setLoading(false)
      return;
    }


    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/medication?med1=${med1}&med2=${med2}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ошибка при получении данных.");
      } else {
        setSearchMed1(med1);
        setSearchMed2(med2);
        setResult(data);
      }
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
      setError("Ошибка подключения к серверу.");
    }

    // setLoading(false)
  };  

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">
            Проверка взаимодействия препаратов
          </h2>

          <div className="mb-3" ref={ref1}>
            <input
              type="text"
              className="form-control"
              placeholder="Название препарата 1"
              value={med1}
              onChange={(e) => setMed1(e.target.value)}
              onFocus={()=>setActive1(true)}
            />
              {active1 && promt1.length > 0 ? (
                <SmartClue promt={promt1} setMed1={setMed1} setActive1={setActive1}/>)
                : <div style={{height:"80px"}}></div>
              }
          </div>

          <div className="mb-3" ref={ref2}>
          <input
            type="text"
            className="form-control"
            placeholder="Название препарата 2"
            value={med2}
            onChange={(e) => setMed2(e.target.value)}
            onFocus={() => setActive2(true)}
          />
          {active2 && promt2.length > 0 ? (
            <SmartClue2 promt={promt2} setMed2={setMed2} setActive2={setActive2}/>
          ) : <div style={{height:"80px"}}></div>}
        </div>


          <button className="btn btn-primary w-100" onClick={checkInteraction} disabled={loading}>
            {loading ? "Загрузка..." : "Проверить взаимодействие"}
          </button>

          {loading && (
            <div className="loader-container mt-4">
              <div className="custom-loader"></div>
              <div className="text-muted mt-2">Анализируем взаимодействие...</div>
            </div>
          )}


          {error && !loading && (
            <div className="alert alert-danger mt-4 text-center" role="alert">
              {error}
            </div>
          )}


          {result && !loading && (
            <ResultBox
              result={result}
              med1={searchMed1}
              med2={searchMed2}
              response={response}
            />
          )}
        </div>
      </div>
    </div>
  );
}
