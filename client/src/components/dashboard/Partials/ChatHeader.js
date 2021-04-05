import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { profileAction } from "../../../actions/index";
import { mobileProfileAction } from "../../../actions/index";
import { useSelector } from "react-redux";
import PinnedPost from "./PinnedPost";

function ChatHeader(props) {
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const courseRoster = useSelector((state) => state.courseRoster);

  const pinnedPosts = courseRoster.find((course) => {
    return course.crn === props.selectedChat.crn;
  }).pinnedPosts;

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const profileActions = () => {
    dispatch(profileAction(true));
    dispatch(mobileProfileAction(true));
  };

  return (
    <div>
      <div className="chat-header">
        <div className="chat-header-user">
          {props.selectedChat.avatar}
          <div>
            <h5>
              {props.selectedChat.subject}-{props.selectedChat.course_number}:{" "}
              {props.selectedChat.course_title}
            </h5>
            <small className="text-muted">
              <i>Online</i>
            </small>
          </div>
        </div>
        <br />
        <br />
        <div className="chat-header-action">
          <ul className="list-inline">
            <li
              className="list-inline-item"
              data-toggle="tooltip"
              title="Video call"
            >
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle
                  tag="span"
                  data-toggle="dropdown"
                  aria-expanded={dropdownOpen}
                >
                  <button className="btn btn-secondary">
                    <i className="ti ti-more"></i>
                  </button>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={profileActions}>Profile</DropdownItem>
                  <DropdownItem>Add to archive</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Block</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
      <div className="bulletin-board">
        <ul className="list-group list-group-horizontal flex-wrap">
          {/* <PinnedPost name="Mike" body="Test is on April 6" /> */}
          {pinnedPosts.map((post) => {
            return <PinnedPost name={post.sender.name} body={post.body} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default ChatHeader;
