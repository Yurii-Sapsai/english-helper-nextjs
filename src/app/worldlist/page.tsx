import styles from './styles.module.css';
import WordList from '@/containers/WordList/WordList';





const WordListPage = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                <h1>World List</h1>

                <WordList />
            </div>
        </div>
    )
}

export default WordListPage;