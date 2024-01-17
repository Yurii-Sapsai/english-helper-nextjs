'use client'
import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import styles from './styles.module.css';
import { wordList } from '@/data/wordList';



interface IWordQuizProps {
    words: Array<any>,
    setWordQuiz: Dispatch<SetStateAction<string>>
}



const WordQuiz = ({ words, setWordQuiz }: IWordQuizProps) => {

    const [wordIndex, setWordIndex] = useState<number>(0);
    const [answerOptions, setAnswerOptions] = useState<Array<any>>([]);

    useEffect(() => {
        getAnswerOptions();
        wordIndex === words.length && setWordQuiz('finished');
    }, [wordIndex]);

    const getRandomIndex = (arrayLength: number) => {
        return Math.floor(Math.random() * arrayLength);
    };

    const getAnswerOptions = () => {

        const copyWordList = [...wordList];
        const randomWords: any[] = [];

        for (let i = 0; i < 3; i++) {

            const randomIndex = getRandomIndex(copyWordList.length);
            const randomWord = copyWordList[randomIndex];

            randomWords.push(randomWord);

            copyWordList.splice(randomIndex, 1);
        }

        const fourthIndex = getRandomIndex(randomWords.length + 1);
        randomWords.splice(fourthIndex, 0, words[wordIndex]);

        setAnswerOptions(randomWords)
    }

    const answerChecking = (answer: any, word: any) => {
        console.log('check 1', answer)
        console.log('check 2', word)

        let getAnswer: HTMLElement | null = document.getElementById(answer.word);
        let getWord: HTMLElement | null = document.getElementById(word.word);
        let options: HTMLCollectionOf<Element> = document.getElementsByClassName(styles.word);

        if (answer.word === word.word) {

            if (getAnswer) {
                getAnswer.classList.add(styles.rightAnswer)
            }
            if (options) {
                for (let i = 0; i < options.length; i++) {
                    if (options[i]) {
                        options[i].classList.add(styles.disabledOptions)
                    }
                }
            }

        } else {

            if (getAnswer) {
                getAnswer.classList.add(styles.wrongAnswer)
            }
            if (getWord) {
                getWord.classList.add(styles.rightAnswer)
            }

            if (options) {
                for (let i = 0; i < options.length; i++) {
                    if (options[i]) {
                        options[i].classList.add(styles.disabledOptions)
                    }
                }
            }
        }
    }

    const removeStyles = () => {
        let options: HTMLCollectionOf<Element> = document.getElementsByClassName(styles.word);
        if (options) {
            for (let i = 0; i < options.length; i++) {
                options[i].classList.remove(styles.rightAnswer);
                options[i].classList.remove(styles.wrongAnswer);
                options[i].classList.remove(styles.disabledOptions);
            }
        }
    }

    console.log(wordIndex, 'index quiz')

    return (
        <div className={styles.wrapper}>
            <div className={styles.translation}>{wordIndex < words.length && words[wordIndex].translation}</div>

            <div className={styles.answerOptions}>
                {answerOptions.length > 0 && wordIndex < words.length
                    ? answerOptions.map((option, index) => (
                        <button className={styles.word} onClick={() => answerChecking(option, words[wordIndex])} key={index} id={option.word}>{option.word}</button>
                    ))
                    : <></>
                }
            </div>

            <button className={styles.navButton} onClick={() => [setWordIndex(wordIndex => wordIndex + 1), removeStyles()]}>Next</button>
        </div>
    )
}

export default WordQuiz;