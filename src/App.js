import logo from "./logo.svg";
import "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/polaris";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Details from "./Details";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useState } from "react";

function App() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [username, setUsername] = useState("");
  // const [value, setValue] = useState("");
  // const [users, setUsers] = useState([]);
  // const [details, setDetails] = useState({});
  // const [message, setMessage] = useState("");
  // const [fieldErrors, setFieldErrors] = useState({});
  // const [isRepoLoading, setIsRepoLoading] = useState(true);

  return (
    <AppProvider>
      <Provider store={store}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
              // username={username}
              // setUsername={setUsername}
              // isLoading={isLoading}
              // setIsLoading={setIsLoading}
              // value={value}
              // setValue={setValue}
              // details={details}
              // setDetails={setDetails}
              // message={message}
              // setMessage={setMessage}
              // fieldErrors={fieldErrors}
              // setFieldErrors={setFieldErrors}
              // isRepoLoading={isRepoLoading}
              // setIsRepoLoading={setIsRepoLoading}
              />
            }
          ></Route>
          <Route
            path="/details"
            element={
              <Details
              // username={username}
              // isLoading={isLoading}
              // setIsLoading={setIsLoading}
              // value={value}
              // setValue={setValue}
              // details={details}
              // setDetails={setDetails}
              // message={message}
              // setMessage={setMessage}
              // fieldErrors={fieldErrors}
              // setFieldErrors={setFieldErrors}
              />
            }
          ></Route>
        </Routes>
      </Provider>
    </AppProvider>
  );
}

export default App;
