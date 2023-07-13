import { Provider } from "react-redux";
import store from "./store/index";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchParams from "./pages/SearchParams";
import Details from "./pages/Details";

// import AdoptedPetContext from "./context/AdoptedPet";
import { Pet } from "./types/APIResponsesTypes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  // const adoptedPet = useState(null as Pet | null);
  return (
    <div
      className="m-0 min-h-screen p-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
      }}
    >
      <BrowserRouter>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <header className="mb-10 w-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-center">
              <Link className="text-6xl text-white hover:text-gray-200" to="/">
                Adopt Me!
              </Link>
            </header>
            <Routes>
              <Route path="details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </QueryClientProvider>
        </Provider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("No container to render to");
}
const root = createRoot(container);
root.render(<App />);
