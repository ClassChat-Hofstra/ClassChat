import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import firebase from "firebase";
import { Alert } from "react-bootstrap";
import { updateUsersName, updateUsersEmail } from "../../../actions";
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
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.currentUser);

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [passConfirm, setPassConfirm] = useState("");

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  var user = firebase.auth().currentUser;

  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    setName(userProfile.name);
    setEmail(userProfile.email);
  }, [useSelector((state) => state.currentUser)]);

  useEffect(() => {
    setMessage("");
    setError("");
  }, [activeTab]);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  function handleSave(e) {
    e.preventDefault();
    switch (activeTab) {
      case "1":
        changeNameAndEmail();
        break;
      case "4":
        changePassword();
        break;
      default:
    }
  }

  function changeNameAndEmail() {
    console.log(name);
    console.log(email);
    console.log(passConfirm);
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      passConfirm
    );
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        user
          .updateEmail(email)
          .then(() => {
            axios
              .post("/users/updateNameAndEmail", {
                email: user.email,
                name: name,
                newEmail: email,
              })
              .then((result) => {
                console.log("name: " + name);
                console.log("email: " + email);
                setMessage("Updated Profile");
                setError("");
                dispatch(updateUsersName(name));
                dispatch(updateUsersEmail(email));
              })
              .catch((e) => {
                console.log(e);
                setMessage("");
                setError("Error updating profile.");
              });
          })
          .catch((e) => {
            console.log(e);
            setMessage("");
            setError("Email could not be changed");
          });
      })
      .catch((e) => {
        console.log(e);
        setMessage("");
        setError("Incorrect password");
      })
      .finally(() => {
        setPassConfirm("");
      });
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
      })
      .finally(() => {
        setNewPass("");
        setOldPass("");
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
          <i className="ti ti-pencil"> </i> Profile Edit{" "}
        </ModalHeader>{" "}
        <ModalBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                href="#/"
                className={classnames({
                  active: activeTab === "1",
                })}
                onClick={() => {
                  toggle("1");
                }}
              >
                Personal{" "}
              </NavLink>{" "}
            </NavItem>{" "}
            <NavItem>
              <NavLink
                href="#/"
                className={classnames({
                  active: activeTab === "2",
                })}
                onClick={() => {
                  toggle("2");
                }}
              >
                About{" "}
              </NavLink>{" "}
            </NavItem>{" "}
            <NavItem>
              <NavLink
                href="#/"
                className={classnames({
                  active: activeTab === "3",
                })}
                onClick={() => {
                  toggle("3");
                }}
              >
                Social Links{" "}
              </NavLink>{" "}
            </NavItem>{" "}
            <NavItem>
              <NavLink
                href="#/"
                className={classnames({
                  active: activeTab === "4",
                })}
                onClick={() => {
                  toggle("4");
                }}
              >
                Change Password{" "}
              </NavLink>{" "}
            </NavItem>{" "}
          </Nav>{" "}
          <Form>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <FormGroup>
                  <Label for="fullname"> Fullname </Label>{" "}
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti ti-user"> </i>{" "}
                      </InputGroupText>{" "}
                    </InputGroupAddon>{" "}
                    <Input
                      type="text"
                      name="fullname"
                      id="fullname"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </InputGroup>{" "}
                </FormGroup>{" "}
                <FormGroup>
                  <Label for="email"> Email </Label>{" "}
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti ti-user"> </i>{" "}
                      </InputGroupText>{" "}
                    </InputGroupAddon>{" "}
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </InputGroup>{" "}
                </FormGroup>{" "}
                <FormGroup>
                  <Label for="password"> Enter password to save changes </Label>{" "}
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti ti-user"> </i>{" "}
                      </InputGroupText>{" "}
                    </InputGroupAddon>{" "}
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      onChange={(e) => setPassConfirm(e.target.value)}
                      value={passConfirm}
                      required
                    />
                  </InputGroup>{" "}
                </FormGroup>{" "}
                {error && <Alert variant="danger"> {error} </Alert>}{" "}
                {message && <Alert variant="success"> {message} </Alert>}{" "}
              </TabPane>{" "}
              <TabPane tabId="2">
                <FormGroup>
                  <Label for="about">
                    {" "}
                    Write a few words that describe you{" "}
                  </Label>{" "}
                  <Input type="textarea" name="about" id="about" />
                </FormGroup>{" "}
                <FormGroup>
                  <CustomInput
                    type="checkbox"
                    id="customCheckbox1"
                    label="View profile"
                    defaultChecked
                  />
                </FormGroup>{" "}
              </TabPane>{" "}
              <TabPane tabId="3">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-facebook">
                        <i className="fa fa-facebook"> </i>{" "}
                      </InputGroupText>{" "}
                    </InputGroupAddon>{" "}
                    <Input
                      type="text"
                      name="facebook"
                      id="facebook"
                      placeholder="Username"
                    />
                  </InputGroup>{" "}
                </FormGroup>{" "}
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-twitter">
                        <i className="fa fa-twitter"> </i>{" "}
                      </InputGroupText>{" "}
                    </InputGroupAddon>{" "}
                    <Input
                      type="text"
                      name="twitter"
                      id="twitter"
                      placeholder="Username"
                    />
                  </InputGroup>{" "}
                </FormGroup>{" "}
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-instagram">
                        <i className="fa fa-instagram"> </i>{" "}
                      </InputGroupText>{" "}
                    </InputGroupAddon>{" "}
                    <Input
                      type="text"
                      name="instagram"
                      id="instagram"
                      placeholder="Username"
                    />
                  </InputGroup>{" "}
                </FormGroup>{" "}
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-linkedin">
                        <i className="fa fa-linkedin"> </i>{" "}
                      </InputGroupText>{" "}
                    </InputGroupAddon>{" "}
                    <Input
                      type="text"
                      name="linkedin"
                      id="linkedin"
                      placeholder="Username"
                    />
                  </InputGroup>{" "}
                </FormGroup>{" "}
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-dribbble">
                        <i className="fa fa-dribbble"> </i>{" "}
                      </InputGroupText>{" "}
                    </InputGroupAddon>{" "}
                    <Input
                      type="text"
                      name="dribbble"
                      id="dribbble"
                      placeholder="Username"
                    />
                  </InputGroup>{" "}
                </FormGroup>{" "}
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-youtube">
                        <i className="fa fa-youtube"> </i>{" "}
                      </InputGroupText>{" "}
                    </InputGroupAddon>{" "}
                    <Input
                      type="text"
                      name="youtube"
                      id="youtube"
                      placeholder="Username"
                    />
                  </InputGroup>{" "}
                </FormGroup>{" "}
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-google">
                        <i className="fa fa-google"> </i>{" "}
                      </InputGroupText>{" "}
                    </InputGroupAddon>{" "}
                    <Input
                      type="text"
                      name="google"
                      id="google"
                      placeholder="Username"
                    />
                  </InputGroup>{" "}
                </FormGroup>{" "}
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="append">
                      <InputGroupText className="bg-whatsapp">
                        <i className="fa fa-whatsapp"> </i>{" "}
                      </InputGroupText>{" "}
                    </InputGroupAddon>{" "}
                    <Input
                      type="text"
                      name="whatsapp"
                      id="whatsapp"
                      placeholder="Username"
                    />
                  </InputGroup>{" "}
                </FormGroup>{" "}
                {error && <Alert variant="danger"> {error} </Alert>}{" "}
                {message && <Alert variant="success"> {message} </Alert>}{" "}
              </TabPane>{" "}
              <TabPane tabId="4">
                <FormGroup>
                  <Label for="newPassword"> New Password </Label>{" "}
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti ti-unlock"> </i>{" "}
                      </InputGroupText>{" "}
                    </InputGroupAddon>{" "}
                    <Input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      required
                    />
                  </InputGroup>{" "}
                </FormGroup>{" "}
                <FormGroup>
                  <Label for="currentPassword"> Current Password </Label>{" "}
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti ti-unlock"> </i>{" "}
                      </InputGroupText>{" "}
                    </InputGroupAddon>{" "}
                    <Input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      onChange={(e) => setOldPass(e.target.value)}
                      value={oldPass}
                      required
                    />
                  </InputGroup>{" "}
                </FormGroup>{" "}
                {error && <Alert variant="danger"> {error} </Alert>}{" "}
                {message && <Alert variant="success"> {message} </Alert>}{" "}
              </TabPane>{" "}
            </TabContent>{" "}
          </Form>{" "}
        </ModalBody>{" "}
        <ModalFooter>
          <Button type="submit" onClick={handleSave} color="primary">
            Save{" "}
          </Button>{" "}
        </ModalFooter>{" "}
      </Modal>{" "}
    </div>
  );
}

export default EditProfileModal;
