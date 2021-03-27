import { Container } from "@material-ui/core";
import Sidebar from "../../components/Sidebar";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Head from "next/head";
import Header from "../../components/Header";

const Chat = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  return (
    <>
      <Head>
        <title>Viber Web Chat</title>
      </Head>

      <main style={{ display: "flex", flexDirection: "column" }}>
        <Header />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Sidebar />
          <ChatContainer>
            <ChatScreen chat={chat} messages={messages} />
          </ChatContainer>
        </div>
      </main>
    </>
  );
};

export default Chat;
const ChatContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: scroll;
  height: 100vh;
  justify-content: flex-start;
  align-items: flex-start;
  ::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none;
  scrollbar-width: none;
`;

// server side
export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  // messages
  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      temastamp: messages.timestamp.toDate().getTime(),
    }));

  // chats
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    // end
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
