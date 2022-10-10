import React, { FC, useEffect, useState } from 'react'
import styles from '../styles/AddNewConversation.module.css'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Collapse } from 'reactstrap'
import { addNewConversation, addNewMessage, loadUsers } from '../lib/api'
import { User } from '../types/user';
import { Conversation } from '../types/conversation'


interface Props {
    userId: number
    refreshConversations: (conversations: Conversation[]) => void
    refreshMessages: (refreshMessages) => void
}

export const AddNewConversation: FC<Props> = ({userId, refreshConversations, refreshMessages}) => {
    const [open, setOpen] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const users: User[] = await loadUsers()
        const retrieveRecipient = users.filter(user => user.id === userId)
        const recipientNickname = retrieveRecipient[0].nickname
        
        const conversationData = {
            recipientId: userId,
            recipientNickname: recipientNickname,
            senderId: users.length + 1,
            senderNickname: event.target.firstname.value,
            lastMessageTimestamp: Date.now()
        }
        const convoJSONdata = JSON.stringify(conversationData)        
        const newConversation = await addNewConversation(convoJSONdata, userId)
        refreshConversations(newConversation)
        
        if(event.target.message.value) {
            const messageData = {
                conversationId: userId,
                authorId: users.length + 1,
                body: event.target.message.value,
                timestamp: Date.now()
            }
            const messageJSONdata = JSON.stringify(messageData)
            const newMessage = await addNewMessage(messageJSONdata, newConversation.id)
            refreshMessages(newMessage)
        }
        
    }

    const toggle = () => {
        setOpen(!open)
    }

  return (
        <React.Fragment>
            <Button onClick={toggle}>Start a new conversation <FontAwesomeIcon icon={faPlusSquare} /></Button>
            <Collapse isOpen={open}>
                <form onSubmit={handleSubmit}>
                    
                    <div className={styles.input_container}>
                        <label htmlFor="firstname" className="visually-hidden">Your firstname</label>
                        <input type="text" id="firstname" name="firstname" placeholder='Your firstname' required />
                    </div>
                    <div className={styles.input_container}>
                        <label htmlFor="message" className="visually-hidden">Send your message</label>
                        <input type="text" id="message" name="message" placeholder='Send your message' required />
                        <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
                    </div>
                </form>
            </Collapse>
            
        </React.Fragment>
      
    )
}