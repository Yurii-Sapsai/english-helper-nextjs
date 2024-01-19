import React from 'react'
import styles from './styles.module.css'
import Image from 'next/image';
import DoneIcon from '@/assets/done.webp'



const WordListCompleted = () => {

    return (

        <div className={styles.wrapper}>
            <Image src={DoneIcon} alt='' />
            Completed!
            <button className={styles.buttonRestart} onClick={() => location.reload()}>Restart</button>
        </div>
    )
}

export default WordListCompleted;