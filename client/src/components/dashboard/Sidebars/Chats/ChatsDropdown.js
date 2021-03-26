import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { profileAction } from "../../../../actions";
import { mobileProfileAction } from "../../../../actions";
import { useDispatch } from "react-redux";

const ChatsDropdown = () => {
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const profileActions = () => {
    dispatch(profileAction(true));
    dispatch(mobileProfileAction(true));
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle tag="a">
        <i className="ti ti-more"></i>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={profileActions}>Profile</DropdownItem>
        <DropdownItem>Delete</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ChatsDropdown;
