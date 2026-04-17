import styles from './Button.module.css'

function Button({ value, onClick }) {

    return (
        <button className={styles.button} onClick={onClick} >{value}</button>
    );
}

export default Button