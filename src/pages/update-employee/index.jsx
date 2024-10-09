import { useEffect, useState } from "react";
import "./index.css";
import { useNavigate, useParams } from "react-router";
import { ROUTE_HOME } from "../../utils/routes";

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

export const UpdateEmployee = () => {
  const [employee, setEmployee] = useState(DEFAULT_EMPLOYEE);
  const [errData, setErrData] = useState(DEFAULT_ERR_STATE);
  const navigate = useNavigate();
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

  const updateEmployee = async (e) => {
    e.preventDefault();
    const { isValid } = onValidate();
    if (isValid) {
      await fetch(
        `https://66fe30af2b9aac9c997ab3b2.mockapi.io/employees/${employeeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employee),
        }
      );
      navigate(ROUTE_HOME, { replace: true });
    }
  };

  const renderOption = (option) => (
    <option value={option} key={option}>
      {option}
    </option>
  );

  const onChange = ({ target }) => {
    const { value, name } = target;

    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="name-input" onSubmit={updateEmployee}>
      <input
        type="text"
        value={name}
        name="name"
        onChange={onChange}
        placeholder="Employee Name"
      />
      <label className="error-text">{errName}</label>
      <select
        type="text"
        value={designation}
        name="designation"
        placeholder="Designation"
        onChange={onChange}
      >
        {DESIGNATION.map(renderOption)}
      </select>
      <label className="error-text">{errDesignation}</label>
      <select type="text" value={gender} name="gender" onChange={onChange}>
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
      <button onClick={updateEmployee} type="submit">
        Update Employee
      </button>
    </form>
  );
};
