import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { initialCards } from "../../utils/initialCards";
import { Question } from "./Question/Question";
import styled from "./SupportFAQ.module.scss";

const SupportFAQ = ({ questions = []}) => {

  return (
    <ul className={styled.questionsList}>
      {questions.map((q: { question: string; answer: string }) => (
        <Question key={q.question} questionData={q} />
      ))}
    </ul>
  );
};

export { SupportFAQ };
