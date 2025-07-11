import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./redux/store.ts";
import { ApplicationUserContextProvider } from "./context/ApplicationUser/index.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ApplicationUserContextProvider>
      <App />
    </ApplicationUserContextProvider>
  </Provider>
);
