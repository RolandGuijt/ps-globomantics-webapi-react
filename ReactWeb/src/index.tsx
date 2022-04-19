import ReactDOM from "react-dom";
import App from "./main/App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["x-csrf"] = 1;
const queryClient = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
registerServiceWorker();
