import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 1,
    },
  },
});

const AppProvider = () => {
  return (
    <Router>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </Router>
  );
};

export default AppProvider;
