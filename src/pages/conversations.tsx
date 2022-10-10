import React, { FC, useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { deleteMessageById, loadConversationsByUserId } from '../lib/api';
import { Conversation } from '../types/conversation';
import { Message } from '../types/message';
import { ConversationDetailed } from '../components/ConversationDetailed'
import { AddNewConversation } from '../components/AddNewConversation';
import { AddNewMessage } from '../components/AddNewMessage'
import {  Collapse } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Conversations.module.css'
import 'bootstrap/dist/css/bootstrap.css';


const Conversations = (props) => {
  const year = new Date().getFullYear()
  const [activeIndex, setActiveIndex] = useState()
  const [users, setUsers] = useState([])
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const [userId, setUserId] = useState("")

  const router = useRouter()
  const memoizedFilterConversations = useMemo(() => (conversations) => filterConversations(conversations), [conversations]);


  useEffect(() => {
    if (router?.isReady) {
      console.log(router.query.userId);
      // this will set the state before component is mounted
      setUserId(router.query.userId as string)
    }
  }, [router?.isReady]);

  useEffect(() => {
    loadData()
  }, [userId])

  const toggle = (index) => {
    setActiveIndex(index)
  }

  const loadData = async () => {
    const conversations: Conversation[] = await loadConversationsByUserId(userId)
    const filteredConversations : Conversation[] = memoizedFilterConversations(conversations)
    setConversations(filteredConversations)
  }

  const filterConversations = (conversations) => {
    let distinct: number[] = [];
    let filteredConversations: Conversation[] = [];
    if(conversations && conversations.length > 0) {
      distinct = Array.from(new Set(conversations?.map(conversation => conversation?.senderId)))
      filteredConversations = distinct.map(senderId => {
        return {
          id: conversations.find(x => x.senderId === senderId)?.id,
          recipientId: conversations.find(x => x.senderId === senderId)?.recipientId,
          recipientNickname: conversations.find(x => x.senderId === senderId)?.recipientNickname,
          senderId: conversations.find(x => x.senderId === senderId)?.senderId,
          senderNickname: conversations.find(x => x.senderId === senderId)?.senderNickname,
          lastMessageTimestamp: conversations.find(x => x.senderId === senderId)?.lastMessageTimestamp
        }
      })
    }
    return filteredConversations?.sort((a, b) => a.id - b.id)
  }

  const refreshConversations = (newConvos) => {
    const filteredConversations: Conversation[] = memoizedFilterConversations(newConvos)
    setConversations(filteredConversations)
  }

  const refreshMessages = (newMessages) => {
    const sortedMessages: Message[] = newMessages?.length > 0  ? newMessages?.sort((a, b) => a.id - b.id) : []
    setMessages(sortedMessages)
  }

  return (
    <div className={styles.container} data-testid="conversations">
      <Head>
        <title>List of all Conversations</title>
        <meta name="description" content="List of all the conversations"></meta>
      </Head>

      {conversations && conversations.length > 0 ?
        <main className={styles.main}>

          <header className={styles.header}>

            <button className={styles.back_btn} type="button" onClick={() => router.back()}>
              <FontAwesomeIcon icon={faArrowLeft} /> <span> Go back</span>   
            </button>
            <h1 className={styles.title}>List of all conversations</h1>
          </header>
          
          <section className={styles.grid}>
            {conversations && conversations.map((conversation, index) => 
              <article className={styles.card} key={index}>

                  <header className={styles.conversation_synthetic} data-testid={`message-button-${index}`} onClick={() => toggle(index)}>
                    <div>
                      <span className={styles.user}>{conversation.senderNickname ? conversation.senderNickname : ""}</span> - 
                      <span className={styles.user}>{conversation.recipientNickname }</span>
                    </div>
                    <div>Last message today at :  
                      <span className={styles.time}>{conversation.lastMessageTimestamp ? new Date(conversation.lastMessageTimestamp * 1000).toLocaleTimeString() : ""}</span> 
                    </div>
                  </header>

                  {conversation.id &&
                    <Collapse isOpen={activeIndex === index}>
                      <section className={styles.conversation_detailed} aria-expanded={activeIndex === index}>
                          <React.Fragment>

                              <ConversationDetailed conversationId={conversation.id} 
                                refreshedMessages={messages}/>

                              <AddNewMessage conversationId={conversation.id} 
                                userId={users.length + 1}
                                refreshMessages={refreshMessages}/>

                          </React.Fragment>
                      </section>
                    </Collapse>
                  }

              </article>
            )}

            <article className={styles.card}>
              <AddNewConversation userId={parseInt(userId)} 
                refreshConversations={refreshConversations}
                refreshMessages={refreshMessages}/>

              {/*<Button onClick={() => deleteMessageById(7)}>Delete message</Button>*/}
            </article>
            
          </section>
          
        </main> : 
        <main className={styles.main}>
          <article className={styles.noFound}>
            <button className={styles.back_btn} type="button" onClick={() => router.back()}>
              <FontAwesomeIcon icon={faArrowLeft} /> <span> Go back</span>   
            </button>
            No conversation found...
          </article>
          </main>
        }

      <footer className={styles.footer}>
        &copy; Muriel - {year}
      </footer>
    </div>
  )
}

export default Conversations