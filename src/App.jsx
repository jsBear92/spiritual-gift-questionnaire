import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { SurveyContext } from "./util/SurveyContext";
import { Analytics } from "@vercel/analytics/react";
import StartPage from "./pages/IntroPage";
import Questionnaire from "./pages/Questionnaire";
import ResultPage from "./pages/ResultPage";
import LandingPage from "./pages/LandingPage";

function App() {
  const [name, setName] = useState("");
  const [points, setPoints] = useState(Array(19).fill(0));
  const title = "은사진단 테스트";
  return (
    <BrowserRouter>
      <SurveyContext.Provider value={{ name, setName, points, setPoints, title }}>
        <main className="container mx-auto min-h-screen p-12 flex justify-center">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/intropage" element={<StartPage />} />
            <Route path="/questionpage" element={<Questionnaire />} />
            <Route path="/resultpage" element={<ResultPage />} />
          </Routes>
        </main>
      </SurveyContext.Provider>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
