import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StartPage from "./components/StartPage";
import Questionnaire from "./components/Questionnaire";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/questionpage" element={<Questionnaire />} />
        <Route path="/resultpage" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
