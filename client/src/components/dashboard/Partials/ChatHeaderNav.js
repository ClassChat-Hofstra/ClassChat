import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import PinnedPost from "./PinnedPost";
import WebRec from "./WebRec";
import VideoRec from "./VideoRec";
import { useSelector } from "react-redux";

export default function ChatHeaderNav(props) {
  const selectedChat = useSelector((state) => state.selectedChat);
  const [key, setKey] = useState("");
  console.log(props.pinned);

  function convertWebRecsToArray() {
    const recsArr = [];
    selectedChat.recommendations.forEach((rec) => {
      if (rec != null && rec.webRecs !== undefined && rec.webRecs != null) {
        const webRecs = rec.webRecs;
        webRecs.forEach((webRec) => {
          recsArr.push(webRec);
        });
      }
    });
    return recsArr;
  }

  function convertVideoRecsToArray() {
    const recsArr = [];
    selectedChat.recommendations.forEach((rec) => {
      if (rec != null && rec.videoRecs !== undefined && rec.videoRecs != null) {
        const videoRecs = rec.videoRecs;
        videoRecs.forEach((videoRec) => {
          recsArr.push(videoRec);
        });
      }
    });
    return recsArr;
  }

  function tabClick(keyClicked) {
    if (key === keyClicked) {
      setKey("");
    } else {
      setKey(keyClicked);
    }
  }

  console.log(convertWebRecsToArray());

  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => tabClick(k)}
      >
        <Tab eventKey="pinnedPosts" title="Pinned Posts">
          <div className="bulletin-board">
            <ul className="list-group list-group-horizontal flex-wrap">
              {props.pinned &&
                props.pinned.map((post) => {
                  return (
                    <PinnedPost name={post.sender.name} body={post.body} />
                  );
                })}
            </ul>
          </div>
        </Tab>
        <Tab eventKey="recommendations" title="Recommendations">
          <div className="bulletin-board">
            <ul className="list-group list-group-horizontal flex-wrap">
              {props.pinned &&
                convertWebRecsToArray().map((rec) => {
                  return (
                    <WebRec name={rec.name} body={rec.snippet} url={rec.url} />
                  );
                })}
              {props.pinned &&
                convertVideoRecsToArray().map((rec) => {
                  return <VideoRec name={rec.name} embedHtml={rec.embedHtml} />;
                })}
            </ul>
          </div>
        </Tab>
      </Tabs>

      <br />
    </div>
  );
}
