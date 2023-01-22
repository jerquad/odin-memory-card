import React, { useState, useEffect } from 'react';

function PlayArea(props) {
    const [roundScore, setRoundScore] = useState(0);

    function pickPic(e, index) {
        if (props.mark[index]) { console.log('bzzt') }
        const mark = [...props.mark];
        mark[index] = true;
        props.setMark(mark);
    }

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
                            pickPic(e, i)
                        }}
                    />)}
            </div>
        </div>
    );
}

export default PlayArea;