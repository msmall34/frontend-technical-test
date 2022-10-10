import * as React from 'react'
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import * as api from "../lib/api";
import Conversations from '../pages/conversations'


const mockedConversations = [
  {
      "id": 1,
      "recipientId": 2,
      "recipientNickname": "Jeremie",
      "senderId": 1,
      "senderNickname": "Thibaut",
      "lastMessageTimestamp": 1625637849
  },
  {
      "id": 2,
      "recipientId": 3,
      "recipientNickname": "Patrick",
      "senderId": 1,
      "senderNickname": "Thibaut",
      "lastMessageTimestamp": 1620284667
  },
  {
      "id": 3,
      "recipientId": 1,
      "recipientNickname": "Thibaut",
      "senderId": 4,
      "senderNickname": "Elodie",
      "lastMessageTimestamp": 1625648667
  },
  {
      "recipientId": 1,
      "recipientNickname": "Thibaut",
      "senderId": 5,
      "senderNickname": "Muriel",
      "lastMessageTimestamp": 1665103692742,
      "id": 6
  },
  {
      "recipientId": 1,
      "recipientNickname": "Thibaut",
      "senderId": 5,
      "senderNickname": "Muriel",
      "lastMessageTimestamp": 1665106078717,
      "id": 10
  },
  {
      "recipientId": 1,
      "recipientNickname": "Thibaut",
      "senderId": 5,
      "senderNickname": "Muriel",
      "lastMessageTimestamp": 1665272478941,
      "id": 14
  }
]

const mockConversationsByUserId = jest.spyOn(api, 'loadConversationsByUserId');
mockConversationsByUserId.mockResolvedValue(mockedConversations);


describe('Loading Conversations', () => {
  it("Should load all conversations", async () => {
    const userId = 1
    api.loadConversationsByUserId(userId)
    expect(mockConversationsByUserId).toHaveBeenCalledTimes(1);
    expect(mockConversationsByUserId).toHaveBeenCalledWith(userId)
    expect(mockedConversations).toHaveLength;
    
  })
})


describe("Display Conversations", () => {
  it("Should return all conversations", async () => {
    render(<Conversations />)
    await waitFor(() => {
      expect(screen.getByText(/List of all conversations/)).toBeInTheDocument()
    })
  })
})


/*describe("Display message on click", () => {
  it("Should expand messages collapse", async () => {
    render(<Conversations />)
    fireEvent.click(screen.getByTestId('message-button-1'))
    const messageContainer = await screen.findByRole('message')
    await waitFor(() => {
      expect(messageContainer).toBeInTheDocument()
    })
  })
})*/