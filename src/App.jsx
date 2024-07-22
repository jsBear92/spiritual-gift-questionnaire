import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { SurveyContext } from "./util/SurveyContext";
import { Analytics } from "@vercel/analytics/react";
import StartPage from "./components/StartPage";
import Questionnaire from "./components/Questionnaire";
import ResultPage from "./components/ResultPage";

function App() {
  const [name, setName] = useState("");
  const [points, setPoints] = useState(Array(19).fill(0));
  return (
    <BrowserRouter>
      <SurveyContext.Provider value={{name, setName, points, setPoints}}>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/questionpage" element={<Questionnaire />} />
          <Route path="/resultpage" element={<ResultPage />} />
        </Routes>
      </SurveyContext.Provider>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
