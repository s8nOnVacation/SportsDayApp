import ReactDOM from "react-dom/client";
import Router from "./router/Router";
import { QueryClient, QueryClientProvider } from "react-query";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

const client = new QueryClient();

root.render(
  <QueryClientProvider client={client}>
    <Router />
  </QueryClientProvider>
);
