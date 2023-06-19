import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { EPresetTimes } from "./utils/types";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import CreateOrder from "./pages/CreateOrder";
import SideBar from "./components/SideBar";
import ActiveOrders from "./pages/ActiveOrders";
import HistoryOrders from "./pages/HistoryOrders";

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
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {true && <SideBar />}
        <Routes>
          <Route element={<CreateOrder />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<ActiveOrders />} path="/active-orders" />
          <Route element={<HistoryOrders />} path="/history-orders" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
