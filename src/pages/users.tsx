import React, { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { loadUsers } from '../lib/api';
import styles from '../styles/Users.module.css'
import 'bootstrap/dist/css/bootstrap.css';

const Users = () => {
  const year = new Date().getFullYear()
  const [users, setUsers] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const users = await loadUsers()
    setUsers(users)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>List of all users</title>
        <meta name="description" content="List of all the conversations"></meta>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          List of all users
        </h1>

        <section className={styles.grid}>
       
            {users ? <article className={styles.users}>
                {users && users.map((user, index) => 
                    <Link href={{
                        pathname: '/conversations',
                        query: { userId: user.id },
                      }}>
                    <div className={styles.card} >
                        <div>
                            <span className={styles.user}>{user.nickname ? user.nickname : ""}</span> 
                        </div>
                        <div>Token :  
                            <span className={styles.token}>{user.token ? user.token : ""}</span> 
                        </div>
                    </div>
                        
                    </Link>)}
            </article> :
            <React.Fragment/>
            }
        </section>
      </main>

      <footer className={styles.footer}>
        &copy; Muriel - {year}
      </footer>
    </div>
  )
}


export default Users