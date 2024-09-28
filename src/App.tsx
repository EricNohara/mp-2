import useSWR from "swr";
import { WantedPerson } from "./interfaces/WantedPersons";
import { useState } from "react";
import WantedPersonReport from "./components/WantedPersonReport";
import validOffices from "./validOffices";
import styled from "styled-components";

const WantedPersonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  width: 80%;
  margin: auto;
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
    `https://api.fbi.gov/wanted/v1/list?field_offices=${officeStr}`,
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
    <div>
      <h1>FBI Most Wanted Lookup</h1>
      <input
        type="text"
        id="office-input"
        value={inputStr}
        onChange={handleInputChange}
        placeholder="Enter field office"
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleSubmit}>Search</button>
      <WantedPersonsContainer>
        {data.length > 0 ? (
          data.map((person) => (
            <WantedPersonReport key={person.uid} person={person} />
          ))
        ) : (
          <p>No results found for this office.</p>
        )}
      </WantedPersonsContainer>
    </div>
  );
}

export default App;
