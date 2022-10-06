import React, { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles/Conversations.module.css'
import { ConversationDetailed } from '../components/ConversationDetailed'
import { Collapse } from 'reactstrap'
import { SendMessage } from '../components/SendMessage'
import { getAllConsersations, loadUsers } from '../api/data';
import { Conversation } from '../types/conversation';
import { User } from '../types/user';
import { AddNewConversation } from '../components/AddNewConversation';


interface Props {
  conversations: Conversation[]
  users: User[]
}

const Conversations: FC = (props: Props) => {
  const year = new Date().getFullYear()
  const {users, conversations} = props
  const [activeIndex, setActiveIndex] = useState()

  const toggle = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>List of all Conversations</title>
        <meta name="description" content="List of all the conversations"></meta>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          List of all conversations
        </h1>

        <section className={styles.grid}>
          {conversations && conversations.map((conversation, index) => 
          <article className={styles.card}>

            <div className={styles.conversation}>
              <header className={styles.conversation_synthetic} onClick={() => toggle(index)}>
                <div>
                  <span className={styles.user}>{conversation.senderNickname ? conversation.senderNickname : ""}</span> - 
                  <span className={styles.user}>{conversation.recipientNickname ? conversation.recipientNickname : ""}</span>
                </div>
                <div>Last message today at :  
                  <span className={styles.time}>{conversation.lastMessageTimestamp ? new Date(conversation.lastMessageTimestamp * 1000).toLocaleTimeString() : ""}</span> 
                </div>
              </header>

              {conversation.id &&
              <Collapse isOpen={activeIndex === index}>
                <section className={styles.conversation_detailed}>
                    <React.Fragment>
                        <ConversationDetailed conversationId={conversation.id} />
                        <SendMessage conversationId={conversation.id} />
                    </React.Fragment>
                </section>
              </Collapse>
              }
            </div>
            
            
          </article>
          )}

          <article className={styles.card}>
              <AddNewConversation userId={users.length + 1}/>
          </article>
          
        </section>
      </main>

      <footer className={styles.footer}>
        &copy; Muriel - {year}
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const users = await loadUsers()
  const conversations = await getAllConsersations()
  return { props: { users, conversations } }
}

export default Conversations