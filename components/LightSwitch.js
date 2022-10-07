import styles from '../styles/components/LightSwitch.module.css';

function LightSwitch() {
  return (
    <div>
      <input type="checkbox" id={styles.checkbox} />
      <label className={styles.label} htmlFor={styles.checkbox}>
        <span className={styles.span}></span>
      </label>
      <div className={styles.background}></div>
    </div>
  );
}

export default LightSwitch;
