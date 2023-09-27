import { useState, useEffect } from 'react';

const Counter = () => {

    const [clicks, setClicks] = useState(0);
    const [step, setStep] = useState(1);
    const showValue = () => {
        setTimeout(() => {
            alert(clicks)
        }, 3000);
    }

    useEffect(() => {
        console.log('renrer', clicks, step);
        document.title = `Clicked ${clicks} times`

        setStep((prevValue) => prevValue + 1)
    }, [clicks])

    useEffect(() => {
        console.log('Step', step);
    }, [step])

    return (
        <div>
            <div> Cliked: {clicks}</div>
            <button onClick={() => setClicks(clicks + step)}>Click</button>
            <br />
            <button onClick={showValue}>Show Value</button>
            <br />
            <input name='step' value={step} onChange={(e) => setStep(+e.target.value)} />
        </div >
    )
}

export default Counter;
