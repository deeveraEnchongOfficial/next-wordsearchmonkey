import styles from "@/components/Loader/loader.module.css";
const Loader: React.FC = () => {
    return (
        <section className={styles.container}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </section>
    );
}

export default Loader;
