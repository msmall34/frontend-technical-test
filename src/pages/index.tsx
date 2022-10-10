import type { FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Logo from '../assets/lbc-logo.webp'

const Home: FC = () => {
  const year = new Date().getFullYear()

  return (
    
      <div className={styles.container}>
          <Head>
            <title>Frontend Technical test - Leboncoin</title>
            <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr"></meta>
          </Head>

          <main className={styles.main}>
          <Image className={styles.image} src={Logo} alt="Leboncoin Frontend Team" width={400} height={125} layout="fixed" />
            <h1 className={styles.title}>
              Welcome !
            </h1>
            
            <Link href="/users">
              <section className={styles.grid}>
                <article className={styles.card}>
                  <h2>Enter</h2>
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