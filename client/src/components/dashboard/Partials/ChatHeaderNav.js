import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import PinnedPost from "./PinnedPost";

export default function ChatHeaderNav(props) {
  const [key, setKey] = useState("pinnedPosts");
  console.log(props.pinned);
  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
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
          <p>This is the recommendations page.</p>
        </Tab>
      </Tabs>
      <hr />
      <br />
    </div>
  );
}
