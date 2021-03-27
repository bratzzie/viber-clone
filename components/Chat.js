import { Avatar, Container } from "@material-ui/core";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

const Chat = ({ id, users }) => {
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  // routing
  const router = useRouter();
  const enterChat = () => {
    router.push(`/chat/${id}`);
  };
  return (
    <Section onClick={enterChat}>
      <Wrapper style={{ flexDirection: "row" }}>
        {recipient ? (
          <UserAvatar
            src={recipient?.photoURL}
            variant="rounded"
            style={{ borderRadius: 15 }}
          />
        ) : (
          <UserAvatar style={{ borderRadius: 15 }} variant="rounded">
            {recipientEmail[0]}
          </UserAvatar>
        )}
        {recipient ? (
          <p style={{ textTransform: "uppercase" }}>{recipient?.name}</p>
        ) : (
          <p>{recipientEmail}</p>
        )}
      </Wrapper>
    </Section>
  );
};

export default Chat;
const Section = styled(Container)`
  transition-duration: 0.3s;
  :hover {
    background-color: #e9eaeb;
  }

  margin-top: 7px;
  cursor: pointer;
  border-bottom: 1px solid whitesmoke;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  word-break: break-word;
`;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-left: 0;
  margin-right: 15px;
`;
