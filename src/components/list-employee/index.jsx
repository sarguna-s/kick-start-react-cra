export const ListEmployee = ({
  id,
  name,
  designation,
  gender,
  dateOfBirth,
  profileImage,
  address,
  onUpdate,
  onDelete,
}) => {
  return (
    <li key={id}>
      <img src={profileImage} alt={name} />
      <p>
        Employee Name: <b>{name}</b>
      </p>
      <p>
        Employee Designation: <b>{designation}</b>
      </p>
      <p>
        Employee Gender: <b>{gender}</b>
      </p>
      <p>
        Employee DOB: <b>{dateOfBirth}</b>
      </p>
      <p>
        Employee Address: <b>{address}</b>
      </p>

      <button onClick={onUpdate.bind(null, id)}>Edit</button>
      <button onClick={onDelete.bind(null, id)}>Delete</button>
    </li>
  );
};
