import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { updateMessageReactions, updateReactionClick } from "../../../actions";
import { useSelector, useDispatch } from "react-redux";

export default function CustomReactions(props) {
  const [emojis, setEmojis] = useState([]);
  const [emojiHidden, setHidden] = useState(false);

  const courseRoster = useSelector((state) => state.courseRoster);

  const currentCourse = courseRoster.find((course) => {
    return course.crn === props.selectedChat.crn;
  });

  // console.log(currentCourse.messages);

  const currentMessage = currentCourse.messages.find((message) => {
    return message._id === props.id;
  });

  const reactions = currentMessage.reactions;

  //console.log(reactions);

  const dispatch = useDispatch();

  const { currentUser } = useAuth();

  const onEmojiClick = (event, emojiObject) => {
    // console.log(emojiObject);
    var alreadyListed = false;
    emojis.map((emojiObj) => {
      if (emojiObj.emoji === emojiObject.emoji) {
        alreadyListed = true;
        onReaction(emojiObj.emoji);
      }
      return emojiObj;
    });

    if (!alreadyListed) {
      setEmojis(
        emojis.concat({
          emoji: emojiObject.emoji,
          emojiName: emojiObject.names[0],
          senders: new Set([currentUser.email]),
          count: 1,
        })
      );
      var reaction = {
        emoji: emojiObject.emoji,
        emojiName: emojiObject.names[0],
        senders: new Set([currentUser.email]),
        count: 1,
      };

      dispatch(
        updateMessageReactions(reaction, props.selectedChat.crn, props.id)
      );
    }
    setHidden(false);
  };

  function setHiddenValue(e) {
    e.preventDefault();
    if (emojiHidden === false) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }

  function handleReactionClick(e) {
    // console.log(e.target.value);
    onReaction(e.target.value);
    dispatch(updateReactionClick());
  }

  //TODO create redux action/reducer

  function onReaction(emojiName) {
    setEmojis(
      emojis.filter((emojiObject) => {
        if (emojiObject.emojiName === emojiName) {
          if (emojiObject.senders.has(currentUser.email)) {
            emojiObject.count -= 1;

            emojiObject.senders.delete(currentUser.email);
          } else {
            emojiObject.count += 1;
            emojiObject.senders.add(currentUser.email);
          }
        }

        if (emojiObject.count > 0) {
          return emojiObject;
        } else {
          return undefined;
        }
      })
    );
  }

  // useEffect(() => {
  //   console.log(emojis);
  // }, [emojis]);

  return (
    <div style={{ marginTop: "5px", display: "inline-block" }}>
      {reactions && (
        <span style={{ fontSize: "12px" }}>
          {reactions.map((emojiObject) => (
            <button
              key={emojiObject.emoji}
              onClick={handleReactionClick}
              style={{ borderRadius: "10%" }}
              value={emojiObject.emojiName}
            >
              {emojiObject.emoji}({emojiObject.count})
            </button>
          ))}
        </span>
      )}
      {emojiHidden && <Picker onEmojiClick={onEmojiClick} />}
      <button
        style={{ border: "none", fontSize: "14px", margin: "0 5px" }}
        onClick={setHiddenValue}
      >
        +
      </button>
    </div>
  );
}
