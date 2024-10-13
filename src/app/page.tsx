"use client";

import { useState, useMemo, ChangeEvent } from "react";
import "./index.css";
import { ListEmployee } from "../components/list-employee";
import { useRouter } from "next/navigation";
import { ROUTE_ADD_EMPLOYEE, routeUpdateEmployee } from "../utils/routes";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Link from "next/link";

export interface IEmployee {
  id: string;
  name: string;
  dateOfBirth: string;
  designation: string;
  address: string;
  gender: string;
}

const Home = () => {
  const [search, setSearch] = useState("");
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const {
    data: employees = [],
    refetch: refreshUsers,
    isLoading,
    isFetching,
  } = useQuery<IEmployee[]>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const { mutate: removeEmployee } = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: (_, employeeId) => {
      /* Removing from existing cache */
      queryClient.setQueryData<IEmployee[]>(["employees"], (oldEmployees) =>
        oldEmployees?.filter(({ id }) => id !== employeeId)
      );
      // queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

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

  async function fetchEmployees() {
    const response = await fetch(
      "https://66fe30af2b9aac9c997ab3b2.mockapi.io/employees"
    );

    return await response.json();
  }

  const updateEmployee = (id: string) => push(routeUpdateEmployee(id));

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  async function deleteEmployee(employeeId: string) {
    const response = await fetch(
      `https://66fe30af2b9aac9c997ab3b2.mockapi.io/employees/${employeeId}`,
      {
        method: "DELETE",
      }
    );

    return (await response.json()) as IEmployee;
  }

  const renderEmployee = (employee: IEmployee) => (
    <ListEmployee
      key={employee.id}
      employee={employee}
      onDelete={removeEmployee}
      onUpdate={updateEmployee}
    />
  );

  return isLoading ? (
    <h1>Loading....</h1> /* : isFetching ? (
    <h1>Data is Fetching....</h1>
  ) */
  ) : (
    <section className="details">
      <h1>Employee Management</h1>
      <input
        placeholder="Search by name"
        value={search}
        onChange={onChangeSearch}
      />

      <Link href={ROUTE_ADD_EMPLOYEE}>
        <button>Add Employee</button>
      </Link>
      <ul>{filteredEmployees.map(renderEmployee)}</ul>
    </section>
  );
};
export default Home;
