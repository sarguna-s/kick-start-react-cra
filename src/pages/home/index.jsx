import { useState, useEffect } from "react";
import "./index.css";
import { ListEmployee } from "../../components/list-employee";
import { useNavigate } from "react-router";
import { ROUTE_ADD_EMPLOYEE, routeUpdateEmployee } from "../../utils/routes";

const DEFAULT_EMPLOYEES = [];

const Employee = () => {
  const [employees, setEmployees] = useState(DEFAULT_EMPLOYEES);
  const navigate = useNavigate();

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

  const renderEmployee = ({
    id,
    name,
    designation,
    gender,
    dateOfBirth,
    profileImage,
    address,
  }) => (
    <ListEmployee
      key={id}
      id={id}
      name={name}
      designation={designation}
      gender={gender}
      dateOfBirth={dateOfBirth}
      profileImage={profileImage}
      address={address}
      onDelete={deleteEmployee}
      onUpdate={updateEmployee}
    />
  );

  return (
    <section className="details">
      <h1>Employee Management</h1>
      <button onClick={onNavAdd}>Add Employee</button>
      <ul>{employees.map(renderEmployee)}</ul>
    </section>
  );
};

export default Employee;
