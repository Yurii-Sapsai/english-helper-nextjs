'use client'
import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import styles from './styles.module.css';


interface IChooseLevelProps {
    setLevel: Dispatch<SetStateAction<string>>
}

const ChooseLevel = ({ setLevel }: IChooseLevelProps) => {

    const handleLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLevel(e.target.value);
    };

    return (
        <div onChange={handleLevelChange} className={styles.wrapper}>

            <p className={styles.subtitle}>Choose the lvl</p>

            <div>
                <input type="radio" id="intermediate_2" name="lvl" value="Intermediate 2" />
                <label htmlFor="intermediate_2">Intermediate 2</label>
            </div>

            <div>
                <input type="radio" id="upper_intermediate" name="lvl" value="Upper-Intermediate" />
                <label htmlFor="upper_intermediate">Upper-Intermediate</label>
            </div>

            <div>
                <input type="radio" id="all" name="lvl" value="All" />
                <label htmlFor="all">All</label>
            </div>
        </div>
    )
}

export default ChooseLevel;