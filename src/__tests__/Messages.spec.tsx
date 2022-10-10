import * as React from 'react'
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import * as api from "../lib/api";
//import ConversationDetailed from '../components/ConversationDetailed'


const mockedMessages = [
  {
      "id": 1,
      "conversationId": 1,
      "timestamp": 1625637849,
      "authorId": 1,
      "body": "Bonjour c'est le premier message de la première conversation"
  },
  {
      "id": 2,
      "conversationId": 1,
      "timestamp": 1625637867,
      "authorId": 1,
      "body": "Bonjour c'est le second message de la première conversation"
  },
  {
      "id": 3,
      "conversationId": 1,
      "timestamp": 1625648667,
      "authorId": 2,
      "body": "Bonjour c'est le troisième message de la première conversation"
  }
]

const mockMessagesByConversationId = jest.spyOn(api, 'getMessagesByConversationId');
mockMessagesByConversationId.mockResolvedValue(mockedMessages);


describe('Get message by conversationId', () => {
  it("Should load all messages by user", async () => {
    const conversationId = 1
    api.getMessagesByConversationId(conversationId)
    expect(mockMessagesByConversationId).toHaveBeenCalledTimes(1);
    expect(mockMessagesByConversationId).toHaveBeenCalledWith(conversationId)
    expect(mockMessagesByConversationId).toHaveLength;
    
  })
})


/*describe('Display messages', () => {
  it("show at least one message", async () => {
    render(<ConversationDetailed />)
    const messageContainer = screen.getByRole('message')
    await waitFor(() => {
      expect(messageContainer).toBeInTheDocument()
    })
  })
})*/
