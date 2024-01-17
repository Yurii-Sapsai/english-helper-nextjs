'use client'
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styles from './styles.module.css';



interface IWordCardsProps {
    words: Array<any>,
    setWordCards: Dispatch<SetStateAction<string>>
}



const WordCards = ({ words, setWordCards }: IWordCardsProps) => {

    const [wordIndex, setWordIndex] = useState<number>(0);

    useEffect(() => {
        wordIndex === words.length && setWordCards('finished');
    }, [wordIndex]);

    console.log(wordIndex, 'Idx', words.length, 'lenght');

    return (
        <div className={styles.wrapper}>

            {
                words.length > 0 && wordIndex < words.length
                    ? <div className={styles.wordCard}>
                        <div className={styles.word}>{words[wordIndex].word}</div>
                        <div className={styles.translation}>{words[wordIndex].translation}</div>
                    </div>
                    : <></>
            }

            <button className={styles.navButton} onClick={() => setWordIndex(wordIndex => wordIndex + 1)}>Next</button>
        </div>
    )
}

export default WordCards;