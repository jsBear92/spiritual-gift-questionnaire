import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import questionsData from "../data/questionsData";

const Questionnaire = () => {
  const navigate = useNavigate();

  const handleHomePage = () => {
    navigate("/");
  };

  const questionsPerPage = 10;

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1);

  // State to manage the points for each type
  const [points, setPoints] = useState(Array(19).fill(0));

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

  // Navigate to the result page
  const handleResultPage = () => {
    navigate("/resultpage", { state: { points } });
  };

  // Check if all questions are answered
  const allQuestionsAnswered = questionsData.every((question) =>
    selectedAnswers.hasOwnProperty(question.id)
  );

  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <h1>설문지</h1>
      <button onClick={handleHomePage}>처음으로</button>

      <div>
        <h1>Question List</h1>
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
                    {point} Points
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
        {/* <div>
          <h2>Total Points by Type</h2>
          <ul>
            {points.map((point, index) => (
              <li key={index}>
                Type {index + 1}: {point} Points
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      {/* <button className="btn" onClick={handleResultPage} disabled={!allQuestionsAnswered}>
        결과보기
      </button> */}
      <button className="btn" onClick={handleResultPage}>
        결과보기
      </button>
      <button onClick={() => console.log(points)}>
        test
      </button>
    </>
  );
};

export default Questionnaire;
