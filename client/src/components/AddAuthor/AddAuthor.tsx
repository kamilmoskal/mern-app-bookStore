import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { getAuthorsQuery, addAuthorMutation } from '../../graphQL/queries';
import useStyles from '../../shared/styles';
import { TextField, Button, Typography, Divider } from '@material-ui/core';

const initialState = {
  name: '',
  age: ''
};

export const AddAuthor = () => {
  const [values, setValues] = useState(initialState);
  const addAuthor = useMutation(addAuthorMutation);

  const handleChange = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    setValues({ ...values, [target.name]: target.value });
  };
  const submitForm = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    addAuthor({
      update: (proxy, mutationResult) => {
        console.log(mutationResult);
      },
      variables: { name: values.name, age: parseInt(values.age) },
      refetchQueries: [{ query: getAuthorsQuery }]
    });
    setValues({ ...initialState });
  };
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6" align="center" color="primary">
        <strong>Add Author to Store</strong>
      </Typography>
      <Divider className={classes.divider} />
      <form onSubmit={submitForm}>
        <TextField
          fullWidth={true}
          label="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth={true}
          label="Age"
          name="age"
          value={values.age}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          type="number"
          required
          inputProps={{ min: 1, max: 130 }}
        />
        <Button
          type="submit"
          fullWidth={true}
          variant="contained"
          color="primary"
          size="large"
        >
          Add Author
        </Button>
      </form>
    </>
  );
};

export default AddAuthor;
