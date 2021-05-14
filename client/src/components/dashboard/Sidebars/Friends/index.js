import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import AddFriendsModal from "../../Modals/AddFriendModal";
import FriendsDropdown from "./FriendsDropdown";
import { mobileSidebarAction } from "../../../../actions";
import { friendLists } from "./Data";

function Index() {
  const [classmateState, setClassmates] = useState([]);
  const [mutualClassState, setMutualClassState] = useState({});

  useEffect(() => {
    //inputRef.current.focus();
  });

  const inputRef = useRef();

  const dispatch = useDispatch();

  const mobileSidebarClose = () => {
    dispatch(mobileSidebarAction(false));
    document.body.classList.remove("navigation-open");
  };

  const currentUserID = useSelector((state) => state.currentUser._id);

  const courseRoster = useSelector((state) => state.courseRoster);

  useEffect(() => {
    const classmateIDs = courseRoster.map((course) => {
      return course.users;
    });

    const classmates = {};

    var classmatesArr = [];

    classmateIDs.forEach((idArr) => {
      idArr.forEach((id) => {
        if (id === currentUserID) {
          return;
        }
        if (id in classmates) {
          classmates[id] += 1;
        } else {
          classmates[id] = 1;
        }
      });
    });

    setMutualClassState(classmates);
    console.log(classmates);

    for (var classmate in classmates) {
      classmatesArr.push([classmate, classmates[classmate]]);
    }

    classmatesArr.sort((a, b) => b[1] - a[1]);

    console.log(classmatesArr);

    classmatesArr = classmatesArr.map(
      (classmate) => (classmate = classmate[0])
    );

    console.log(classmatesArr);
    axios
      .post("/users/getManyUsers", { userIDs: classmatesArr })
      .then((result) => {
        result.data.sort((a, b) => classmates[b._id] - classmates[a._id]);
        console.log(result.data);
        setClassmates(result.data);
      })
      .catch((e) => console.log(e));
  }, []);

  function getInitials(name) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");

    let initials = [...name.matchAll(rgx)] || [];

    initials = (
      (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
    ).toUpperCase();

    return initials;
  }

  return (
    <div className="sidebar active">
      <header>
        <span>Classmates</span>
        <ul className="list-inline">
          {/* <li className="list-inline-item">
            <AddFriendsModal />
          </li> */}
          <li className="list-inline-item d-xl-none d-inline">
            <button onClick={mobileSidebarClose} className="btn btn-light">
              <i className="ti ti-close"></i>
            </button>
          </li>
        </ul>
      </header>
      {/* <form>
        <input
          type="text"
          className="form-control"
          placeholder="Search classmates"
          ref={inputRef}
        />
      </form> */}
      <div className="sidebar-body">
        <PerfectScrollbar>
          <ul className="list-group list-group-flush">
            {classmateState.map((item, i) => {
              return (
                <li key={i} className="list-group-item">
                  <figure className="avatar">
                    <span className="avatar-title bg-success rounded-circle">
                      {getInitials(item.name)}
                    </span>
                  </figure>
                  <div className="users-list-body">
                    <div>
                      <h5>{item.name}</h5>
                      <p>Shares {mutualClassState[item._id]} courses</p>
                    </div>
                    <div className="users-list-action action-toggle">
                      <FriendsDropdown obj={item} />
                    </div>
                  </div>
                </li>
              );
            })}
            {/* {friendLists.map((item, i) => {
              return (
                <li key={i} className="list-group-item">
                  {item.avatar}
                  <div className="users-list-body">
                    <div>
                      <h5>{item.name}</h5>
                      <p>{item.title}</p>
                    </div>
                    <div className="users-list-action action-toggle">
                      <FriendsDropdown />
                    </div>
                  </div>
                </li>
              );
            })} */}
          </ul>
        </PerfectScrollbar>
      </div>
    </div>
  );
}

export default Index;
