import React, { FC, useEffect, useState } from 'react'
import { getMessagesByConversationId } from '../lib/api'
import styles from '../styles/ConversationDetailed.module.css'

interface Props {
    conversationId: number
    refreshedMessages
}

export const ConversationDetailed: FC<Props> = ({conversationId, refreshedMessages}) => {
    const [messages, setMessages] = useState([])

    const getMessages = async () => {
        const messages = await getMessagesByConversationId(conversationId)
        setMessages(messages) 
      }

    useEffect(() => {
        getMessages()
      }, [conversationId, refreshedMessages])

    const renderMessages = () => {
        if (!messages || !messages.length) {
            return <div>Aucun message trouvé</div>
        }

        return <React.Fragment>
        {messages.map((message, index) => <div >
            {message &&
            <div className={styles.messages}>
                 <div role="message" className={(index % 2 == 0 && messages.length > 1) ? styles.message_left : styles.message_right}>
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