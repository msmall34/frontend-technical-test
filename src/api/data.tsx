export async function loadUsers() {
  const res = await fetch(`http://localhost:3005/users`);
  const users = await res.json()
  return users
}
  
export async function loadConversationsByUserId(userId) {
  const res = await fetch(`http://localhost:3005/conversations/${userId}`);
  const conversations = await res.json()
  return conversations
}

export async function getAllConsersations() {
  const allConsersations = [];
  const users = await loadUsers()
  for(const user of users){
      const conversation = await loadConversationsByUserId(user.id)
      allConsersations.push(...conversation)
  }
  const ids = allConsersations.map(convo => convo.id)
  const filteredConversations = allConsersations.filter(({id}, index) => !ids.includes(id, index + 1))
  return filteredConversations
}

export async function getMessagesByConversationId(conversationId) {
  const res = await fetch(`http://localhost:3005/messages/${conversationId}`);
  const messages = await res.json()
  return messages
}

export async function addNewConversation(conversationId) {
  const res = await fetch(`http://localhost:3005/messages/${conversationId}`);
  const messages = await res.json()
  return messages
}