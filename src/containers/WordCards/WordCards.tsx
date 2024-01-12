'use client'
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { wordList } from '@/data/wordList';



const WordCards = () => {

    const [cards, setCards] = useState<Array<any>>([]);
    const [wordIndex, setWordIndex] = useState<number>(0);

    useEffect(() => {
        getWords();
    }, []);

    const getRandomIndex = (arrayLength: number) => {
        return Math.floor(Math.random() * arrayLength);
    };

    const getWords = () => {

        const copyWordList = [...wordList]
        const randomCards: any[] = [];

        for (let i = 0; i < 10; i++) {

            const randomIndex = getRandomIndex(copyWordList.length);
            const randomWord = copyWordList[randomIndex];

            randomCards.push(randomWord);

            copyWordList.splice(randomIndex, 1);
        }

        setCards(randomCards);
    }
    console.log(cards)

    return (
        <div className={styles.wrapper}>
            {cards.length > 0 && wordIndex < 10
                ? <div>
                    <div>{cards[wordIndex].word}</div>
                    <div>{cards[wordIndex].translation}</div>
                    <div>{cards[wordIndex].type}</div>
                </div>
                : <></>
            }
            <button onClick={() => wordIndex < 10 && setWordIndex(wordIndex + 1)}>Next</button>
        </div>
    )
}

export default WordCards;