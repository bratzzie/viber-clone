import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import PersonIcon from "@material-ui/icons/Person";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SearchIcon from "@material-ui/icons/Search";
import LaunchIcon from "@material-ui/icons/Launch";
import * as EmailValidator from "email-validator";

const Sidebar = () => {
  const createChat = () => {
    const input = prompt("With whom you want to talk today?");
    if (!input) return null;
  };

  return (
    <Container>
      <Header>
        <IconsContainer>
          <MyChatIcon fontSize="large" />
          <MyPersonIcon fontSize="large" />
          <MyMoreHorizon fontSize="large" />
        </IconsContainer>
      </Header>
      <Row>
        <Search>
          <SearchIcon
            style={{
              fontSize: 18,
              marginLeft: 10,
              fill: "purple",
              cursor: "pointer",
            }}
          />
          <SearchInput placeholder="Search..." />
        </Search>
        <MyLaunchIcon style={{ fontSize: 15 }} onClick={createChat} />
      </Row>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.4;
  padding: 20px 0;
`;
const Header = styled.div`
  position: sticky;
  top: 0;

  border-bottom: 1px solid whitesmoke;
`;
const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-bottom: 15px;
`;
const MyChatIcon = styled(ChatIcon)`
  cursor: pointer;
  color: gray;
  &:hover {
    fill: purple;
  }
`;
const MyPersonIcon = styled(PersonIcon)`
  cursor: pointer;
  color: gray;
  &:hover {
    fill: purple;
  }
`;
const MyMoreHorizon = styled(MoreHorizIcon)`
  cursor: pointer;
  color: gray;
  &:hover {
    fill: purple;
  }
`;
const MyLaunchIcon = styled(LaunchIcon)`
  cursor: pointer;
  color: gray;
  &:hover {
    fill: purple;
  }
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid violet;
  border-radius: 20px;
  margin: 15px;
`;

const SearchInput = styled.input`
  border-radius: 20px;
  border: none;

  background-color: transparent;
  padding: 5px;
  padding-left: 10px;
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
  border-bottom: 1px solid whitesmoke;
`;
