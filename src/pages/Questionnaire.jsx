import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SurveyContext } from "../util/SurveyContext";
import questionsData from "../data/questionsData";
import { Button, Divider, Pagination } from "@nextui-org/react";

const Questionnaire = () => {
  const navigate = useNavigate();

  const { setPoints } = useContext(SurveyContext);

  const handleHomePage = () => {
    navigate("/");
  };

  const questionsPerPage = 14;

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

  // Check if all questions are answered
  const allQuestionsAnswered = questionsData.every((question) =>
    selectedAnswers.hasOwnProperty(question.id)
  );

  // Find unanswered questions
  const findUnansweredQuestions = () => {
    return questionsData
      .filter((question) => !selectedAnswers.hasOwnProperty(question.id))
      .map((question) => question.id);
  };

  // Navigate to the results page
  const handleShowResults = () => {
    if (allQuestionsAnswered) {
      navigate("/resultpage");
    } else {
      const findQuestions = findUnansweredQuestions();
      const stringQuestions = findQuestions.join(", ");
      console.log(stringQuestions);
      setUnansweredQuestions(stringQuestions);
    }
  };

  const handleResultPage = () => {
    navigate("/resultpage");
  };

  return (
    <div className="container mx-auto flex flex-col justify-center p-12">
      <h1 className="text-2xl">설문지</h1>
      <Divider className="my-4" />
      <div>
        <ul>
          {currentQuestions.map((question) => (
            <li key={question.id}>
              <div className="mb-2">{question.question}</div>
              <div className="mb-4">
                {[3, 2, 1, 0].map((point) => (
                  <Button
                    key={point}
                    onClick={() =>
                      handleAnswer(question.id, question.type, point)
                    }
                    size="sm"
                    radius="md"
                    className="bg-blue-500 text-white"
                    style={{
                      backgroundColor:
                        selectedAnswers[question.id] === point
                          ? "green"
                          : "",
                    }}
                  >
                    {point}
                  </Button>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <Pagination isCompact showControls total={totalPages} initialPage={1} page={currentPage} onChange={setCurrentPage} />
      </div>
      <div className="flex flex-wrap">
      <Button color="success" onClick={handleShowResults} className="flex-auto text-white">
        결과보기
      </Button>
      <Button onClick={handleHomePage} className="flex-auto">처음으로</Button>
      </div>
      {unansweredQuestions.length > 0 && (
        <div>Please answer the following questions: {unansweredQuestions}</div>
      )}
      {/* <Button color="danger" onClick={handleResultPage}>
        Test
      </Button> */}
    </div>
  );
};

export default Questionnaire;
