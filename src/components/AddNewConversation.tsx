import React, { FC, useEffect, useState } from 'react'
import styles from '../styles/AddNewConversation.module.css'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Collapse } from 'reactstrap'
import { loadUsers } from '../api/data'

interface Props {
    userId: number
}

export const AddNewConversation: FC<Props> = ({userId}) => {
    const [open, setOpen] = useState(false)
    const [userOptions, setUserOptions] = useState([])
    const [userSelected, setUserSelected] = useState("")

    useEffect(() => {
        getOptions()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const users = await loadUsers()
        const retrieveRecipient = users.filter(user => user.nickname === userSelected)
        const recipientIdToSend = retrieveRecipient[0].id

        const data = {
            recipientId: recipientIdToSend,
            recipientNickname: userSelected,
            senderId: userId,
            senderNickname: event.target.firstname.value,
            lastMessageTimestamp : Date.now()
        }

        const JSONdata = JSON.stringify(data)

        const endpoint = `http://localhost:3005/conversations/${userId}`

        const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()
    }

    const handleSelect = event => {
        setUserSelected(event.currentTarget.value)
    };

    const toggle = () => {
        setOpen(!open)
    }

    const getOptions = async () => {
        const users = await loadUsers()
        const options: string[] = [];
        for(const user of users){
            options.push(user.nickname)
        }

        setUserOptions(options)
    }

  return (
        <React.Fragment>
            <Button onClick={toggle}>Start a new conversation <FontAwesomeIcon icon={faPlusSquare} /></Button>
            <Collapse isOpen={open}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input_container}>
                        <label htmlFor="listOfUsers" className='label'>Select the user you wish to talk to :</label>
                        <select id="listOfUsers"
                                value={userSelected}
                                onChange={handleSelect}>
                            {userOptions && userOptions.map(userOption =><option>{userOption ? userOption : ""}</option>)}
                        </select>
                    </div>
                    <div className={styles.input_container}>
                        <label htmlFor="firstname" className="visually-hidden">Your firstname</label>
                        <input type="text" id="firstname" name="firstname" placeholder='Your firstname' required />
                    </div>
                    <div className={styles.input_container}>
                        <input type="text" id="message" name="message" placeholder='Send your message' required />
                        <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
                    </div>
                </form>
            </Collapse>
            
        </React.Fragment>
      
    )
}