import React, { useState } from 'react'
import './Chat.css'
import YouTube from 'react-youtube'
import YoutubeService from '../services/YoutubeService'

function Chat() {
  const [videos, setVideos] = useState([]);
  const [videoId, setVideoId] = useState("");
  const [curVideoId, setCurVideoId] = useState("");

  const loadVideo = (e) => {
    e.preventDefault();
    setCurVideoId(videoId);
  }

  async function findVideos() {
    try{
        const res = await YoutubeService.searchVideo('drae');

        const items = res.data.items;
        setVideos(
            items.map((curItem) => ({
                id: curItem.id.videoId,
                title: curItem.snippet.title,
            }))
        );
    } catch (error) {
        alert(error.message);
    }
  }
  const opts = {
    height: '315',
    width: '560',
  }
  return (
    <div className="chat">
        <h4>Chat</h4>
        {/* <button onClick={findVideos}>Do The Search</button> */}
        { curVideoId && <YouTube videoId={curVideoId} opts={opts} /> }
        <form>
            <input value={videoId} onChange={e => setVideoId(e.target.value)} placeholder='Video Id' type='text' />
            <button type='submit' onClick={loadVideo}>Load Video</button>
        </form>

        {videos.map(({ id, title }) => (
            <YouTube videoId={id} opts={opts} />
        ))}
    </div>
  )
}

export default Chat