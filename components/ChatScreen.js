import { Avatar } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import {
  PersonAddOutlinedIcon,
  CallOutlinedIcon,
  VideocamOutlinedIcon,
  InfoOutlinedIcon,
  AddIcon,
  GifIcon,
  MoodIcon,
  MicNoneIcon,
} from "../styles/icons";
import { useCollection } from "react-firebase-hooks/firestore";

import Message from "./Message";
import { useRef, useState } from "react";
import firebase from "firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef(null);
  // get messages query
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  // get query of recipient
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );

  // function to show messages
  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  // scroll every time new message appairs
  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // function to send messages
  const sendMessage = (e) => {
    e.preventDefault();

    // if no -> set last seen, if already -> set last seen
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    // extually adding messages
    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
      name: user.displayName,
    });
    setInput("");
    scrollToBottom();
  };
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Section>
      <Header>
        <Row>
          {recipient ? (
            <Avatar
              variant="rounded"
              style={{
                width: 50,
                height: 50,
                alignSelf: "center",
                borderRadius: 19,
              }}
              src={recipient?.photoURL}
            />
          ) : (
            <Avatar
              variant="rounded"
              style={{
                width: 50,
                height: 50,
                alignSelf: "center",
                borderRadius: 19,
              }}
            >
              {recipientEmail[0]}
            </Avatar>
          )}

          <Info>
            {recipient ? <h1>{recipient?.name}</h1> : <h1>{recipientEmail}</h1>}
            {recipientSnapshot ? (
              <p>
                Last active:{" "}
                {recipient?.lastSeen?.toDate() ? (
                  <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                ) : (
                  "recently"
                )}
              </p>
            ) : (
              <p>Loading...</p>
            )}
          </Info>
        </Row>

        <HeaderIcons>
          <MyPersonAddOutlinedIcon style={{ fontSize: 27 }} />
          <MyCallOutlinedIcon style={{ fontSize: 27 }} />
          <MyVideocamOutlinedIcon style={{ fontSize: 27 }} />
          <MyInfoOutlinedIcon style={{ fontSize: 27 }} />
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef} />
      </MessageContainer>
      <InputContainer>
        <MyAddIcon />
        <MyGifIcon />
        <MyMoodIcon />
        <Input
          placeholder="Write a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <MicNoneIcon
          style={{
            color: "#FFF",
            backgroundColor: "var(--prime)",
            borderRadius: 25,
            fontSize: 42,
            padding: "8px",
            cursor: "pointer",
          }}
        />
      </InputContainer>
    </Section>
  );
};

export default ChatScreen;
const Section = styled.div`
  flex: 1;
  align-items: flex-start;
`;
const Header = styled.div`
  position: sticky;
  background-color: #fff;
  z-index: 5;
  top: 0;
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;
const Info = styled.div`
  margin-left: 15px;
  align-items: flex-start;
  h1 {
    font-size: clamp(0.2rem, 6vw, 1rem);
    font-weight: 400;
  }

  p {
    font-weight: 400;
    font-size: clamp(0.1rem, 6vw, 0.7rem);
    transform: translateY(-10px);
    color: var(--darker_gray);
  }
`;
const HeaderIcons = styled.div``;
const MyPersonAddOutlinedIcon = styled(PersonAddOutlinedIcon)`
  cursor: pointer;
  color: var(--prime);
  &:hover {
    fill: #8118f2;
  }
  margin-left: 5px;
  margin-right: 5px;
`;
const MyCallOutlinedIcon = styled(CallOutlinedIcon)`
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
  color: var(--prime);
  &:hover {
    fill: #8118f2;
  }
`;
const MyVideocamOutlinedIcon = styled(VideocamOutlinedIcon)`
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
  color: var(--prime);
  &:hover {
    fill: #8118f2;
  }
`;
const MyInfoOutlinedIcon = styled(InfoOutlinedIcon)`
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
  color: var(--prime);
  &:hover {
    fill: #8118f2;
  }
`;
const MyAddIcon = styled(AddIcon)`
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
  color: var(--second);
  &:hover {
    fill: #8118f2;
  }
`;
const MyGifIcon = styled(GifIcon)`
  margin-left: 5px;
  margin-right: 5px;
  color: var(--second);
  &:hover {
    fill: #8118f2;
  }
  cursor: pointer;
`;
const MyMoodIcon = styled(MoodIcon)`
  margin-left: 5px;
  margin-right: 5px;
  color: var(--second);
  &:hover {
    fill: purple;
  }
  cursor: pointer;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const MessageContainer = styled.div`
  padding: 30px;
  min-height: 75vh;
`;
const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: #fff;
  z-index: 1000;
  padding-left: 15px;
  padding-right: 15px;
  border-top: 2px solid var(--border);
`;
const Input = styled.input`
  flex: 1;
  align-items: center;
  padding: 10px;
  &:focus,
  &:active {
    box-shadow: none !important;
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    outline: none !important;
  }
  font-weight: 500;

  position: sticky;
  bottom: 0;
  background-color: #fff;
  border: none;
`;
