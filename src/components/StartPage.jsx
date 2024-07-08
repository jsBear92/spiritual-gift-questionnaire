import { useContext, useEffect } from "react";
import { SurveyContext } from "../util/SurveyContext";
import { useNavigate } from "react-router-dom";
import Signature from "./Signature";

const StartPage = () => {
  const navigate = useNavigate();
  const { name, setName, setPoints } = useContext(SurveyContext);

  useEffect(() => {
    setName("");
    setPoints(Array(19).fill(0));
  }, [])

  const handleClick = () => {
    navigate("/questionpage");
  };
  return (
    <>
      <h1>은사진단 설문지</h1>
      <p>안녕하세요! 은사진단 설문지에 오신 것을 환영합니다.</p>
      <p>아래의 설문지를 작성해주시면 감사하겠습니다.</p>
      <div>
        <p>
          은사진단 설문지에 나오는 각 문장에 대하여 아래의 수치를 사용하여
          답하십시오.
        </p>
        <p>
          중요한 점은 당신이 현재 어떠한 사람인가 하는 것에 충실히 대답하는
          것입니다.
        </p>
        <p>
          어떤 사람이 되었으면 한다거나, 어떤 사람이 되어야겠다는 감정에 의하지
          않도록 조심하십시오.
        </p>
        <p>당신의 평상시 모습을 반영하고 있는대로 답하십시오.</p>
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn" onClick={handleClick} disabled={!name}>
        시작하기
      </button>
      <Signature />
    </>
  );
};

export default StartPage;
