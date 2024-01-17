'use client'
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { wordList } from '@/data/wordList';
import WordCards from '@/components/WordCards/WordCards';
import WordQuiz from '@/components/WordQuiz/WordQuiz';
import WordPuzzle from '@/components/WordPuzzle/WordPuzzle';




const WordList = () => {

  const [words, setWords] = useState<Array<any>>([]);

  const [wordCards, setWordCards] = useState<string>('');
  const [wordQuiz, setWordQuiz] = useState<string>('');
  const [wordPuzzle, setWordPuzzle] = useState<string>('');

  useEffect(() => {
    getWords();
  }, []);

  useEffect(() => {
    if(wordCards === 'finished' && wordQuiz === '') setWordQuiz('started');
    if(wordQuiz === 'finished' && wordPuzzle === '') setWordPuzzle('started');
  }, [wordCards, wordQuiz, wordPuzzle]);

  
  const getRandomIndex = (arrayLength: number) => {
    return Math.floor(Math.random() * arrayLength);
  };

  const getWords = () => {

    const copyWordList = [...wordList];
    const randomWords: any[] = [];

    for (let i = 0; i < 10; i++) {

      const randomIndex = getRandomIndex(wordList.length);
      console.log(randomIndex, 'randomIndex', i)
      const randomWord = copyWordList[randomIndex];

      randomWords.push(randomWord);

      copyWordList.splice(randomIndex, 1);
    }

    setWords(randomWords);
  }

  return (
    <div className={styles.wrapper}>

      {wordCards === 'started' && <WordCards words={words} setWordCards={setWordCards} />}
      {wordQuiz === 'started' && <WordQuiz words={words} setWordQuiz={setWordQuiz} />}
      {wordPuzzle === 'started' && <WordPuzzle words={words} setWordPuzzle={setWordPuzzle} />}

      {!wordCards && <button className={styles.startButton} onClick={() => setWordCards('started')}>Start</button>}
    </div>
  )
}

export default WordList;