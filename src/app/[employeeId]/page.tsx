"use client";
import { ChangeEvent, MouseEvent, FormEvent, useEffect, useState } from "react";
import "./index.css";
import { useRouter, useParams } from "next/navigation";
import { ROUTE_HOME } from "utils/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IEmployee } from "app/page";

const GENDER = ["Male", "Female", "Transgender", "Others"];

const DESIGNATION = [
  "Founder",
  "CEO",
  "Director",
  "Manager",
  "Team Lead",
  "Developer",
  "Tester",
];

const DEFAULT_EMPLOYEE = {
  name: "",
  designation: DESIGNATION[0],
  gender: GENDER[0],
  dateOfBirth: "",
  profileImage: "",
  address: "",
};

const DEFAULT_ERR_STATE = {
  errName: "",
  errDesignation: "",
  errGender: "",
  errDateOfBirth: "",
  errProfileImage: "",
  errAddress: "",
  isValid: false,
  isClicked: false,
};

const UpdateEmployee = () => {
  const [employee, setEmployee] = useState(DEFAULT_EMPLOYEE);
  const [errData, setErrData] = useState(DEFAULT_ERR_STATE);
  const { replace } = useRouter();
  const { employeeId } = useParams();

  const { name, designation, dateOfBirth, gender, profileImage, address } =
    employee;

  const {
    errName,
    errDesignation,
    errDateOfBirth,
    errGender,
    errProfileImage,
    errAddress,
    isClicked,
  } = errData;

  const queryClient = useQueryClient();

  const { mutate: putEmployee } = useMutation({
    mutationFn: updateEmployee,
    onSuccess: (updatedEmployee) => {
      if (updatedEmployee) {
        /* Updating from existing cache */
        queryClient.setQueryData<IEmployee[]>(
          ["employees"],
          (oldEmployees = []) => {
            return oldEmployees?.map((oldEmployee) =>
              oldEmployee.id === updatedEmployee.id
                ? updatedEmployee
                : oldEmployee
            );
          }
        );

        replace(ROUTE_HOME);
      }
    },
  });

  useEffect(() => {
    if (isClicked) onValidate();
  }, [isClicked, employee]); //eslint-disable-line

  useEffect(() => {
    fetchEmployee();
  }, []); //eslint-disable-line

  const fetchEmployee = async () => {
    const response = await fetch(
      `https://66fe30af2b9aac9c997ab3b2.mockapi.io/employees/${employeeId}`
    );
    const employeeData = await response.json();
    setEmployee(employeeData);
  };

  const onValidate = () => {
    let errData = {
      ...DEFAULT_ERR_STATE,
      isClicked: true,
      isValid: true,
    };

    if (!name)
      errData = { ...errData, errName: "Please enter name", isValid: false };

    if (!designation)
      errData = {
        ...errData,
        errDesignation: "Please select designation",
        isValid: false,
      };

    if (!gender)
      errData = {
        ...errData,
        errGender: "Please select gender",
        isValid: false,
      };

    if (!dateOfBirth)
      errData = {
        ...errData,
        errDateOfBirth: "Please enter date of birth",
        isValid: false,
      };

    if (!profileImage)
      errData = {
        ...errData,
        errProfileImage: "Please enter profile image URL",
        isValid: false,
      };

    if (!address)
      errData = {
        ...errData,
        errAddress: "Please enter address",
        isValid: false,
      };

    setErrData(errData);

    return errData;
  };

  async function updateEmployee(
    e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    const { isValid } = onValidate();
    if (isValid) {
      const response = await fetch(
        `https://66fe30af2b9aac9c997ab3b2.mockapi.io/employees/${employeeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employee),
        }
      );

      const data = (await response.json()) as IEmployee;

      return data;
    }
  }

  const renderOption = (option: string) => (
    <option value={option} key={option}>
      {option}
    </option>
  );

  const onChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = target;

    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="name-input" onSubmit={putEmployee}>
      <input
        type="text"
        value={name}
        name="name"
        onChange={onChange}
        placeholder="Employee Name"
      />
      <label className="error-text">{errName}</label>
      <select value={designation} name="designation" onChange={onChange}>
        {DESIGNATION.map(renderOption)}
      </select>
      <label className="error-text">{errDesignation}</label>
      <select value={gender} name="gender" onChange={onChange}>
        {GENDER.map(renderOption)}
      </select>
      <label className="error-text">{errGender}</label>
      <input
        type="date"
        value={dateOfBirth}
        name="dateOfBirth"
        placeholder="Date of Birth"
        onChange={onChange}
      />
      <label className="error-text">{errDateOfBirth}</label>
      <input
        type="text"
        value={profileImage}
        name="profileImage"
        placeholder="Profile Image"
        onChange={onChange}
      />
      <label className="error-text">{errProfileImage}</label>
      <input
        type="text"
        value={address}
        name="address"
        placeholder="Address"
        onChange={onChange}
      />
      <label className="error-text">{errAddress}</label>
      <button onClick={putEmployee} type="submit">
        Update Employee
      </button>
    </form>
  );
};
export default UpdateEmployee;
