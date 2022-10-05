import React, { FC, useEffect, useState } from 'react'
import { getMessagesByConversationId } from '../api/data'
import styles from '../styles/ConversationDetailed.module.css'


interface Props {
    conversationId: number
}

export const ConversationDetailed: FC<Props> = ({conversationId}) => {
    const [messages, setMessages] = useState([])

    const getMessages = async () => {
        const messages = await getMessagesByConversationId(conversationId)
        setMessages(messages) 
      }

    useEffect(() => {
        getMessages()
      }, [conversationId])

    const renderMessages = () => {
        if (!messages || !messages.length) {
            return <div>Aucun message trouvé</div>
        }

        return <React.Fragment>
        {messages.map((message, index) => <div >
            {message &&
            <div className={styles.messages}>
                 <div className={(index % 2 == 0 && messages.length > 1) ? styles.message_left : styles.message_right}>
                    {message.body}
                </div> 
            </div>
            }
        </div>)}

    </React.Fragment>
    }

    return (
        renderMessages()
    )
}
  