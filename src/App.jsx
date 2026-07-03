import Home from "./pages/Home";
import { useState } from "react";

function App() {

  const [search, setSearch] = useState("");

  return (
    <>
      <Home
        search={search}
        setSearch={setSearch}
      />
    </>
  );
}

export default App;