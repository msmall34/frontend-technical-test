export async function loadUsers() {
  try{
    const res = await fetch(`http://localhost:3005/users`);
    const users = await res.json()
    return users
  } catch (e) {
    return null
  }
}
  
export async function loadConversationsByUserId(userId) {
  try{
    const res = await fetch(`http://localhost:3005/conversations/${userId}`);
      const conversations = await res.json()
    return conversations
  } catch (e) {
    return null
  }
}

export async function addNewConversation(JSONdata, userId) {
  try{
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
      return result
  } catch (e) {
    return null
  }
}

export async function getMessagesByConversationId(conversationId) {
  try{
    const res = await fetch(`http://localhost:3005/messages/${conversationId}`);
    const messages = await res.json()
    return messages
  } catch (e) {
    return null
  }
}

export async function addNewMessage(JSONdata, conversationId) {
  try{
      const endpoint = `http://localhost:3005/messages/${conversationId}`

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }
      await fetch(endpoint, options)
  } catch (e) {
    return null
  }
}

export async function deleteMessageById(messageId) {
  try{
    const endpoint = `http://localhost:3005/message/${messageId}`
    const options = {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      }
    }
    await fetch(endpoint, options)
  } catch (e) {
    return null
  }
}