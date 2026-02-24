import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <>
      <nav className={styles.Navbar}>ポケモン図鑑</nav>
      <div className={styles.Navbar__hero}>
        <h2>PokéAPIからデータを取得し、ページネーション実装したSPA</h2>
        <div className={styles.Navbar__heroTechStack}>
          <span>React</span>
          <span>TypeScript</span>
          <span>REST API</span>
          <span>Async/Await</span>
        </div>
      </div>
    </>
  )
}

export default Navbar