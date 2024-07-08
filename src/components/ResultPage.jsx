import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { SurveyContext } from "../util/SurveyContext";
import Signature from "./Signature";

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

  // Kakao Share init
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  const handleShareKakaoClick = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      kakao.Share.sendDefault({
        objectType: "text",
        text: `${name}님의 성령의 은사진단 결과: ${top3PointsWithNames
          .map(({ name, point }) => `${name}: ${point}`)}`,
        link: {
          mobileWebUrl: "https://spiritual-gift-questionnaire.vercel.app",
          webUrl: "https://spiritual-gift-questionnaire.vercel.app",
        },
      });
    }
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
      <h2>공유하기</h2>
      <button onClick={handleShareKakaoClick}>카카오톡 공유하기</button>
      <Signature />
    </>
  );
};

export default ResultPage;
