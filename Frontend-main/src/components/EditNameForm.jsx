import { useState } from "react";
import { setData } from "../store/store";
import { useSelector, useDispatch } from "react-redux";

export default function EditNameForm({ setEditing }) {

  const token = useSelector((state) => state.token.token);
  const {userName, firstName, lastName} = useSelector((store) => store.userData);
  const dispatch = useDispatch();
  const [newUserName, setNewUserName] = useState(userName)

  async function handleFormSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3001/api/v1/user/profile", {
      method: "put",
      headers: {
        Authorization: `Bearer  ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: newUserName }),
    })
      .then((response) => response.json())
      .then((data) => {
        setEditing(false);
        dispatch(setData(data.body));
      });
  }

  return (
    <form onSubmit={handleFormSubmit} className="edit-name-form">
      <div>
        <input
          type="text"
          id="first-name"
          className="edit-input--form"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <input
          type="text"
          id="first-name"
          className="edit-input--form"
          value={firstName}
          disabled
        />
        <input
          type="text"
          id="last-name"
          className="edit-input--form"
          value={lastName}
          disabled
        />
      </div>
      <div>
        <button type="submit" className="edit-button edit-button--form">
          Save
        </button>
        <button
          className="edit-button edit-button--form"
          onClick={() => setEditing(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
