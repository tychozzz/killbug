import request from '../util/request';

interface MessageForm {
  // senderId: string,
  receiverId: string,
  content: string
  type: number
}

export const getChatList = (type: number, token: string='') => {
  return request.get(`/chat/getChatList/${type}`, {headers: {Authorization: token}})
}

export const getChatRecords = (userId: string, type: number) => {
  return request.get(`/chat/getChatRecords/${userId}/${type}`)
}

export const sendMessage = (data: MessageForm) => {
  return request.post('/chat/sendMessage', data)
}

export const createChat = (userId: string, type: number) => {
  return request.post(`/chat/createChat/${userId}/${type}`)
}