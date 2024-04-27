import React from 'react'
import './Chat.css'
import YouTube from 'react-youtube'

function Chat() {

  const opts = {
    height: '315',
    width: '560',
  }
  return (
    <div className="chat">
        <h4>Chat</h4>
        <YouTube videoId='JnBXNTfQbDo' opts={opts} />
    </div>
  )
}

export default Chat