import { Card, CardBody } from "@nextui-org/react";

import { SplitString } from "../util/SplitString";
import { motion } from "framer-motion";

const Introduce = () => {
  const introSentences = [
    "안녕하세요!",
    "은사진단 설문지에 오신 것을 환영합니다.",
    "아래의 설문지를 작성해주시면 감사하겠습니다.",
  ];
  const introChar1 = SplitString(introSentences[0]);
  const introChar2 = SplitString(introSentences[1]);
  const introChar3 = SplitString(introSentences[2]);

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };
  return (
    <>
      <motion.p
        initial="hidden"
        whileInView="reveal"
        transition={{ staggerChildren: 0.03 }}
        className="text-gray-500"
      >
        {introChar1.map((char) => (
          <motion.span
            key={char}
            transition={{ duration: 0.7 }}
            variants={charVariants}
          >
            {char}
          </motion.span>
        ))}
        <br />
        {introChar2.map((char) => (
          <motion.span
            key={char}
            transition={{ duration: 0.7 }}
            variants={charVariants}
          >
            {char}
          </motion.span>
        ))}
        <br />
        {introChar3.map((char) => (
          <motion.span
            key={char}
            transition={{ duration: 0.7 }}
            variants={charVariants}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1.5, ease: "easeIn" }}
        exit={{ opacity: 1 }}
      >
        <Card className="mb-4">
          <CardBody>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 1, ease: "easeIn" }}
              exit={{ opacity: 1 }}
              className="mb-2"
            >
              은사진단 설문지에 나오는 각 문장에 대하여{" "}
              <span className="text-blue-600">0~3</span>의 점수를 사용하여
              답하십시오.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.7, duration: 1, ease: "easeIn" }}
              exit={{ opacity: 1 }}
              className="mb-2"
            >
              중요한 점은 당신이 현재 어떠한 사람인가 하는 것에 충실히 대답하는
              것입니다.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.6, duration: 1, ease: "easeIn" }}
              exit={{ opacity: 1 }}
              className="mb-2"
            >
              어떤 사람이 되었으면 한다거나, 어떤 사람이 되어야겠다는 감정에
              의하지 않도록 조심하십시오.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5.5, duration: 1, ease: "easeIn" }}
              exit={{ opacity: 1 }}
            >
              당신의 평상시 모습을 반영하고 있는대로 답하십시오.
            </motion.p>
          </CardBody>
        </Card>
      </motion.section>
    </>
  );
};

export default Introduce;
