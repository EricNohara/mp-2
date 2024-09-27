import useSWR from "swr";

// fetcher function which is basically a wrapper on the fetch function to be used with useSWR
const fetcher = (url: string) => {
  return fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_API_NBA_SECRET_KEY,
      "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
    },
  }).then((res) => res.json());
};

function App() {
  return <></>;
}

export default App;
