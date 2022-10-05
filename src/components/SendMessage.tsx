import React, { FC, useEffect, useState } from 'react'
import styles from '../styles/SendMessage.module.css'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



interface Props {
    conversationId: number
}

export const SendMessage: FC<Props> = ({conversationId}) => {
  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      conversationId: conversationId,
      body: event.target.message.value,
      timestamp: 0
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = `http://localhost:3005/messages/${conversationId}`

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)

    const result = await response.json()
    console.log('result', result)
  }

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.input_container}>
                <input type="text" id="message" name="message" placeholder='Send message' required />
                <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
        </form>
      )
}

  