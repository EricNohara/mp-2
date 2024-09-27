import useSWR from "swr";
import { WantedPerson } from "./interfaces/WantedPersons";
import { useState } from "react";
import WantedPersonReport from "./components/WantedPersonReport";

// fetcher function which is basically a wrapper on the fetch function to be used with useSWR
const fetcher = async function (url: string): Promise<GameData[]> {
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

  // fetch
  const { data, error } = useSWR(
    `https://api.fbi.gov/wanted/v1/list?field_offices=${officeStr}`,
    fetcher
  );

  // Check for loading state
  if (!data) return <div>Loading...</div>;

  // Check for errors
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Wanted Persons Lookup</h1>
      <input
        type="text"
        value={officeStr}
        onChange={(e) => setOfficeStr(e.target.value)}
        placeholder="Enter field office"
      />
      <ul>
        {data.length > 0 ? (
          data.map((person) => (
            <WantedPersonReport key={person.uid} person={person} />
          ))
        ) : (
          <p>No results found for this office.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
