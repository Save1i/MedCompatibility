import { useState } from "react";

export const MainPage = () => {
  const [med1, setMed1] = useState("");
  const [med2, setMed2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const checkInteraction = async () => {
    setError("");
    setResult(null);

    if (!med1 || !med2) {
      setError("Пожалуйста, введите оба названия препаратов.");
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
        setResult(data);
      }
    } catch (e) {
      console.log(e)
      setError("Ошибка подключения к серверу.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">
            Проверка взаимодействия препаратов
          </h2>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Название препарата 1"
              value={med1}
              onChange={(e) => setMed1(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Название препарата 2"
              value={med2}
              onChange={(e) => setMed2(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100" onClick={checkInteraction}>
            Проверить взаимодействие
          </button>

          {error && (
            <div className="alert alert-danger mt-4 text-center" role="alert">
              {error}
            </div>
          )}

          {result && (
            <div className="alert alert-info mt-4 text-center">
              <h5 className="mb-2">Результат взаимодействия:</h5>
              <p>
                <strong>{result.med1}</strong> +{" "}
                <strong>{result.med2}</strong>
              </p>
              <p>
                <strong>Тип:</strong> {result.status}
              </p>
              {result.comment && (
                <p>
                  <strong>Комментарий:</strong> {result.comment}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
