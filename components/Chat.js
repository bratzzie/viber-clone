import { Avatar, Container } from "@material-ui/core";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import TimeAgo from "timeago-react";

const Chat = ({ id, users }) => {
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);
  const [recipientSnapshot] = useCollection(
    db
      ?.collection("users")
      ?.where("email", "==", getRecipientEmail(users, user))
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          {recipient ? (
            <UserAvatar
              src={recipient?.photoURL}
              variant="rounded"
              style={{ borderRadius: 18, alignSelf: "flex-start" }}
            />
          ) : (
            <UserAvatar
              style={{ borderRadius: 18, alignSelf: "flex-start" }}
              variant="rounded"
            >
              {recipientEmail[0]}
            </UserAvatar>
          )}
          {recipient ? (
            <p
              style={{
                textTransform: "uppercase",
                fontWeight: 600,
                alignSelf: "flex-start",
              }}
            >
              {recipient?.name}
            </p>
          ) : (
            <p style={{ fontWeight: 600, alignSelf: "flex-start" }}>
              {recipientEmail}
            </p>
          )}
        </div>

        {recipientSnapshot ? (
          <TimeStamp>
            {recipient?.lastSeen?.toDate() ? (
              <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
            ) : (
              "recently"
            )}
          </TimeStamp>
        ) : (
          <TimeStamp>Loading...</TimeStamp>
        )}
      </Wrapper>
    </Section>
  );
};

export default Chat;
const Section = styled(Container)`
  transition-duration: 0.3s;
  padding-top: 5px;
  padding-bottom: 5px;
  :hover {
    background-color: var(--blue);
  }

  cursor: pointer;
  border-bottom: 1px solid var(--border);
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  word-break: break-word;
`;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-left: 0;
  margin-right: 15px;
  width: 45px;
  height: 45px;
`;

const TimeStamp = styled.p`
  color: var(--darker_gray);

  font-size: 9px; //TODO:
  text-align: right;
`;
