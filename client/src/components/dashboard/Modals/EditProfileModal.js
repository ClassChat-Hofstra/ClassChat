import React, { useState, useRef } from "react";
import firebase from "firebase";
import { Alert } from "react-bootstrap";
import {
  Modal,
  ModalBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  ModalHeader,
  Input,
  InputGroupAddon,
  InputGroup,
  InputGroupText,
  CustomInput,
} from "reactstrap";
import classnames from "classnames";

function EditProfileModal(props) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  var user = firebase.auth().currentUser;

  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  function handleSave(e) {
    switch (activeTab) {
      case "4":
        changePassword();
        break;
      default:
    }
  }

  function changePassword() {
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPass
    );
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        user
          .updatePassword(newPass)
          .then(() => {
            setError("");
            setMessage("Password has been changed");
          })
          .catch((e) => {
            setMessage("");
            setError("New password is invalid");
          });
      })
      .catch((e) => {
        setMessage("");
        setError("Current password is incorrect");
      });
  }

  return (
    <div>
      <Modal
        isOpen={props.modal}
        toggle={props.toggle}
        centered
        className="modal-dialog-zoom"
      >
        <ModalHeader toggle={props.toggle}>
          <i className="ti ti-pencil"></i> Profile Edit
        </ModalHeader>
        <ModalBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                href="#/"
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggle("1");
                }}
              >
                Personal
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#/"
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggle("2");
                }}
              >
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#/"
                className={classnames({ active: activeTab === "3" })}
                onClick={() => {
                  toggle("3");
                }}
              >
                Social Links
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#/"
                className={classnames({ active: activeTab === "4" })}
                onClick={() => {
                  toggle("4");
                }}
              >
                Change Password
              </NavLink>
            </NavItem>
          </Nav>
          <Form>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <FormGroup>
                  <Label for="fullname">Fullname</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti ti-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" name="fullname" id="fullname" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti ti-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" name="email" id="email" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Enter password to save changes</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti ti-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      required
                    />
                  </InputGroup>
                </FormGroup>
              </TabPane>
              <TabPane tabId="2">
                <FormGroup>
                  <Label for="about">Write a few words that describe you</Label>
                  <Input type="textarea" name="about" id="about" />
                </FormGroup>
                <FormGroup>
                  <CustomInput
                    type="checkbox"
                    id="customCheckbox1"
                    label="View profile"
                    defaultChecked
                  />
                </FormGroup>
              </TabPane>
              <TabPane tabId="3">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-facebook">
                        <i className="fa fa-facebook"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="facebook"
                      id="facebook"
                      placeholder="Username"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-twitter">
                        <i className="fa fa-twitter"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="twitter"
                      id="twitter"
                      placeholder="Username"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-instagram">
                        <i className="fa fa-instagram"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="instagram"
                      id="instagram"
                      placeholder="Username"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-linkedin">
                        <i className="fa fa-linkedin"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="linkedin"
                      id="linkedin"
                      placeholder="Username"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-dribbble">
                        <i className="fa fa-dribbble"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="dribbble"
                      id="dribbble"
                      placeholder="Username"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-youtube">
                        <i className="fa fa-youtube"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="youtube"
                      id="youtube"
                      placeholder="Username"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-google">
                        <i className="fa fa-google"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="google"
                      id="google"
                      placeholder="Username"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="append">
                      <InputGroupText className="bg-whatsapp">
                        <i className="fa fa-whatsapp"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="whatsapp"
                      id="whatsapp"
                      placeholder="Username"
                    />
                  </InputGroup>
                </FormGroup>
              </TabPane>
              <TabPane tabId="4">
                <FormGroup>
                  <Label for="newPassword">New Password</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti ti-unlock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      onChange={(e) => setNewPass(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="currentPassword">Current Password</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti ti-unlock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      onChange={(e) => setOldPass(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
              </TabPane>
            </TabContent>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EditProfileModal;
