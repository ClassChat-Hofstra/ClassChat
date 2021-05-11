import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { createSection } from "../../../actions";
import axios from "axios";

function AddGroupModal() {
  const dispatch = useDispatch();

  const selectedChat = useSelector((state) => state.selectedChat);

  const [modal, setModal] = useState(false);

  const [sectionName, setSectionName] = useState("");

  const modalToggle = () => setModal(!modal);

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

  const AvatarTooltip = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        target={"Tooltip-Avatar" + props.id}
        toggle={toggle}
      >
        {props.name}
      </Tooltip>
    );
  };

  function handleClick() {
    const sectionObj = {
      sectionName: sectionName,
      crn: selectedChat.crn + "-" + sectionName,
      course_title: selectedChat.course_title,
      course_number: selectedChat.course_number,
      course_section: selectedChat.course_section,
      subject: selectedChat.subject,
      messages: [],
      pinnedPosts: [],
      recommendations: [],
      isSection: true,
    };

    axios
      .post("/courses/addsection", {
        crn: selectedChat.crn,
        sectionObj: sectionObj,
      })
      .then(() => {
        dispatch(createSection(sectionObj));
      })
      .catch((e) => console.log(e));
    modalToggle();
  }

  return (
    <div>
      <button
        className="btn btn-light"
        onClick={modalToggle}
        id="Tooltip-Add-Group"
      >
        <i className="fa fa-users"></i>
      </button>
      <Tooltip
        isOpen={tooltipOpen}
        target={"Tooltip-Add-Group"}
        toggle={tooltipToggle}
      >
        New Section
      </Tooltip>
      <Modal
        className="modal-dialog-zoom"
        isOpen={modal}
        toggle={modalToggle}
        centered
      >
        <ModalHeader toggle={modalToggle}>
          <i className="fa fa-users"></i> New Section
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="group_name">Section name</Label>
              <InputGroup>
                <Input
                  type="text"
                  name="group_name"
                  id="group_name"
                  onChange={(event) => setSectionName(event.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="textarea" name="description" id="description" />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleClick}>
            Create Section
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddGroupModal;
