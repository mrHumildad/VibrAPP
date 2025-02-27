import PropTypes from "prop-types";

const UserLogs = ({user}) => {
  //console.log(user)
  return (
    <ul id="userdata">
      <li className="userLog">LV {user.length}
        <span id="levelLog"></span>
      </li>
      {user[0] && user.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  );
}

UserLogs.propTypes = {
  user: PropTypes.array.isRequired, // Ensures it's an array but allows any type inside
};

export default UserLogs;
