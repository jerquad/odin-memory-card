import React, { useState, useEffect } from 'react';
import './style/PlayArea.css';

function PlayArea(props) {
    const [roundScore, setRoundScore] = useState(1);
    const [images, setImages] = useState(props.images);
    const [marked, setMarked] = useState(() => new Array(props.level + 2).fill(false));
    const [roundStatus, setRoundStatus] = useState(() => makeStatus());

    // update the status indicator for the level whenever the images shuffle/resize
    useEffect(() => {
        setRoundStatus(makeStatus());
    }, [images]);

    // images shuffle whenever round score increases or resets
    useEffect(() => { randomizeImages() }, [roundScore])
    function randomizeImages() {
        const [lvl, mrk] = props.random(images, marked);
        setImages(lvl);
        setMarked(mrk);
    }

    // resets images to props when level changes and clears the marked array
    useEffect(() => { reset() }, [props.level])
    function reset() {
        setImages(props.random(props.images));
        setMarked(new Array(props.level + 2).fill(false));
    }

    // redirects click based on whether the choice is a failure, a level up, or a point up
    function handleClick(index) {
        if (marked[index]) { handleGameOver() }
        else if (roundScore === props.level + 2) { handleLevelUp() }
        else { handleScoreUp(index) }
    }

    // reset the game, indicate to App.js that it needs to reset
    function handleGameOver() {
        props.levelUp(1);
        props.scoreNull();
        setRoundScore(1);
        reset();
    }

    // indicate to App.js that it's a level up, reset round score
    function handleLevelUp() {
        props.scoreUp();
        props.levelUp(props.level + 1);
        setRoundScore(1);
    }

    // raises the score, indicates a score up on display and marks selection on marked array
    function handleScoreUp(index) {
        setRoundScore(roundScore + 1);
        props.scoreUp();
        const mark = [...marked];
        mark[index] = true;
        setMarked(mark);
    }

    // creates an array of score indicators to display the status of the level to the player
    function makeStatus() {
        const status = [];
        let i = 1;
        while (i <= images.length) {
            if (i < roundScore) status.push((<div key={i.toString()} className='stat-box stat-check'></div>))
            else status.push((<div key={i.toString()} className='stat-box'></div>))
            i++
        }
        return status;
    }

    return (
        <div id='pa-container'>
            <div id='round-status'>{roundStatus}</div>
            <div id='play-images'>
                {images.map((img, i) =>
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