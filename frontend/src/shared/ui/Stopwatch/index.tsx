import "./styles.scss";
import { FC, useEffect } from "react";
import Flex from "antd/es/flex";
import { useStopwatch } from "react-timer-hook";

interface Props {
  autoStart?: boolean;
  totalSeconds?: number;
}

const Stopwatch: FC<Props> = ({ autoStart = false, totalSeconds = 0 }) => {
  const { hours, minutes, seconds, reset } = useStopwatch({
    autoStart,
  });

  useEffect(() => {
    const stopwatchOffset = new Date();
    stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + totalSeconds);
    reset(stopwatchOffset, autoStart);
  }, [autoStart, reset, totalSeconds]);

  return (
    <Flex className="stopwatch">
      <span>
        {hours < 10 ? "0" : ""}
        {hours}
      </span>

      <span>:</span>

      <span>
        {minutes < 10 ? "0" : ""}
        {minutes}
      </span>

      <span>:</span>

      <span>
        {seconds < 10 ? "0" : ""}
        {seconds}
      </span>
    </Flex>
  );
};

export default Stopwatch;
