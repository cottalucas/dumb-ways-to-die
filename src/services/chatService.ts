import {
  collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, Timestamp,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export interface ChatMessage {
  id?: string
  sender: 'ai' | 'user'
  text: string
  timestamp: Date
}

export function subscribeToMessages(
  userId: string,
  callback: (messages: ChatMessage[]) => void,
): () => void {
  const q = query(
    collection(db, 'users', userId, 'chatMessages'),
    orderBy('timestamp', 'asc'),
  )
  return onSnapshot(q, snap => {
    const msgs: ChatMessage[] = snap.docs.map(d => {
      const data = d.data()
      return {
        id: d.id,
        sender: data.sender,
        text: data.text,
        timestamp: (data.timestamp as Timestamp)?.toDate() ?? new Date(),
      }
    })
    callback(msgs)
  })
}

export async function addMessage(
  userId: string,
  message: Omit<ChatMessage, 'id' | 'timestamp'>,
): Promise<void> {
  await addDoc(collection(db, 'users', userId, 'chatMessages'), {
    ...message,
    timestamp: serverTimestamp(),
  })
}
