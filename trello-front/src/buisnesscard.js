import React, { useEffect, useRef, useState } from "react";
import q from './buisnesscard.module.css';
import kizaru from './nikto-ne-nuzhen-kizaru.mp4';
import kizaru2 from './kizaru_narcos.mp4';
import bez_obid from './bez_obid.mp4';
import ruFlag from './ru.jpg';
import usFlag from './us.jpg'; 
import { canvasLightning } from './canvas.js';

function BuisnessCard() {
   const [isVideoVisible, setIsVideoVisible] = useState(false);
   const [langru, setLangRu] = useState(true);
   const ruVideos = [kizaru, kizaru2, bez_obid];
   const [currentVideo, setCurrentVideo] = useState();

   const video = useRef();
   const canvasRef = useRef(null);

   useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cl = new canvasLightning(canvas, window.innerWidth, window.innerHeight);
      cl.init();
    } else {
      console.log("Canvas not found, ref is null");
    }
  }, []);

   const usePlayer = (video) => {
    const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    isMuted: false,
   });

   const togglePlay = () => {
    setPlayerState({...playerState, isPlaying: !playerState.isPlaying})
   }

   useEffect(()=>{
    if(video.current){
    playerState.isPlaying ? video.current.play() : video.current.pause();
  }
   },[playerState.isPlaying, video])

   const handleOnTimeUpdate = () => {
    const progress = (video.current.currentTime / video.current.duration) * 100;
    setPlayerState({
      ...playerState,
      progress,
    });
   }

   const handleVideoProgress = (e) => {
    const manualChange = Number(e.target.value);
    video.current.currentTime = (video.current.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
   }

   const toggleMute = () => {
    setPlayerState({...playerState, isMuted: !playerState.isMuted})
   }

   useEffect(()=>{
    if(video.current){
    playerState.isMuted ? (video.current.muted = true) : (video.current.muted = false);
   }
   },[playerState.isMuted, video])

   return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    toggleMute,
  };
  }


  const randomVideo = () => {
    const ramdomIndex = Math.floor(Math.random() * ruVideos.length);
    setCurrentVideo(ruVideos[ramdomIndex]);
  }


   const ShowVideoWIthoutSound = () => {
    setIsVideoVisible(true);
    togglePlay();
    toggleMute();
    randomVideo();
  }

   const ShowVideoWithSound = () => {
    setIsVideoVisible(true);
    togglePlay();
    randomVideo();
   }

   const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    toggleMute,
  } = usePlayer(video);

   const ru = {
    buttonWS: "продолжить со звуком",
    buttonWOS: "продолжить без звука"
   }

   const eng = {
    buttonWS: "continue with sound",
    buttonWOS: "continue without sound"
   }

  return (
    <>
        <div className={q.main_box}>
          {isVideoVisible && <video className={q.videoTag} ref={video} onTimeUpdate={handleOnTimeUpdate} autoPlay loop>
            <source src={currentVideo} type='video/mp4'/>
          </video>
          }
          <div className={q.name}>ako.rensky</div>
          <canvas ref={canvasRef} className={q.canvas}/>
        {!isVideoVisible ? 
        <>
        {langru ? <img src={ruFlag} className={q.flag} onClick={() => setLangRu(false)}/> : <img src={usFlag} className={q.flag} onClick={() => setLangRu(true)}/>}
        <div className={q.sound_button_container}>
          <button className={q.sound_button} onClick={ShowVideoWIthoutSound}>{langru ? ru.buttonWOS : eng.buttonWOS}</button>
          <button className={q.sound_button} onClick={ShowVideoWithSound}>{langru ? ru.buttonWS : eng.buttonWS}</button>
        </div>
        </> : <div className={q.links}>
          links
        </div>
        }
        </div>
    </>
  );
}

export default BuisnessCard;
