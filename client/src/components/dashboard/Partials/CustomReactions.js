import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";

export default function CustomReactions() {
  const [emojis, setEmojis] = useState([]);
  const [emojiHidden, setHidden] = useState(false);

  const { currentUser } = useAuth();

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
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
    console.log(e.target.value);
    onReaction(e.target.value);
  }

  function onReaction(emojiName) {
    setEmojis(
      emojis.filter((emojiObject) => {
        console.log("Emoji object: " + emojiObject.emoji);
        console.log("Emoji name: " + emojiName);
        if (emojiObject.emojiName === emojiName) {
          if (emojiObject.senders.has(currentUser.email)) {
            emojiObject.count -= 1;
            console.log("reached");
            emojiObject.senders.delete(currentUser.email);
          } else {
            console.log("reached");
            emojiObject.count += 1;
            emojiObject.senders.add(currentUser.email);
          }
        }

        if (emojiObject.count > 0) {
          console.log(emojiObject.count);
          return emojiObject;
        } else {
          console.log(emojiObject.count);
        }
      })
    );
  }

  useEffect(() => {
    //console.log(emojis);
  }, [emojis]);

  return (
    <div style={{ marginTop: "5px", display: "inline-block" }}>
      {emojis && (
        <span style={{ fontSize: "12px" }}>
          {emojis.map((emojiObject) => (
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
