import useSWR from "swr";
import { WantedPerson } from "./interfaces/WantedPersons";
import { useState } from "react";
import WantedPersonReport from "./components/WantedPersonReport";
import validOffices from "./validOffices";
import styled from "styled-components";
import SearchBar from "./components/SearchBar";

const WantedPersonReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  width: 80%;
  margin: auto;
  background-color: #1b1b1b;
`;

const WantedPersonsContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 80px;
  flex-grow: 1;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin: 6% 0 4% 0;

  @media screen and (max-width: 650px) {
    font-size: 2rem;
  }
`;

const CopyrightFooter = styled.footer`
  font-size: 1rem;
  display: flex;
  justify-content: center;
  padding: 2%;
  background-color: #004a77;
  color: white;
  flex-shrink: 0;

  @media screen and (max-width: 650px) {
    font-size: 0.8rem !important;
  }
`;

const NoResultsMessage = styled.p`
  text-align: center;
  margin-top: 5%;

  @media screen and (max-width: 650px) {
    font-size: 0.8rem !important;
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

  // fetch data
  const { data, error } = useSWR(
    `https://api.fbi.gov/wanted/v1/list?field_offices=${officeStr.toLowerCase()}`,
    fetcher
  );

  // check for loading state or errors
  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <WantedPersonReportContainer>
        <header>
          <Title>FBI Most Wanted Lookup</Title>
        </header>
        <SearchBar
          setOfficeStr={setOfficeStr}
          inputStr={inputStr}
          setInputStr={setInputStr}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
        />
        <WantedPersonsContainer>
          {data.length > 0 ? (
            data.map((person) => (
              <WantedPersonReport key={person.uid} person={person} />
            ))
          ) : (
            <NoResultsMessage>
              No results found for this office.
            </NoResultsMessage>
          )}
        </WantedPersonsContainer>
      </WantedPersonReportContainer>
      <CopyrightFooter>
        <p>All Rights Reserved by Eric Nohara-LeClair &copy;</p>
      </CopyrightFooter>
    </>
  );
}

export default App;
