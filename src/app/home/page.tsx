"use client";

import { useState, useEffect, useMemo, ChangeEvent } from "react";
import "./index.css";
import { ListEmployee } from "../../components/list-employee";
import { useRouter } from "next/navigation";
import { ROUTE_ADD_EMPLOYEE, routeUpdateEmployee } from "../../utils/routes";

interface IEmployee {
  id: string;
  name: string;
  dateOfBirth: string;
  designation: string;
  address: string;
  gender: string;
}

const Home = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [search, setSearch] = useState("");
  const { push } = useRouter();

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

  const onNavAdd = () => push(ROUTE_ADD_EMPLOYEE);

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

  const updateEmployee = (id: string) => push(routeUpdateEmployee(id));

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const deleteEmployee = async (id: string) => {
    const response = await fetch(
      `https://66fe30af2b9aac9c997ab3b2.mockapi.io/employees/${id}`,
      {
        method: "DELETE",
      }
    );

    const employee = await response.json();
    if (employee) setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const renderEmployee = (employee: IEmployee) => (
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
