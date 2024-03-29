import { useEffect, useRef } from "react";
import Countdown from "react-countdown"


const Counter = ({props}) => (<span>{props.seconds === 0? 60: props.seconds}</span>);

const Timer = ({start, setStart, setSave}) => {
    const timeRef = useRef();


    const handleEnd = ({start}) => {
        setStart(false);
        setSave(true);
    }

    useEffect(() => {
        if (start){
            timeRef.current.start();
        }
    }, [start]) 

  return (
    <div className="timer">
        <h3>
        <Countdown
            date={Date.now() + 60000 }
            renderer={props => <Counter props={props} />}
            onComplete={handleEnd}
            autoStart={false}
            ref={timeRef}
        >
        </Countdown>    
        </h3>
    </div>
  )
}

export default Timer
