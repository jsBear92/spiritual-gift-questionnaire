import { useContext, useEffect } from "react";
import { SurveyContext } from "../util/SurveyContext";
import { useNavigate } from "react-router-dom";
import Signature from "../components/Signature";

import { Input, Button } from "@nextui-org/react";
import Introduce from "../components/Introduce";
import { BackIcon } from "../components/BackIcon";
import { motion } from "framer-motion";

const StartPage = () => {
  const navigate = useNavigate();
  const { name, setName, setPoints } = useContext(SurveyContext);

  useEffect(() => {
    setName("");
    setPoints(Array(19).fill(0));
  }, []);

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-row">
        <Button isIconOnly variant="light" onClick={() => navigate("/")}>
          <BackIcon />
        </Button>
        <h1 className="justify-center text-3xl font-bold mb-8">
          은사진단 안내
        </h1>
      </div>

      <Introduce />
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ delay: 6, duration: 1, ease: "easeOut" }}
        exit={{ opacity: 1 }}
      >
        <Input
          isRequired
          type="text"
          label="이름"
          placeholder="이름을 입력해주세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-slate-600 rounded-lg mb-4"
        />
        <Button
          color="primary"
          onClick={() => navigate("/questionpage")}
          isDisabled={!name}
        >
          시작하기
        </Button>
      </motion.div>
    </section>
  );
};

export default StartPage;
