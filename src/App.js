import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee from "./pages/home";
import { AddEmployee } from "./pages/add-employee";
import { UpdateEmployee } from "./pages/update-employee";
import {
  ROUTE_HOME,
  ROUTE_ADD_EMPLOYEE,
  ROUTE_UPDATE_EMPLOYEE,
} from "./utils/routes";

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route Component={Employee} path={ROUTE_HOME} />
          <Route Component={AddEmployee} path={ROUTE_ADD_EMPLOYEE} />
          <Route Component={UpdateEmployee} path={ROUTE_UPDATE_EMPLOYEE} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
