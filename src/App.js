import React, { useState } from 'react';
import PlayArea from './components/PlayArea';

function App() {

  const [images, setImages] = useState(() => importAll(require.context('./components/img', false, /\.(png)$/)));
  const [level, setLevel] = useState(3);
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);

  const [levelPic, setLevelPic] = useState(() => images.slice(0, level));
  const [levelMark, setLevelMark] = useState(() => new Array(level).fill(false))

  function importAll(r) {
    let images = [];
    r.keys().forEach((item, index) => {
      images.push(r(item))
    })
    return images;
  }

  function randomizeArray(original, lock) {
    const newImages = [];
    const newLock = [];
    const size = original.length;
    for (let i = 0; i < size; i++) {
      let random = Math.floor(Math.random() * size)
      while (newImages[random]) {
        random += 1;
        if (random === size) random = 0;
      }
      newImages[random] = original[i];
      if (lock) newLock[random] = lock[i];
    }
    if (lock) return [newImages, newLock]
    return newImages;
  }

  function randomizeLevel() {
    const [lvl, mrk] = randomizeArray(levelPic, levelMark);
    setLevelPic(lvl);
    setLevelMark(mrk);
  }

  function imgArea() {
    const subImages = [];
    for (let i = 0; i < level; i++) {
      subImages.push((
        <img key={i.toString()} src={images[i]} alt={`dummy-${i}`} />
      ))
    }
    return subImages;
  }

  function levelUp() {
    setLevel(level + 1);
  }

  function scoreUp() {
    setScore(score + 1);
    if (score > hiScore) { setHiScore(score) };
  }

  function gameover() {
    setLevel(3);
    setScore(0);
  }


  return (
    <div className="App">
      <div style={{ display: 'block'}}>
        {`SCORE: ${score} LEVEL: ${level} HISCORE: ${hiScore}`}
      </div>
      <div style={{ display: 'block' }}>
        <button onClick={() => setImages(randomizeArray(images))} >RANDOMIZE</button>
        <button onClick={() => setLevel(level + 1)}>GROW</button>
        <button onClick={() => setLevel(1)}>RESET</button>
      </div>
      <div style={{display: 'block'}}>
        <img src={images[0]} alt='TOPLEVEL IMG' />
        <img src={images[1]} alt='TOPLEVEL IMG' />
        <img src={images[2]} alt='TOPLEVEL IMG' />
      </div>
      <div>
        <PlayArea 
        images={levelPic} 
        level={level}
        levelUp={levelUp}
        mark={levelMark}
        setMark={setLevelMark}
        random={randomizeLevel} 
        scoreUp={scoreUp}
        gameover={gameover}/>
      </div>
    </div>
  );
}

export default App;
