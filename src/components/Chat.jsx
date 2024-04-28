import React, { useEffect, useState } from 'react'
import './Chat.css'
import YouTube from 'react-youtube'
import YoutubeService from '../services/YoutubeService'
import { db } from '../firebase.js'
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useSelector } from 'react-redux'
import { selectUser } from '../features/user/userSlice.js'
// import { collection, query, doc, onSnapshot } from "firebase/firestore";

function Chat() {
  const user = useSelector(selectUser);
  const groupDbRef = doc(db, "groups", "dareds-group");

  const [videos, setVideos] = useState([]);
  const [videoId, setVideoId] = useState("");
  const [groupData, setGroupData] = useState({
    curVideoId: "",
    isPlaying: false,
    members: [],
    userReady: []
  });
  const [player, setPlayer] = useState(null);

  const sendVideo = async (e) => {
    e.preventDefault();
    
    await updateDoc(groupDbRef, {
      "curVideoId": videoId
    });
  };

  const onPlayerReady = async (e) => {
    setPlayer(e.target);
    const field = "userReady." + user.displayName;
    await updateDoc(groupDbRef, {
      [field]: true,
    });
  };

  const onPlayHandler = async () => {
    await updateDoc(groupDbRef, {
      "isPlaying": true
    });
  };

  const onPauseHandler = async () => {
    await updateDoc(groupDbRef, {
      "isPlaying": false
    });
  };

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
      console.log("Data Changed:", doc.data());
      setGroupData(doc.data());
    });
    return () => {
      onPauseHandler();
      unsub();
    }
  }, []);

  useEffect(() => {
    if(player) {
      groupData.isPlaying ? player.playVideo() : player.pauseVideo();
    }
  }, [groupData.isPlaying]);

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
    playerVars: {
      controls: 0,
    }
  };

  return (
    <div className="chat">
        <h4>Chat</h4>
        {/* <button onClick={findVideos}>Do The Search</button> */}
        { groupData.curVideoId && <YouTube videoId={groupData.curVideoId} onReady={onPlayerReady} opts={opts} />}
        { groupData.curVideoId && <button onClick={onPlayHandler}>Play</button>}
        { groupData.curVideoId && <button onClick={onPauseHandler}>Pause</button>}
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