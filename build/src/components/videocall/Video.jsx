import React, { useEffect, useState } from "react";
import useAgora from "./Hook";
import Controls from "./Controls";
import WebDashboard from "./Dashboard";



const appId = "5524bffbadca4a1698c527eb676b5b74"; //ENTER APP ID HERE
const token = "007eJxTYHBROWS472v8Lz+Vkqp5HPoGc+69St7gkpSdOfvN1L0Ju2YoMJiaGpkkpaUlJaYkJ5okGppZWiSbGpmnJpmZmyWZJpmb5B88mdoQyMiQJ6bNwsgAgSA+O0NyRmJeXmoOAwMA6nUhRw=="; // ENTER TOKEN HERE
const Video = (props) => {
  const { setInCall, channelName } = props;
  const [useClient, useMicrophoneAndCameraTracks] = useAgora();
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  
  useEffect(() => {
     // function to initialise the SDK
     let init = async (name) => {
       client.on("user-published", async (user, mediaType) => {
         await client.subscribe(user, mediaType);
    	 console.log("subscribe success");
    	//  if (mediaType === "video") {
      // 	   setUsers((prevUsers) => {
      //        return [...prevUsers, user];
      // 	   });
    	//  }
    	 if (mediaType === "audio") {
      	   user.audioTrack?.play();
    	 }
       });
  	
       client.on("user-unpublished", (user, type) => {
    	 console.log("unpublished", user, type);
    	 if (type === "audio") {
      	   user.audioTrack?.stop();
    	 }
    	 if (type === "video") {
      	  setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
      	  });
        }
     });
  	
     client.on("user-left", (user) => {
       console.log("leaving", user);
       setUsers((prevUsers) => {
      	  return prevUsers.filter((User) => User.uid !== user.uid);
       });
     });
  	
     await client.join(appId, name, token, null);
     if (tracks) await client.publish([tracks[0], tracks[1]]);
     setStart(true);
   };
   
   if (ready && tracks) {
     console.log("init ready");
     init(channelName);
   }
 }, [channelName, ready, tracks]);
  
 return (
   <div className="App">
    {/* {ready && tracks && <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />} */}
    {start && tracks && <WebDashboard users={users} tracks={tracks} />}
   </div>
 );
};
export default Video;