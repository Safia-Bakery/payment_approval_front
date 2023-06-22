import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EPresetTimes } from "./utils/types";
import { BrowserRouter } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useAppSelector } from "./redux/utils/types";
import { tokenSelector } from "./redux/reducers/authReducer";
import { useLayoutEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Routes from "components/Routes";
import { ToastContainer } from "react-toastify";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: EPresetTimes.HOUR,
      staleTime: EPresetTimes.MINUTE * 30,
    },
  },
});

const App = () => {
  const token = useAppSelector(tokenSelector);

  useLayoutEffect(() => {
    if (token) axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
