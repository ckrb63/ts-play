import { useEffect, useState } from "react";

const Timer:React.FC<{isResend:boolean, resendfunc:()=>void}> = (props) => {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(59);
  
  useEffect(() => {
    if(props.isResend){
      props.resendfunc();
      setMinutes(2);
      setSeconds(59);
      return;
    }
    const countdown = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes,seconds,props.isResend]);
  return (
    <div>
      <span>0{minutes}:</span>
      <span>{seconds>=10?seconds:`0${seconds}`}</span>
    </div>
  );
};
export default Timer;
