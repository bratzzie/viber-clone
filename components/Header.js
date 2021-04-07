import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import {
  SettingsRoundedIcon,
  ArrowBackIosRoundedIcon,
  ArrowForwardIosRoundedIcon,
} from "../styles/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Header = () => {
  // to get user's avatar
  const [user] = useAuthState(auth);
  return (
    <Section>
      <Row>
        <ArrowBackIosRoundedIcon
          style={{
            marginLeft: 10,
            color: "var(--darker_gray)",
          }}
        />
        <ArrowForwardIosRoundedIcon
          style={{
            color: "var(--darker_gray)",
            marginRight: 10,
          }}
        />
        <p
          style={{
            cursor: "pointer",
            color: "var(--darker_gray)",
            paddingLeft: 20,
          }}
        >
          Reference
        </p>
      </Row>

      <Row>
        <Avatar
          variant="rounded"
          style={{
            width: 25,
            height: 25,
            alignSelf: "center",
            borderRadius: 10,
            marginRight: 10,
          }}
          src={user?.photoURL}
        />
        <p
          style={{
            color: "var(--darker_gray)",

            fontSize: 15,
          }}
        >
          2.00 USD
        </p>
        <Money>
          <span>Add Credits</span>
        </Money>
        <SettingsRoundedIcon
          style={{
            color: "var(--darker_gray)",
            margin: 5,
          }}
        />
      </Row>
    </Section>
  );
};

export default Header;
const Section = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: var(--gray);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  margin: 0;
  padding: 0;
  max-height: 35px;
`;

const Money = styled.div`
  border-radius: 25px;
  background-color: var(--button);
  color: #fff;
  padding: 0px 15px 5px 15px;
  align-items: center;
  justify-content: center;
  transition-duration: 0.3s;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
  span {
    font-size: clamp(0.1rem, 6vw, 0.8rem);
  }

  &:hover {
    background-color: green;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0;
`;
