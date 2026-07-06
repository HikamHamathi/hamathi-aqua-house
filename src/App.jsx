import Home from "./pages/Home";

function App() {

  const [search, setSearch] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
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