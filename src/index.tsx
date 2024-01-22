import ReactDOM from "react-dom";
import Root from "./Root";
import store from "./store/store";
import { Provider } from "react-redux";
import { Web3ContextProvider } from "./hooks";
import { SnackbarMessage, SnackbarProvider } from "notistack";
import SnackMessage from "./components/Messages/snackbar";
import { Message } from "./store/slices/messages-slice";

ReactDOM.render(
  <SnackbarProvider
    maxSnack={4}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    content={(key, message: Message) => <SnackMessage id={key} message={message} />}
    autoHideDuration={10000}
  >
    <Provider store={store}>
      <Web3ContextProvider>
        <Root />
      </Web3ContextProvider>
    </Provider>
  </SnackbarProvider>,
  document.getElementById("root"),
);
