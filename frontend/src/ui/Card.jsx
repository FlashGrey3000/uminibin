import styles from './Card.module.css';

function Card({title, subtitle, value}) {
    
    return (
        <div className={styles.outer}>
            <h1 className={styles.title}>{title}</h1>
            <i className={styles.subtitle}>{subtitle}</i>
            <p className={styles.value}>{value}</p>
        </div>
    );
}

export default Card