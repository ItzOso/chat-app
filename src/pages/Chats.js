import React, { useEffect, useRef } from 'react'
import Messages from '../components/Messages'
import SendMessage from '../components/SendMessage'

function Chats() {
  const scroll = useRef()
  return (
      <div>
          <Messages scroll={scroll}/>
          <SendMessage />
      </div>
  );
}

export default Chats