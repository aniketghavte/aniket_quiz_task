import styles from "./main.module.css"

export default function Home() {
  return (
    <div className={styles.app_home}>
        <div className={styles.app_home_container}>
          <div className={styles.home_intro_block}>
            <h1>
              Aniket&apos;s quiz app task
            </h1>
          </div>
          <div className={styles.home_login_block}>
            <h1>
              Create a Dummy User
            </h1>
          </div>
        </div>
    </div>
  );
}
