import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import { Tooltip } from "reactstrap";
import { sidebarAction } from "../../actions";
import EditProfileModal from "./Modals/EditProfileModal";
import SettingsModal from "./Modals/SettingsModal";
import { mobileSidebarAction } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";

function Navigation() {
  const { selectedSidebar } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [editModalOpen, setEditModalOpen] = useState(false);

  const editModalToggle = (e) => {
    e.preventDefault();
    setEditModalOpen(!editModalOpen);
  };

  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const settingsModalToggle = (e) => {
    e.preventDefault();
    setSettingsModalOpen(!settingsModalOpen);
  };

  const { logout } = useAuth();

  const history = useHistory();

  async function handleLogout() {
    await logout();
    history.push("/");
  }

  const navigationItems = [
    {
      name: "Chats",
      icon: <i className="ti ti-comment-alt"></i>,
    },
    {
      name: "Friends",
      icon: <i className="ti ti-user"></i>,
      notify_badge: true,
    },
    {
      name: "Favorites",
      icon: <i className="ti ti-star"></i>,
    },
    {
      name: "Edit-Courses",
      icon: <FontAwesomeIcon icon={faSchool} />,
    },
  ];

  const NavigationItemView = (props) => {
    const { item, tooltipName } = props;

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    const linkDispatch = (e, name) => {
      e.preventDefault();
      dispatch(sidebarAction(name));
      dispatch(mobileSidebarAction(true));
    };

    return (
      <li>
        <a
          onClick={(e) => linkDispatch(e, item.name)}
          href={item.name}
          className={`${item.notify_badge ? "notify_badge" : ""} ${
            selectedSidebar === item.name ? "active" : ""
          }`}
          id={tooltipName}
        >
          {item.icon}
        </a>
        <Tooltip
          placement="right"
          isOpen={tooltipOpen}
          target={tooltipName}
          toggle={toggle}
        >
          {item.name}
        </Tooltip>
      </li>
    );
  };

  return (
    <nav className="navigation">
      <EditProfileModal modal={editModalOpen} toggle={editModalToggle} />
      <SettingsModal modal={settingsModalOpen} toggle={settingsModalToggle} />
      <div className="nav-group">
        <ul>
          <li>
            <a href="/home" className="logo">
              <Logo />
            </a>
          </li>
          {navigationItems.map((item, i) => (
            <NavigationItemView
              key={i}
              item={item}
              tooltipName={"Tooltip-" + i}
            />
          ))}
          <li className="brackets">
            <a href="/home" onClick={editModalToggle}>
              <i className="ti ti-pencil"></i>
            </a>
          </li>
          <li>
            <a href="/home" onClick={settingsModalToggle}>
              <i className="ti ti-settings"></i>
            </a>
          </li>
          <li>
            <a href="/" onClick={handleLogout}>
              <i className="ti ti-power-off"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
