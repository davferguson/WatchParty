import React, { useEffect, useState } from 'react'
import './Chat.css'
import YouTube from 'react-youtube'
import YoutubeService from '../services/YoutubeService'
import { db } from '../firebase.js'
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
// import { collection, query, doc, onSnapshot } from "firebase/firestore";

function Chat() {
  const [videos, setVideos] = useState([]);
  const [videoId, setVideoId] = useState("");
  const [curVideoId, setCurVideoId] = useState("");
  const [player, setPlayer] = useState(null);

  const sendVideo = async (e) => {
    e.preventDefault();
    
    const groupDbRef = doc(db, "groups", "dareds-group");
    await updateDoc(groupDbRef, {
      "curVideoId": videoId
    });
  }

  const onPlayerReady = (e) => {
    setPlayer(e.target);
  }

//   const q = query(collection(db, "groups/dareds-group/posts"));
//   const unsubscribe = onSnapshot(q, (querySnapshot) => {
//     const posts = [];
//     querySnapshot.forEach((doc) => {
//       posts.push(doc.data().msg);
//     });
//     console.log("Messages: ", posts.join(", "));
//   });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "groups", "dareds-group"), (doc) => {
      console.log("Current data: ", doc.data());
      setCurVideoId(doc.data().curVideoId)
    });
    return () => {
      unsub();
    }
  }, []);

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
        { curVideoId && <YouTube videoId={curVideoId} onReady={onPlayerReady} opts={opts} /> }
        <form>
            <input value={videoId} onChange={e => setVideoId(e.target.value)} placeholder='Video Id' type='text' />
            <button type='submit' onClick={sendVideo}>Send Video</button>
        </form>

        {videos.map(({ id, title }) => (
            <YouTube videoId={id} opts={opts} />
        ))}
    </div>
  )
}

export default Chat