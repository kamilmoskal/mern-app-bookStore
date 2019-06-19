import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useMutation } from "react-apollo-hooks";
import { getAuthorsQuery, addAuthorMutation } from "../../graphQL/queries";
import Button from "@material-ui/core/Button";

const initialState = {
  name: "",
  age: ""
};

const AddAuthor = () => {
  const [values, setValues] = useState(initialState);
  const addAuthor = useMutation(addAuthorMutation);
  const handleChange = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    setValues({ ...values, [target.name]: target.value });
  };
  const submitForm = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    console.log(values);
    addAuthor({
      update: (proxy, mutationResult) => {
        console.log(mutationResult);
      },
      variables: { name: values.name, age: parseInt(values.age) },
      refetchQueries: [{ query: getAuthorsQuery }]
    });
    setValues({ ...initialState });
  };
  return (
    <form onSubmit={submitForm}>
      <TextField
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Age"
        name="age"
        value={values.age}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        type="number"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Author
      </Button>
    </form>
  );
};

export default AddAuthor;
