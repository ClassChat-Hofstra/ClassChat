import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../../contexts/AuthContext";
import { loadCourses, updateMessages, addMessage } from "../../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import PinAction from "./PinAction";

import Reaction from "./CustomReactions";

import "./BulletinBoard.css";

function Chat() {
  const { selectedChat } = useSelector((state) => state);
  const { courseRoster } = useSelector((state) => state);

  const { currentUser } = useAuth();

  const socket = useSelector((state) => state.socket);

  const [inputMsg, setInputMsg] = useState("");

  const [scrollEl, setScrollEl] = useState();

  const dispatch = useDispatch();

  //Created helper function to force state to reload on the 'respone' callback.
  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
  }

  const forceUpdate = useForceUpdate();

  const handleSubmit = (newValue) => {
    if (newValue.body.length === 0) {
      return;
    }

    socket.emit(
      "send-post",
      {
        email: newValue.sender.email,
        body: newValue.body,
        crn: selectedChat.crn,
        obj: newValue,
      },
      (response) => {
        console.log(response);
        newValue._id = response.messageId;
        selectedChat.messages.push(newValue);
        //forceUpdate();
        dispatch(addMessage(newValue));
        //console.log(newValue);
      }
    );
    //Express Messaging OUTDATED
    // axios
    //   .post("/messages/newmessage", {
    //     email: newValue.sender.email,
    //     body: newValue.body,
    //     crn: selectedChat.crn,
    //   })
    //   .then(() => {
    //     selectedChat.messages.push(newValue);
    //     setInputMsg("");
    //   })
    //   .catch((err) => console.log(err));
    setInputMsg("");
  };

  useEffect(() => {
    socket.on("recieve", (post) => {
      //console.log(post);
      // const course = courseRoster.find((crse) => crse.crn === post.crn);
      // course.messages.push(post.msg);
      //selectedChat.messages.push(post.msg);
      dispatch(updateMessages(post.obj, post.crn));
    });
    return () => socket.off("recieve");
  }, [dispatch, selectedChat.messages, socket]);

  const handleChange = (newValue) => {
    setInputMsg(newValue);
  };

  useEffect(() => {
    if (scrollEl) {
      setTimeout(() => {
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }, 100);
    }
  });

  const MessagesView = (props) => {
    const { message } = props;
    //console.log(props);

    if (message.sender.email === currentUser.email) {
      message.type = "outgoing-message";
    } else {
      message.type = "incoming-message";
    }

    if (message.type === "divider") {
      return (
        <div
          className="message-item messages-divider sticky-top"
          data-label={message.body}
        ></div>
      );
    } else {
      return (
        <div className={"message-item " + message.type}>
          <div
            className={
              "message-content " + (message.file ? "message-file" : null)
            }
          >
            <strong>{message.sender.name}</strong>
            <br />
            {message.file ? message.file : message.body}
          </div>

          <Reaction selectedChat={selectedChat} id={message._id} />
          <PinAction messageObject={message} crn={selectedChat.crn} />
          <div className="message-action">
            {message.date}
            {message.type ? (
              <i className="ti-double-check text-info"></i>
            ) : null}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="chat">
      {selectedChat.crn ? (
        <React.Fragment>
          <ChatHeader selectedChat={selectedChat} />
          <PerfectScrollbar containerRef={(ref) => setScrollEl(ref)}>
            <div className="chat-body">
              <div className="messages">
                {selectedChat.messages
                  ? selectedChat.messages.map((message, i) => {
                      return <MessagesView message={message} key={i} />;
                    })
                  : null}
              </div>
            </div>
          </PerfectScrollbar>
          <ChatFooter
            onSubmit={handleSubmit}
            onChange={handleChange}
            inputMsg={inputMsg}
          />
        </React.Fragment>
      ) : (
        <div className="chat-body no-message">
          <div className="no-message-container">
            <i className="fa fa-comments-o"></i>
            <p>Select a chat to read messages</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
