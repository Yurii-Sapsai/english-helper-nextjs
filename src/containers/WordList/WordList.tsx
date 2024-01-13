'use client'
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { wordList } from '@/data/wordList';
import WordCards from '@/components/WordCards/WordCards';
import WordQuiz from '@/components/WordQuiz/WordQuiz';




const WordList = () => {

  const [words, setWords] = useState<Array<any>>([]);

  const [wordCards, setWordCards] = useState<string>('');
  const [wordQuiz, setWordQuiz] = useState<string>('');

  useEffect(() => {
    getWords();
  }, []);

  useEffect(()=>{
    wordCards === 'finished' && setWordQuiz('started')
  },[wordCards, wordQuiz])


  const getRandomIndex = (arrayLength: number) => {
    return Math.floor(Math.random() * arrayLength);
};

  
const getWords = () => {

  const copyWordList = [...wordList];
  const randomWords: any[] = [];

  for (let i = 0; i < 10; i++) {

      const randomIndex = getRandomIndex(copyWordList.length);
      const randomWord = copyWordList[randomIndex];

      randomWords.push(randomWord);

      copyWordList.splice(randomIndex, 1);
  }

  setWords(randomWords);
}
  console.log(words, 'WORDLIST')

  return (
    <div className={styles.wrapper}>

      {wordCards === 'started' && <WordCards words={words} setWordCards={setWordCards} />}
      {wordQuiz === 'started' && <WordQuiz />}

      {!wordCards && <button className={styles.startButton} onClick={() => setWordCards('started')}>Start</button>}
    </div>
  )
}

export default WordList;