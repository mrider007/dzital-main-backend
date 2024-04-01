

import React, { useState } from "react";
import Video from "./Video";
import ChannelForm from "./ChannelForm";

// import "./App.css";

const App = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  
  return (
    <div>
  	{inCall ? (
    	<Video setInCall={setInCall} channelName={channelName} />
  	) : (
    	<ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
  	)}
    </div>
  );
};

export default App;