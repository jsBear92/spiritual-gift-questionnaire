import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SurveyContext } from "../util/SurveyContext";

const ResultPage = () => {
  const navigate = useNavigate();

  const { name, points } = useContext(SurveyContext);

  // Names corresponding to each point index
  const spiritualGiftNames = [
    "다스림(행정)",
    "사도",
    "재주(기술,기능)",
    "예능(창의적인 의사전달)",
    "영분별",
    "권위",
    "전도",
    "믿음",
    "구제",
    "돕는것",
    "대접",
    "중보기도",
    "지식",
    "지도력",
    "긍휼",
    "예언",
    "목사(목자)",
    "가르침(교사)",
    "지혜",
  ];

  // Combine points with their names and sort by points in descending order
  const sortingPoints = points.map((point, index) => ({
    name: spiritualGiftNames[index],
    point,
  }));
  sortingPoints.sort((a, b) => b.point - a.point);

  // Get top 3 points with names
  const top3PointsWithNames = sortingPoints.slice(0, 3);

  const handleHomePage = () => {
    navigate("/");
  };
  return (
    <>
      <h1>은사진단 결과</h1>
      <button onClick={handleHomePage}>처음으로</button>
      <div>
        <h2>{name}님의 성령의 은사진단 결과</h2>
        {/* point board */}
        <ol>
          {top3PointsWithNames.map(({ name, point }) => (
            <li key={name}>
              {name}: {point}
            </li>
          ))}
        </ol>
      </div>
      <div>공유하기</div>
    </>
  );
};

export default ResultPage;
