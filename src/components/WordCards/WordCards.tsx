'use client'
import { useState, useEffect } from 'react';
import styles from './styles.module.css';



interface IWordCardsProps {
    words: Array<any>,
    setWordCards: any
}



const WordCards = ({ words, setWordCards }: IWordCardsProps) => {

    const [wordIndex, setWordIndex] = useState<number>(0);

    useEffect(() => {
        wordIndex === words.length - 1 && setWordCards('finished');
    }, [wordIndex]);

    return (
        <div className={styles.wrapper}>

            {words.length > 0
                ? <div className={styles.wordCard}>
                    <div className={styles.type}>{words[wordIndex].type}</div>
                    <div className={styles.word}>{words[wordIndex].word}</div>
                    <div className={styles.translation}>{words[wordIndex].translation}</div>
                </div>
                : <></>
            }

            <button className={styles.navButton} onClick={() => setWordIndex(wordIndex + 1)}>Next</button>
        </div>
    )
}

export default WordCards;