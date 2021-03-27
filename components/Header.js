import styled from "styled-components";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { Avatar } from "@material-ui/core";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Header = () => {
  const [user] = useAuthState(auth);
  return (
    <Section>
      <Row>
        <ArrowBackIosRoundedIcon
          style={{
            borderRight: "1px solid #fff",
            marginLeft: 10,
          }}
        />
        <ArrowForwardIosRoundedIcon
          style={{
            borderRight: "1px solid #fff",

            marginRight: 10,
          }}
        />
        <p style={{ cursor: "pointer" }}>Reference</p>
      </Row>

      <Row>
        <Avatar
          variant="rounded"
          style={{
            width: 30,
            height: 30,
            alignSelf: "center",
            borderRadius: 10,
            marginRight: 10,
          }}
          src={user?.photoURL}
        />
        <p style={{ marginRight: 15 }}>2.00 USD</p>
        <Money>
          <span>Add Credits</span>
        </Money>
        <SettingsRoundedIcon />
      </Row>
    </Section>
  );
};

export default Header;
const Section = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: whitesmoke;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
`;

const Money = styled.div`
  border-radius: 25px;
  background-color: green;
  color: #fff;
  padding: 0px 15px 5px 15px;
  align-items: center;
  justify-content: center;
  transition-duration: 0.3s;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
  span {
    font-size: clamp(0.1rem, 6vw, 0.8rem);
  }

  &:hover {
    background-color: #000;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
