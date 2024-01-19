import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import BackspaceIcon from '@/assets/backspace.webp';
import MarkIcon from '@/assets/mark.webp';
import CrossIcon from '@/assets/cross.webp';



interface IWordPuzzleProps {
    words: Array<any>,
    setWordPuzzle: Dispatch<SetStateAction<string>>
}



const WordPuzzle = ({ words, setWordPuzzle }: IWordPuzzleProps) => {

    const [wordIndex, setWordIndex] = useState<number>(0);
    const [wordInArray, setWordInArray] = useState<Array<any>>([]);
    const [printWord, setPrintWord] = useState<string>('');
    const [checkWord, setCheckWord] = useState<string>('');


    useEffect(() => {
        wordIndex === words.length && setWordPuzzle('finished');

        wordIndex < words.length && setWordInArray([...words[wordIndex].word].sort(getRandomNumber));
    }, [wordIndex]);


    const getRandomNumber = () => Math.random() - 0.5;

    const createPrintWord = (letter: string) => {
        setPrintWord(printWord + letter)
    }

    const removeLastLetter = (answer: string) => {
        if (answer.length > 0) {
            let word = answer
            word = word.split('').slice(0, -1).join('');
            setPrintWord(word)
        }
    };

    const checkingWord = () => {
        if (printWord === words[wordIndex].word) {
            setCheckWord('right')

        } else {
            setCheckWord('wrong')
        }
    }

    return (
        <>
            {wordIndex < words.length &&

                <div className={styles.wrapper}>

                    <div className={styles.translate}>{words[wordIndex].translation}</div>

                    <div className={styles.printWord}>
                        {printWord}
                        <Image src={BackspaceIcon} className={styles.backSpaceIcon} alt='' onClick={() => removeLastLetter(printWord)} />
                    </div>

                    <div className={styles.letterContainer}>
                        {wordInArray && wordInArray.map((letter: string, index: number) => (
                            <button key={index} className={styles.letter} onClick={() => createPrintWord(letter)} disabled={checkWord ? true : false}> {letter}</button>
                        ))
                        }
                    </div>

                    <div className={styles.checkContainer}>
                        {checkWord === '' && <button onClick={() => checkingWord()} disabled={printWord.length < words[wordIndex].word.length} className={styles.checkButton}>Check</button>}
                        <Image src={MarkIcon} style={checkWord === 'right' ? { display: 'block' } : { display: 'none' }} alt='' className={styles.checkIcon} />
                        <Image src={CrossIcon} style={checkWord === 'wrong' ? { display: 'block' } : { display: 'none' }} alt='' className={styles.checkIcon} />
                        {checkWord && words[wordIndex].word}
                    </div>

                    <button className={styles.navButton} disabled={!checkWord} onClick={() => [setWordIndex(wordIndex => wordIndex + 1), setPrintWord(''), setCheckWord('')]}>Next</button>
                </div>
            }
        </>
    )
}

export default WordPuzzle;