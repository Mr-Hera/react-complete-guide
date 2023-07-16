import React, { useState } from 'react'
import Output from './Output';
import Async from './Async';

const Greeting = () => {
    const [changedText, setChangedText] = useState(false);

    const changeTextHandler = () => {
        setChangedText(val => !val);
    };
  return (
    <div>
      <h2>My My My!</h2>
      <p>What a beautiful day to go outside...</p><br />
      <p>{changedText ? '(❁´◡`❁)' : '(¬_¬ )'}</p>
      <Output>{changedText ? 'Changed' : 'Not Changed'}</Output><br /><br />
      <button onClick={changeTextHandler}>Change Reaction</button><br /><br />
      <Async />
    </div>
  )
}

export default Greeting
