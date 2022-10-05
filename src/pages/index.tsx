import type { FC } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Home: FC = () => {
  const year = new Date().getFullYear()

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr"></meta>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome !
        </h1>
        
        <Link href="/conversations">
          <section className={styles.grid}>
            <article className={styles.card}>
              <h2>See all conversations</h2>
            </article>
          </section>
        </Link>
      </main>

      <footer className={styles.footer}>
        &copy; Muriel - {year}
      </footer>
    </div>
  )
}

export default Home