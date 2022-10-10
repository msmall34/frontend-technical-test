import React, { FC, useEffect, useState } from 'react'
import styles from '../styles/AddNewMessage.module.css'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addNewMessage } from '../lib/api'

interface Props {
    conversationId: number
    userId: number
    refreshMessages: (refreshMessages) => void
}

export const AddNewMessage: FC<Props> = ({conversationId, userId, refreshMessages}) => {

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      conversationId: conversationId,
      authorId: userId,
      body: event.target.message.value,
      timestamp: Date.now()
    }

    const JSONdata = JSON.stringify(data)
    const newMessage = await addNewMessage(JSONdata, conversationId)
    refreshMessages(newMessage)
  }

  return (
      <form onSubmit={handleSubmit}>
          <div className={styles.input_container}>
              <label htmlFor="message" className="visually-hidden">Send message</label>
              <input type="text" id="message" name="message" placeholder='Send message' required />
              <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
          </div>
      </form>
    )
}