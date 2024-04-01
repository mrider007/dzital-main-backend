import React, { useState, useEffect } from 'react';
import './chat.css';
import AC from 'agora-chat';

const App = () => {
  const appKey = "611099035#1281065"; // Replace with your Agora Chat app key
  const [conn, setConn] = useState(null);
  const [messages, setMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);

  useEffect(() => {
    const connection = new AC.connection({
      appKey: appKey,
    });

    connection.addEventHandler("connection&message", {
      onConnected: () => {
        console.log("Connect success !");
      },
      onDisconnected: () => {
        console.log("Logout success !");
      },
      onTextMessage: (message) => {
        console.log(message);
        setMessages(prevMessages => [...prevMessages, message]); // Update messages state
      },
      onTokenWillExpire: (params) => {
        console.log("Token is about to expire");
      },
      onTokenExpired: (params) => {
        console.log("The token has expired");
        // Handle token expiration by logging out or refreshing token
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });

    setConn(connection);

    return () => {
      if (connection) {
        connection.close();
      }
    };
  }, []);

  const handleLogin = async () => {
    const userId = document.getElementById("userID").value.toString();
    const token = document.getElementById("token").value.toString();

    if (!userId || !token) {
      console.error("User ID and token are required.");
      return;
    }

    if (conn && conn.isOpened()) {
      console.log("Already logged in.");
      return;
    }

    try {
      await conn.open({
        user: userId,
        agoraToken: token,
      });
      console.log("Login successful");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleLogout = () => {
    if (!conn || !conn.isOpened()) {
      console.log("Not logged in.");
      return;
    }

    conn.close();
  };

  const handleSendMessage = () => {
    const peerId = document.getElementById("peerId").value.toString();
    const peerMessage = document.getElementById("peerMessage").value.toString();

    if (!conn || !conn.isOpened()) {
      console.error("User is not logged in.");
      return;
    }

    if (!peerId || !peerMessage) {
      console.error("Peer ID and message are required.");
      return;
    }

    const option = {
      chatType: "singleChat",
      type: "txt",
      to: peerId,
      msg: peerMessage,
    };

    const msg = AC.message.create(option);

    conn.send(msg)
      .then(() => {
        console.log("Message sent successfully");
        setSentMessages(prevMessages => [...prevMessages, option]); // Update sent messages state
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    // don't remove this commented div
    //     <div>
    //       <form id="loginForm">
    //         <div className="input-field">
    //           <label>User ID</label>
    //           <input type="text" placeholder="User ID" id="userID" />
    //         </div>
    //         <div className="input-field">
    //           <label>Token</label>
    //           <input type="text" placeholder="Token" id="token" />
    //         </div>
    //         <div>
    //           <button type="button" onClick={handleLogin}>Login</button>
    //           <button type="button" onClick={handleLogout}>Logout</button>
    //         </div>
    //         <div className="input-field">
    //           <label>Peer user ID</label>
    //           <input type="text" placeholder="Peer user ID" id="peerId" />
    //         </div>
    //         <div className="input-field">
    //           <label>Peer Message</label>
    //           <input type="text" placeholder="Peer message" id="peerMessage" />
    //           <button type="button" onClick={handleSendMessage}>Send</button>
    //         </div>
    //       </form>
    //       <hr />
    //  <div id="log">
    //         <h3 className="mb-3">Received Messages:</h3>
    //         <div className="row">
    //           <div className="col-md-6">
    //             {messages.map((msg, index) => (
    //               <div key={index} className="alert alert-primary" role="alert">
    //                 <strong>Message:</strong> {msg.msg}
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //       <div>
    //         <h3 className="mb-3">Sent Messages:</h3>
    //         <div className="row">
    //           <div className="col-md-6">
    //             {sentMessages.map((msg, index) => (
    //               <div key={index} className="alert alert-success" role="alert">
    //                 <strong>Message:</strong> {msg.msg}
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    <>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
      <div className="container">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card chat-app">
              <div className="chat">
                <div className="chat-header clearfix">
                  <div className="row">
                    <div className="col-lg-6">
                      <a data-toggle="modal" data-target="#view_info">
                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                      </a>
                      <div className="chat-about">
                        <h6 className="m-b-0">Aiden Chavez</h6>
                        <small>Last seen: 2 hours ago</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="chat-history">
                  <ul className="m-b-0">
                    <li className="clearfix">
                      <div className="message-data text-right">
                        <span className="message-data-time">10:10 AM, Today</span>
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                      </div>
                      <div className="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
                    </li>
                    <li className="clearfix">
                      <div className="message-data">
                        <span className="message-data-time">10:12 AM, Today</span>
                      </div>
                      <div className="message my-message">Are we meeting today?</div>
                    </li>
                    <li className="clearfix">
                      <div className="message-data">
                        <span className="message-data-time">10:15 AM, Today</span>
                      </div>
                      <div className="message my-message">Project has been already finished and I have results to show you.</div>
                    </li>
                  </ul>
                </div>
                <div className="chat-message clearfix">
                  <div className="input-group mb-0">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fa fa-send"></i></span>
                    </div>
                    <input type="text" className="form-control" placeholder="Enter text here..." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
