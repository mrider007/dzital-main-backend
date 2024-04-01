// import React, { useEffect, useState } from "react";
// import AgoraRTC from "agora-rtc-sdk-ng";

// const VoiceCall = () => {
//   const [client, setClient] = useState(null);
//   const [localStream, setLocalStream] = useState(null);

//   useEffect(() => {
//     // Cleanup function
//     return () => {
//       if (localStream) {
//         localStream.close();
//       }
//       if (client) {
//         client.leave();
//       }
//     };
//   }, [localStream, client]);

//   const joinCall = () => {
//     const channelName = "abc";
//     const appId = "5524bffbadca4a1698c527eb676b5b74"; // Replace with your actual Agora App ID

//     // Create client instance
//     const clientInstance = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

//     // Initialize client instance
//     clientInstance.init(appId, () => {
//       clientInstance.join(null, channelName, null, (uid) => {
//         const localStreamInstance = AgoraRTC.createStream({
//           audio: true,
//           video: false,
//           screen: false
//         });

//         localStreamInstance.init(
//           () => {
//             clientInstance.publish(localStreamInstance);
//             localStreamInstance.play("local_stream");
//           },
//           (err) => {
//             console.error("Error initializing local stream", err);
//           }
//         );

//         clientInstance.on("stream-added", (evt) => {
//           const remoteStream = evt.stream;
//           clientInstance.subscribe(remoteStream);
//         });

//         clientInstance.on("stream-subscribed", (evt) => {
//           const remoteStream = evt.stream;
//           remoteStream.play("remote_stream");
//         });
//       });
//     });

//     // Set client instance
//     setClient(clientInstance);
//   };

//   return (
//     <div className="App">
//       <button onClick={joinCall}>Join Call</button>
//       <div id="local_stream"></div>
//       <div id="remote_stream"></div>
//     </div>
//   );
// };

// export default VoiceCall;



import React, { useState } from "react";
// import "./styles.css";
import Agora from "agora-rtc-sdk";
export default function AgoraVoice() {
  const [client, setClient] = useState(null);
  const [uid, setUid] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const join = () => {
    let chanalName = "abc";
    let clientInstance = Agora.createClient({ mode: "rtc", codec: "h264" });

    clientInstance.init("5524bffbadca4a1698c527eb676b5b74", () => {
      clientInstance.join(null, chanalName, null, (uid) => {
        let localStreamInstance = Agora.createStream({
          streamID: uid,
          audio: true,
          video: false,
          screen: false
        });
        setLocalStream(localStreamInstance);
        localStreamInstance.init(() => {
          clientInstance.publish(localStreamInstance);
          localStreamInstance.play("local_stream");
        });

        clientInstance.on("stream-added", (evt) => {
          let remoteStream = evt.stream;
          const id = remoteStream.getId();
          client.subscribed(remoteStream);
        });

        clientInstance.on("stream-subscribed", (evt) => {
          let remoteStream = evt.stream;
          remoteStream.play("remote_stream");
        });
      });
    });
    setClient(clientInstance);
  };
  return (
    <div className="App">
      <button onClick={join}>JOIN CALL</button>
      <div id="local_stream"></div>
      <div id="remote_stream"></div>
    </div>
  );
}