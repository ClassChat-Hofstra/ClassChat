import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "reactstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import AddGroupModal from "../../Modals/AddGroupModal";
import ChatsDropdown from "./ChatsDropdown";
import { sidebarAction } from "../../../../actions";
import { chatLists } from "./Data";
import { mobileSidebarAction } from "../../../../actions";
import { selectedChatAction, loadCourses } from "../../../../actions";
import { useAuth } from "../../../../contexts/AuthContext";
import CoursesDropdown from "../Edit-Courses/CoursesDropdown";

function Index() {
  // useEffect(() => {
  //   inputRef.current.focus();
  // });

  const { currentUser } = useAuth();

  const dispatch = useDispatch();

  const inputRef = useRef();

  const courseRoster = useSelector((state) => state.courseRoster);

  const { selectedChat } = useSelector((state) => state);

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  useEffect(() => {
    console.log("this was called");
  }, [selectedChat.sections]);

  const mobileSidebarClose = () => {
    dispatch(mobileSidebarAction(false));
    document.body.classList.remove("navigation-open");
  };

  const sectionSelectHandle = (chatSection) => {
    console.log(chatSection);
    dispatch(selectedChatAction(chatSection.secObject));
  };

  const chatSelectHandle = (chat) => {
    //chat.unread_messages = 0;
    console.log(chat);
    dispatch(selectedChatAction(chat));
    dispatch(mobileSidebarAction(false));
  };

  // const ChatListView = (props) => {
  //   const { chat } = props;

  //   return (
  //     <li
  //       className={
  //         "list-group-item " + (chat.id === selectedChat.id ? "open-chat" : "")
  //       }
  //       onClick={() => chatSelectHandle(chat)}
  //     >
  //       {/* {chat.avatar} */}
  //       <div className="users-list-body">
  //         <h5>{chat.name}</h5>
  //         {chat.text}
  //         <div className="users-list-action action-toggle">
  //           {chat.unread_messages ? (
  //             <div className="new-message-count">{chat.unread_messages}</div>
  //           ) : (
  //             ""
  //           )}
  //           <ChatsDropdown />
  //         </div>
  //       </div>
  //     </li>
  //   );
  // };

  const ChatListView = (props) => {
    return (
      <div>
        <li
          style={{ backgroundColor: "#f3f1f1" }}
          className={
            "list-group-item " +
            (props.crn === selectedChat.crn ? "open-chat" : "")
          }
          onClick={() => chatSelectHandle(props)}
        >
          {/* {chat.avatar} */}
          <div className="users-list-body">
            <h5>
              {props.subject}-{props.course_number}: {props.course_title}
            </h5>
            <div
              style={{
                boxShadow: "-8px 1px 10px 5px #f3f1f1",
                background: "#f3f1f1",
              }}
              className="users-list-action action-toggle"
            >
              <ChatsDropdown />
            </div>
          </div>
        </li>
        <ul className="list-group">
          {/* <li>
                <SectionListView
                  crn="123456"
                  sectionName="This is a section"
                ></SectionListView>
              </li> */}
          {props.sections &&
            props.sections.map((sec) => {
              return (
                <li>
                  <SectionListView
                    sectionName={sec.sectionName}
                    crn={sec.crn}
                    secObject={sec}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    );
  };

  const SectionListView = (props) => {
    return (
      <li
        className={
          "list-group-item " +
          (props.crn === selectedChat.crn ? "open-chat" : "")
        }
        onClick={() => sectionSelectHandle(props)}
      >
        <div className="users-list-body" style={{ marginLeft: "25%" }}>
          <h5>{props.sectionName}</h5>
          <div className="users-list-action action-toggle">
            <ChatsDropdown />
          </div>
        </div>
      </li>
    );
  };

  function createListItem(courseData) {
    return (
      <ChatListView
        key={courseData.crn}
        crn={courseData.crn}
        course_title={courseData.course_title}
        subject={courseData.subject}
        course_number={courseData.course_number}
        course_section={courseData.course_section}
        messages={courseData.messages}
        pinnedPosts={courseData.pinnedPosts}
        recommendations={courseData.recommendations}
        isSection="false"
        sections={courseData.sections}
      />
    );
  }

  return (
    <div className="sidebar active">
      <header>
        <span>Chats</span>
        <ul className="list-inline">
          <li className="list-inline-item">
            <AddGroupModal />
          </li>
          <li className="list-inline-item">
            <button
              onClick={() => dispatch(sidebarAction("Classmates"))}
              className="btn btn-light"
              id="Tooltip-New-Chat"
            >
              <i className="ti ti-comment-alt"></i>
            </button>
            <Tooltip
              isOpen={tooltipOpen}
              target={"Tooltip-New-Chat"}
              toggle={toggle}
            >
              New chat
            </Tooltip>
          </li>
          <li className="list-inline-item d-xl-none d-inline">
            <button onClick={mobileSidebarClose} className="btn btn-light">
              <i className="ti ti-close"></i>
            </button>
          </li>
        </ul>
      </header>
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Search chat"
          ref={inputRef}
        />
      </form>
      <div className="sidebar-body">
        <PerfectScrollbar>
          <ul className="list-group list-group-flush">
            {courseRoster.map(createListItem)}
          </ul>
        </PerfectScrollbar>
      </div>
    </div>
  );
}

export default Index;
