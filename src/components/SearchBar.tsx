import styled from "styled-components";
import validOffices from "../validOffices";

// styled components used to style the search bar and suggestion list
const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: 70% 28%;
  gap: 2%;
  padding: 0 20% 2% 20%;
  width: 100%;
`;

const SearchInput = styled.input`
  padding: 2%;
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  font-family: "Special Elite", sans-serif !important;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  background-color: inherit;
  color: inherit;

  &:focus {
    border-color: #007bff;
    box-shadow: 2px 2px 10px rgba(0, 123, 255, 0.5);
    outline: none;
  }

  @media screen and (max-width: 650px) {
    font-size: 0.8rem !important;
  }
`;

const SearchButton = styled.button`
  font-size: 1rem;
  font-family: "Special Elite", sans-serif !important;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    background-color: #004a77;
    box-shadow: 2px 2px 10px rgba(0, 86, 179, 0.5);
  }

  &:focus {
    outline: none;
    box-shadow: 2px 2px 10px rgba(0, 123, 255, 0.5);
  }

  @media screen and (max-width: 650px) {
    font-size: 0.8rem !important;
  }
`;

const SuggestionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  max-height: 150px;
  overflow-y: auto;
  background-color: black;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const SuggestionItem = styled.li`
  padding: 2%;
  cursor: pointer;
  &:hover {
    background-color: #004a77;
  }

  @media screen and (max-width: 650px) {
    font-size: 0.8rem !important;
  }
`;

interface SearchBarProps {
  setOfficeStr: (office: string) => void;
  inputStr: string;
  setInputStr: (input: string) => void;
  suggestions: string[];
  setSuggestions: (suggestions: string[]) => void;
}

// SearchBar component which takes in the search bar props
const SearchBar: React.FC<SearchBarProps> = ({
  setOfficeStr,
  inputStr,
  setInputStr,
  suggestions,
  setSuggestions,
}) => {
  // used when the input value is changed - changes the suggestions and input string state variables in the parent component
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input: string = e.target.value;

    if (input.length > 0) {
      // filter only offices that contains the query string
      const filteredOffices: string[] = validOffices.filter((office) =>
        office.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredOffices); // set the suggestions to the filtered offices
    } else {
      setSuggestions(validOffices); // if there is no query, display all suggestions
    }
    setInputStr(input); // change the value of the input string
  };

  // used when a suggestion is clicked - input and office string is set to that value and page is reloaded with content
  const handleSuggestionClick = (suggestion: string) => {
    setInputStr(suggestion);
    setSuggestions([]);
    setOfficeStr(suggestion); // set the office string
  };

  // used when the search button is clicked - reload page with content and clear suggestions list
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSuggestions([]);
    setOfficeStr(inputStr);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        id="office-input"
        value={inputStr}
        onChange={handleInputChange}
        placeholder="Enter field office"
        autoComplete="off"
      />
      <SearchButton onClick={handleSubmit}>
        <span className="material-symbols-outlined">search</span>
      </SearchButton>
      {suggestions.length > 0 && (
        <SuggestionsList className="suggestions">
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
