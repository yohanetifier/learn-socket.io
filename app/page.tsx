'use client'
import { useRef, useState } from "react";
import styles from "./page.module.css";
import { io } from 'socket.io-client'
interface Message {
  content: string
}

export default function Home() {
  const socket = io('http://localhost:3001')
  socket.on('connect', () => {
    console.log(`connect with ${socket.id}`)
  } )
  const [messages, setMessages] = useState<Message[]>([])
  const messageRef = useRef<HTMLInputElement>(null)
  const handleSubmit= (e:any) => {
    e.preventDefault()
   const newMessages = [...messages,{content: messageRef.current!.value}] 
   setMessages(newMessages)
  socket.emit('send-message', messageRef.current!.value)
  }

  // socket.on('connect', () => {
  //  setMessages([...messages, { content: `connect with ${socket.id}` }])
  // })

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.textArea}>
          {messages.map(({content}, index) => (
            <p className={styles.message} key={index} >{content}</p>
          ))}
        </div>
      </div>
      <div className={styles.formWrapper} >
        <form className={styles.form}  action="">
          <label htmlFor="message-input">Message</label>
          <input ref={messageRef} type="text" id="message-input"/>
          <button type="submit" id="send-button" onClick={handleSubmit} >Send</button>
          <label htmlFor="room-input">Room</label>
          <input type="text" id="room-input"/>
          <button id="room-button" >Join</button>
      </form>

      </div>
          </main>
  );
}
