import styled from "styled-components";
import * as EmailValidator from "email-validator";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  ChatIcon,
  PersonIcon,
  MoreHorizIcon,
  SearchIcon,
  LaunchIcon,
} from "../styles/icons";
import Chat from "./Chat";

const Sidebar = () => {
  // Local user
  const [user] = useAuthState(auth);

  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  // To find someone
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
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Log out from Viber"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you really want to log out? 😿
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                No
              </Button>
              <Button onClick={handleSignOut} color="primary">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Header>
      <Row>
        <Search>
          <SearchIcon
            style={{
              fontSize: 18,
              marginLeft: 10,
              fill: "var(--darker_gray)",

              cursor: "pointer",
            }}
          />
          <SearchInput placeholder="Search..." />
        </Search>
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
const Search = styled.div`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: var(--gray);
`;

const SearchInput = styled.input`
  border-radius: 20px;
  border: none;

  background-color: transparent;
  padding: 10px;
  padding-bottom: 5px;
  &:focus,
  &:active {
    box-shadow: none !important;
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    outline: none !important;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  border-bottom: 1px solid var(--border);
  justify-content: space-evenly;
`;
