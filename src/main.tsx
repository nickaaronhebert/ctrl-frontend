import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./redux/store.ts";
import { ApplicationUserContextProvider } from "./context/ApplicationUser/index.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ApplicationUserContextProvider>
      <Toaster position="bottom-right" richColors />
      <App />
    </ApplicationUserContextProvider>
  </Provider>
);
