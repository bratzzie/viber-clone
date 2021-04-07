import styled from "styled-components";
import { SearchIcon } from "../styles/icons";
const SearchComponent = () => {
  return (
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
  );
};

export default SearchComponent;

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
