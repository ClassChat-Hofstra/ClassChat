import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";

const FriendsDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  function handleClick() {
    console.log(props);
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle tag="span">
        <i className="ti ti-more"></i>
      </DropdownToggle>
      <DropdownMenu>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={"mailto:" + props.obj.email}
        >
          <DropdownItem>Email</DropdownItem>
        </a>
      </DropdownMenu>
    </Dropdown>
  );
};

export default FriendsDropdown;
