import { useState } from "react";
import { ReactComponent as PathSvg } from "./path.svg";
import styled from "../SupportFAQ.module.scss";

interface IProps {
  questionData: any;
}

const Question: React.FC<IProps> = ({ questionData }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <li
      onClick={() => setIsActive(!isActive)}
      key={questionData.id}
      className={styled.questionItem}
      style={isActive ? { height: "auto" } : { height: "50px" }}
    >
      <div className={isActive ? styled.closePath : styled.openPath}>
        <PathSvg width='12' height='7' />
      </div>
      <h4 style={isActive ? { color: "#0074F0", height: "auto" } : { height: "20px" }}>
        {questionData.question}
      </h4>
      {isActive && <p className={styled.answer}>{questionData.answer}</p>}
    </li>
  );
};

export { Question };
