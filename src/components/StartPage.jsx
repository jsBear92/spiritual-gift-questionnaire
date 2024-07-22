import { useContext, useEffect } from "react";
import { SurveyContext } from "../util/SurveyContext";
import { useNavigate } from "react-router-dom";
import Signature from "./Signature";

import { Input, Button } from "@nextui-org/react";

const StartPage = () => {
  const navigate = useNavigate();
  const { name, setName, setPoints } = useContext(SurveyContext);

  useEffect(() => {
    setName("");
    setPoints(Array(19).fill(0));
  }, []);

  const handleClick = () => {
    navigate("/questionpage");
  };
  return (
    <div className="container mx-auto flex flex-col justify-center p-12">
      <h1 className="flex justify-center text-3xl font-bold mb-8">은사진단 설문지</h1>
      <p className="mb-2">
        안녕하세요! 은사진단 설문지에 오신 것을 환영합니다.
      </p>
      <p className="mb-4">아래의 설문지를 작성해주시면 감사하겠습니다.</p>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <p className="mb-4">
          은사진단 설문지에 나오는 각 문장에 대하여 <span className="text-blue-600">0~3</span>의 점수를 사용하여
          답하십시오.
        </p>
        <p className="mb-4">
          중요한 점은 당신이 현재 어떠한 사람인가 하는 것에 충실히 대답하는
          것입니다.
        </p>
        <p className="mb-4">
          어떤 사람이 되었으면 한다거나, 어떤 사람이 되어야겠다는 감정에 의하지
          않도록 조심하십시오.
        </p>
        <p className="mb-4">
          당신의 평상시 모습을 반영하고 있는대로 답하십시오.
        </p>
      </div>
      <Input
        isRequired
        type="text"
        label="이름"
        placeholder="이름을 입력해주세요."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border-2 border-slate-600 rounded-lg mb-4"
      />
      <Button color="primary" onClick={handleClick} isDisabled={!name}>
        시작하기
      </Button>
      <Signature />
    </div>
  );
};

export default StartPage;
