'use client'
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { wordList } from '@/data/wordList';
import ChooseLevel from '@/components/ChooseLevel/ChooseLevel';
import WordCards from '@/components/WordCards/WordCards';
import WordQuiz from '@/components/WordQuiz/WordQuiz';
import WordPuzzle from '@/components/WordPuzzle/WordPuzzle';
import WordListCompleted from '@/components/WordListCompleted/WordListCompleted';
import Image from 'next/image';
import AirplaneIcon from '@/assets/airplane.webp';



const WordList = () => {

  const [words, setWords] = useState<Array<any>>([]);
  const [level, setLevel] = useState<string>('');

  const [wordCards, setWordCards] = useState<string>('');
  const [wordQuiz, setWordQuiz] = useState<string>('');
  const [wordPuzzle, setWordPuzzle] = useState<string>('');
  const [wordListCompleted, setWordListCompleted] = useState<boolean>(false)

  useEffect(() => {
    getWords();
  }, [level]);

  useEffect(() => {
    if (wordCards === 'finished' && wordQuiz === '') setWordQuiz('started');
    if (wordQuiz === 'finished' && wordPuzzle === '') setWordPuzzle('started');
    if (wordPuzzle === 'finished') setWordListCompleted(true);
  }, [wordCards, wordQuiz, wordPuzzle]);


  const getRandomIndex = (arrayLength: number) => {
    return Math.floor(Math.random() * arrayLength);
  };

  const filterWordsByLevel = (copyWordList: any[]) => {

    if (level !== 'All' && level !== '') {
      return copyWordList = wordList.filter((word: any) => word.lvl === level);
    } else {
      return copyWordList = [...wordList];
    }
  }

  const getWords = () => {

    let copyWordList: any[] = [];
    copyWordList = filterWordsByLevel(copyWordList);

    const randomWords: any[] = [];

    for (let i = 0; i < 15; i++) {

      const randomIndex = getRandomIndex(copyWordList.length);
      const randomWord = copyWordList[randomIndex];

      randomWords.push(randomWord);

      copyWordList.splice(randomIndex, 1);
    }

    setWords(randomWords);
  }

  return (
    <div className={styles.wrapper}>

      {!wordCards && <ChooseLevel setLevel={setLevel} />}

      {wordCards === 'started' && <WordCards words={words} setWordCards={setWordCards} />}
      {wordQuiz === 'started' && <WordQuiz words={words} setWordQuiz={setWordQuiz} />}
      {wordPuzzle === 'started' && <WordPuzzle words={words} setWordPuzzle={setWordPuzzle} />}
      {wordListCompleted === true && <WordListCompleted />}

      {!wordCards && <button className={styles.startButton} disabled={level === ''} onClick={() => setWordCards('started')}>START <Image src={AirplaneIcon} alt='' className={styles.airplaneIcon} /></button>}
    </div>
  )
}

export default WordList;