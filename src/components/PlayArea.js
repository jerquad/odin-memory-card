import React, { useState, useEffect } from 'react';

function PlayArea(props) {
    const [roundScore, setRoundScore] = useState(0);
    function handleClick(index) {
        if (props.mark[index]) { 
            console.log('bzzt');
             props.levelUp(1);
             setRoundScore(0);
        }
        else if (roundScore === props.level + 1) { 
            console.log('level up');
            props.scoreUp();
            props.levelUp(props.level + 1);
            setRoundScore(0);
        }
        else {
            setRoundScore(roundScore + 1);
            props.scoreUp();
            const mark = [...props.mark];
            mark[index] = true;
            props.setMark(mark);
        }
    }

    useEffect(() => {
        props.random();
    }, [roundScore])

    return (
        <div style={{border: '1px solid black'}}>
            <div style={{display: 'block'}}>
                {`roundScore: ${roundScore}`}
            </div>
            <button onClick={() => console.log(props.mark)}>debug</button>
            <button onClick={() => props.random()}>random</button>
            <div style={{syle: 'block'}}>
                {props.images.map((img, i) => 
                    <img
                        key={i.toString()}
                        src={img}
                        alt={`dummy-${i}`}
                        onClick={(e) => {
                            handleClick(i)
                        }}
                    />)}
            </div>
        </div>
    );
}

export default PlayArea;