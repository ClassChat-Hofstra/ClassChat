import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Input } from "reactstrap";
import WomenAvatar5 from "../../../assets/img/women_avatar5.jpg";
import { useAuth } from "../../../contexts/AuthContext";

//Filepond
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function ChatFooter(props) {
  const { currentUser } = useAuth();
  const [userFullName, setName] = useState();
  const [fileVisiible, setFileVisible] = useState(false);
  const [file, setFile] = useState();

  useEffect(() => {
    console.log(file);
  }, [file]);

  axios
    .post("/auth/currentuser", { email: currentUser.email })
    .then((res) => setName(res.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      sender: {
        name: userFullName,
        email: currentUser.email,
      },
      avatar: (
        <figure className="avatar">
          <img src={WomenAvatar5} className="rounded-circle" alt="avatar" />
        </figure>
      ),
      body: props.inputMsg,
      date: new Date().toLocaleDateString(),
      type: "outgoing-message",
    });
  };

  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div className="chat-footer">
      {fileVisiible && (
        <FilePond
          onupdatefiles={setFile}
          allowMultiple={false}
          dropOnPage
          dropValidation
        ></FilePond>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          className="form-control"
          placeholder="Write a message."
          value={props.inputMsg}
          onChange={handleChange}
        />
        <div className="form-buttons">
          <Button
            color="light"
            className="btn-floating"
            onClick={() =>
              fileVisiible ? setFileVisible(false) : setFileVisible(true)
            }
          >
            <i className="fa fa-paperclip"></i>
          </Button>
          {/* <Button color="light" className="btn-floating">
            <i className="fa fa-microphone"></i>
          </Button> */}
          <Button color="primary" className="btn-floating">
            <i className="fa fa-send"></i>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChatFooter;
