import useSWR from "swr";
import { WantedPerson } from "./interfaces/WantedPersons";
import { useState } from "react";
import WantedPersonReport from "./components/WantedPersonReport";
import validOffices from "./validOffices";
import styled from "styled-components";

const WantedPersonReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WantedPersonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  width: 80%;
  margin: auto;
`;

const SuggestionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  max-height: 150px;
  overflow-y: auto;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const SuggestionItem = styled.li`
  padding: 2%;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  color: #333;
  margin: 4% 0;
  font-family: "Arial", sans-serif;
`;

const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
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
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: #007bff;
    box-shadow: 2px 2px 10px rgba(0, 123, 255, 0.5);
    outline: none;
  }
`;

const SearchButton = styled.button`
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
    box-shadow: 2px 2px 10px rgba(0, 86, 179, 0.5);
  }

  &:focus {
    outline: none;
    box-shadow: 2px 2px 10px rgba(0, 123, 255, 0.5);
  }
`;

// fetcher function which is basically a wrapper on the fetch function to be used with useSWR
const fetcher = async function (url: string): Promise<WantedPerson[]> {
  const res: Response = await fetch(url);

  if (!res.ok) {
    throw new Error("Error fetching data");
  } else {
    const data = await res.json();
    return data.items as WantedPerson[];
  }
};

function App() {
  const [officeStr, setOfficeStr] = useState<string>("");
  const [inputStr, setInputStr] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>(validOffices);

  // fetch data only when `officeStr` changes (i.e., user clicks Search or selects suggestion)
  const { data, error } = useSWR(
    `https://api.fbi.gov/wanted/v1/list?field_offices=${officeStr.toLowerCase()}`,
    fetcher
  );
  // Check for loading state
  if (!data) return <div>Loading...</div>;

  // Check for errors
  if (error) return <div>Error: {error.message}</div>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input: string = e.target.value;

    if (input.length > 0) {
      const filteredOffices: string[] = validOffices.filter((office) =>
        office.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredOffices);
    } else {
      setSuggestions(validOffices);
    }
    setInputStr(input);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputStr(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = () => {
    setOfficeStr(inputStr);
  };

  return (
    <WantedPersonReportContainer>
      <Title>FBI Most Wanted Lookup</Title>
      <SearchContainer>
        <SearchInput
          type="text"
          id="office-input"
          value={inputStr}
          onChange={handleInputChange}
          placeholder="Enter field office"
          autoComplete="off"
        />
        <SearchButton onClick={handleSubmit}>Search</SearchButton>
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
      <WantedPersonsContainer>
        {data.length > 0 ? (
          data.map((person) => (
            <WantedPersonReport key={person.uid} person={person} />
          ))
        ) : (
          <p>No results found for this office.</p>
        )}
      </WantedPersonsContainer>
    </WantedPersonReportContainer>
  );
}

export default App;
