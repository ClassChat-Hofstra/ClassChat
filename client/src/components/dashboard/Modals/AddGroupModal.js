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

import { useDispatch } from "react-redux";
import { createSection } from "../../../actions";

function AddGroupModal() {
  const dispatch = useDispatch();

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
    dispatch(createSection({ sectionName }));
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
