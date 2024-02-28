import "./App.css";
import LayoutComponent from "./layout/layoutComponent";
import { Provider } from "react-redux";
import { createStore } from "redux";
import storeCombine from "./store/combineRedusers";
import { ToastContainer } from "react-toastify";
import AppRouter from "./routes/Router";
import { BrowserRouter } from "react-router-dom";

function App() {
  const storeAll = createStore(storeCombine);

  return (
    <Provider store={storeAll}>
      <BrowserRouter>
        <LayoutComponent>
          <ToastContainer />
          <AppRouter />
        </LayoutComponent>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
