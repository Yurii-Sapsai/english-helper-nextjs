'use client'
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import WordCards from '../WordCards/WordCards';




const WordList = () => {

  const [showWords, setShowWords] = useState(false);


  return (
    <div className={styles.wrapper}>

      {showWords
        ? <WordCards />
        : <button className={styles.startButton} onClick={() => setShowWords(true)}>Start</button>
      }

    </div>
  )
}

export default WordList