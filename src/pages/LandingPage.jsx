import { Button } from "@nextui-org/react";
import React, { useContext } from "react";
import { SurveyContext } from "../util/SurveyContext";
import { SplitString } from "../util/SplitString";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const { title } = useContext(SurveyContext);
  const titleChar = SplitString(title);

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  return (
    <section className="flex flex-col self-center gap-8">
      <motion.h1
        initial="hidden"
        whileInView="reveal"
        transition={{ staggerChildren: 0.05 }}
        className="text-4xl lg:text-8xl font-bold"
      >
        {titleChar.map((char) => (
          <motion.span
            key={char}
            transition={{ duration: 1 }}
            variants={charVariants}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, ease: "easeOut" }}
        exit={{ opacity: 1 }}
      >
        <Button
          className="self-center"
          color="primary"
          fullWidth="true"
          onClick={() => navigate("/intropage")}
          size="full"
        >
          시작하기
        </Button>
      </motion.span>
    </section>
  );
};

export default LandingPage;
