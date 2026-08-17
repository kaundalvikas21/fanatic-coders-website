import styles from './AuthCodeProductMotion.module.css';

export function AuthCodeProductMotion() {
  return (
    <div
      className={styles.root}
      aria-hidden="true"
    >
      <div className={styles.codeLines}>
        <span>const project = await</span>
        <span>build(request)</span>
        <span>status: &quot;active&quot;</span>
        <span>deploy(delivery)</span>
      </div>

      <span className={styles.signal} />

      <div className={styles.productWindow}>
        <div className={styles.titlebar} />
        <div className={styles.accent} />
        <div className={styles.line} />
        <div className={styles.cards}>
          <i />
          <i />
        </div>
        <span className={styles.status}>Ready</span>
      </div>
    </div>
  );
}
