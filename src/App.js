import React, { useState, useEffect } from 'react';
import PlayArea from './components/PlayArea';
import './components/style/app.css'

function App() {

  const [images, setImages] = useState(() => importAll(require.context('./components/img', false, /\.(png)$/)));
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);

  // check for hi schores
  useEffect(() => { if (score > hiScore) setHiScore(score); })

  // import all images at once
  function importAll(r) {
    let images = [];
    r.keys().forEach((item) => { images.push(r(item)) });
    return images;
  }

  // return a randomized array, optional second parameter randomizes second array in lockstep
  function randomizeArray(original, lock) {
    const newArray = [];
    const newLock = [];
    const size = original.length;
    for (let i = 0; i < size; i++) {
      let random = Math.floor(Math.random() * size)
      while (newArray[random]) {
        random += 1;
        if (random === size) random = 0;
      }
      newArray[random] = original[i];
      if (lock) newLock[random] = lock[i];
    }
    if (lock) return [newArray, newLock]
    return newArray;
  }

  return (
    <div className="App">
      <div className='top'>
        <div id='header'>
          <h1>That's So Decreux...</h1>
          <h2>...A Memory Game</h2>
        </div>
        <div id='play-area'>
          <div id='scorebox'>
            <span>{`Score... ${score}`}</span>
            <span>{`Level... ${level}`}</span>
            <span>{`Hi Score... ${hiScore}`}</span>
          </div>
          <PlayArea
          images={images.slice(0, level + 2)}
          level={level}
          levelUp={setLevel}
          random={randomizeArray}
          scoreUp={() => setScore(score + 1)}
          scoreNull={() => setScore(0)}
          />
        </div>
        <div id='how-to'>
          <div className='how-to-content'>
            <h3>How To Play...</h3>
            <ul>
              <li>...Select each portrait only once per level</li>
              <li>...Each correct selection awards one point</li>
              <li>...Select portrait two times in a level results in a game over</li>
              <li>...A new portrait will be added with each level</li>
            </ul>
          </div>
        </div>
      </div>
      <div id='footer'>
            &copy;2023 Jimmy Quadros as part of The Odin Project
      </div>
    </div>
  );
}

export default App;
