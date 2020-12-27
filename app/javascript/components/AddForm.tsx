import * as React from 'react';
import { useDispatch } from 'react-redux';
import { HiPlus } from 'react-icons/hi';

export default function AddForm({ actionCreator, item }) {
  const [isAdd, setAdd] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const dispatch = useDispatch();
  const handleSubmit = event => {
    event.preventDefault();
    if (newName.length > 0) {
      dispatch(actionCreator(newName));
    }
    setNewName("");
  };

  if (isAdd) {
    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          autoFocus
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <input
          type="submit"
          value={`Add ${item}`}
        />
      </form>
    );
  } else {
    return (
      <div className="add-form" onClick={() => setAdd(true)}>
        <HiPlus />
        Add {item}
      </div>
    );
  }
}