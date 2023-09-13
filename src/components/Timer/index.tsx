import { FC } from "react";
import { useTimer } from "react-timer-hook";
import { battleAPI } from "../../api/api";

interface Props {
  expiryTimestamp: any;
  setTimeIsOver: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Timer: FC<Props> = ({ expiryTimestamp, setTimeIsOver }) => {
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setTimeIsOver(true)
    },
  });


  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return (
    <>
      <span>{displayMinutes}</span>
      <span>:{displaySeconds}</span>
    </>
  );
};
