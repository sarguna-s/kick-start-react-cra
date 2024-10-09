import { useState, useEffect, useMemo } from "react";
import "./index.css";
import { ListEmployee } from "../../components/list-employee";
import { useNavigate } from "react-router";
import { ROUTE_ADD_EMPLOYEE, routeUpdateEmployee } from "../../utils/routes";

const DEFAULT_EMPLOYEES = [];

const Home = () => {
  const [employees, setEmployees] = useState(DEFAULT_EMPLOYEES);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredEmployees = useMemo(
    () =>
      employees.filter(
        ({ name, dateOfBirth, designation, address, gender }) => {
          const searchText = search?.toLowerCase();
          return (
            name?.toLowerCase().includes(searchText) ||
            dateOfBirth?.toLowerCase().includes(searchText) ||
            designation?.toLowerCase().includes(searchText) ||
            address?.toLowerCase().includes(searchText) ||
            gender?.toLowerCase().includes(searchText)
          );
        }
      ),
    [employees, search]
  );

  const onNavAdd = () => navigate(ROUTE_ADD_EMPLOYEE);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch(
      "https://66fe30af2b9aac9c997ab3b2.mockapi.io/employees"
    );
    const employees = await response.json();
    setEmployees(employees);
  };

  const updateEmployee = async (id) => navigate(routeUpdateEmployee(id));

  const onChangeSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const deleteEmployee = async (id) => {
    const response = await fetch(
      `https://66fe30af2b9aac9c997ab3b2.mockapi.io/employees/${id}`,
      {
        method: "DELETE",
      }
    );
    const employee = await response.json();
    if (employee) setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const renderEmployee = (employee) => (
    <ListEmployee
      key={employee.id}
      employee={employee}
      onDelete={deleteEmployee}
      onUpdate={updateEmployee}
    />
  );

  return (
    <section className="details">
      <h1>Employee Management</h1>
      <input
        placeholder="Search by name"
        value={search}
        onChange={onChangeSearch}
      />
      <button onClick={onNavAdd}>Add Employee</button>
      <ul>{filteredEmployees.map(renderEmployee)}</ul>
    </section>
  );
};

export default Home;
