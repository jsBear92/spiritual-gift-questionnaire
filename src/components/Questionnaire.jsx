import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SurveyContext } from "../util/SurveyContext";
import questionsData from "../data/questionsData";
import Signature from "./Signature";

const Questionnaire = () => {
  const navigate = useNavigate();

  const { setPoints } = useContext(SurveyContext);

  const handleHomePage = () => {
    navigate("/");
  };

  const questionsPerPage = 10;

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1);

  // State to track which answers have been selected
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Get the total number of pages
  const totalPages = Math.ceil(questionsData.length / questionsPerPage);

  // Calculate the current questions to display
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questionsData.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const [unansweredQuestions, setUnansweredQuestions] = useState("");

  // Handle answer selection
  const handleAnswer = (questionId, type, point) => {
    setPoints((prevPoints) => {
      const newPoints = [...prevPoints];
      const currentPoint = selectedAnswers[questionId];

      // If the same point is clicked, remove the point
      if (currentPoint === point) {
        newPoints[type - 1] -= point;
        setSelectedAnswers((prevSelectedAnswers) => {
          const { [questionId]: _, ...newSelectedAnswers } =
            prevSelectedAnswers;
          return newSelectedAnswers;
        });
      } else {
        // If a different point is selected, update the points
        if (currentPoint !== undefined) {
          newPoints[type - 1] -= currentPoint;
        }
        newPoints[type - 1] += point;
        setSelectedAnswers((prevSelectedAnswers) => ({
          ...prevSelectedAnswers,
          [questionId]: point,
        }));
      }

      return newPoints;
    });
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Check if all questions are answered
  const allQuestionsAnswered = questionsData.every((question) =>
    selectedAnswers.hasOwnProperty(question.id)
  );

  // Find unanswered questions
  const findUnansweredQuestions = () => {
    return questionsData
        .filter(question => !selectedAnswers.hasOwnProperty(question.id))
        .map(question => question.id);
};


  // Navigate to the results page
  const handleShowResults = () => {
    if (allQuestionsAnswered) {
      navigate("/resultpage");
    } else {
      const findQuestions = findUnansweredQuestions();
      const stringQuestions = findQuestions.join(', ')
      console.log(stringQuestions)
      setUnansweredQuestions(stringQuestions);
    }
  };

  const handleResultPage = () => {
    navigate("/resultpage");
  };

  return (
    <>
      <h1>설문지</h1>
      <button onClick={handleHomePage}>처음으로</button>

      <div>
        <ul>
          {currentQuestions.map((question) => (
            <li key={question.id}>
              <div>{question.question}</div>
              <div>
                {[3, 2, 1, 0].map((point) => (
                  <button
                    key={point}
                    onClick={() =>
                      handleAnswer(question.id, question.type, point)
                    }
                    style={{
                      backgroundColor:
                        selectedAnswers[question.id] === point
                          ? "lightblue"
                          : "",
                    }}
                  >
                    {point}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <button
        className="btn"
        onClick={handleShowResults}
      >
        결과보기
      </button>
      <button className="btn" onClick={handleResultPage}>
        Test
      </button>
        {unansweredQuestions.length > 0 && (<div>
            Please answer the following questions: {unansweredQuestions}
        </div>)}
      <Signature />
    </>
  );
};

export default Questionnaire;
