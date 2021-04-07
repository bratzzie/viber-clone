import styled from "styled-components";
import * as EmailValidator from "email-validator";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  ChatIcon,
  PersonIcon,
  MoreHorizIcon,
  LaunchIcon,
} from "../styles/icons";
import Chat from "./Chat";
import SearchComponent from "./Search";
import Modal from "./Modal";

const Sidebar = () => {
  // Local user
  const [user] = useAuthState(auth);

  // to get all chats
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  // To add someone
  const createChat = () => {
    const input = prompt("With whom you want to talk today?");
    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input], //Object in our db, that contains an array of local user and that, with whom we want to talk
      });
    }
  };

  //Make sure this chat doesn't already exists
  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  //!! stands for returning true or false - true for some definite value, false -for undefined and other stuff like this

  // To log out
  const [open, setOpen] = useState(false);

  // functions to handle modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    setOpen(false);
    auth.signOut();
  };

  return (
    <Container>
      <Header>
        <IconsContainer>
          <MyChatIcon fontSize="large" />
          <MyPersonIcon fontSize="large" />
          <MyMoreHorizon fontSize="large" onClick={handleClickOpen} />
        </IconsContainer>
        <Modal
          open={open}
          handleClose={handleClose}
          handleSignOut={handleSignOut}
        />
      </Header>
      <Row>
        <SearchComponent />
        <MyLaunchIcon style={{ fontSize: 15 }} onClick={createChat} />
      </Row>

      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.25;
  padding: 20px 0px;
  border-right: 1px solid var(--border);
  height: 100vh;
  overflow-y: scroll;
  min-width: 150px;
  ::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none;
  scrollbar-width: none;
`;
const Header = styled.div`
  position: sticky;
  top: 0;

  border-bottom: 1px solid var(--border);
`;
const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-bottom: 15px;
`;
const MyChatIcon = styled(ChatIcon)`
  cursor: pointer;
  color: var(--second);
  &:hover {
    fill: var(--prime);
  }
`;
const MyPersonIcon = styled(PersonIcon)`
  cursor: pointer;
  color: var(--second);
  &:hover {
    fill: var(--prime);
  }
`;
const MyMoreHorizon = styled(MoreHorizIcon)`
  cursor: pointer;
  color: var(--second);
  &:hover {
    fill: var(--prime);
  }
`;

const MyLaunchIcon = styled(LaunchIcon)`
  cursor: pointer;
  color: var(--darker_gray);
  &:hover {
    fill: var(--prime);
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  border-bottom: 1px solid var(--border);
  justify-content: space-evenly;
`;
