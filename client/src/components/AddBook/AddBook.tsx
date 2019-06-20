import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../../graphQL/queries";
import { Author } from "../../graphQL/types";
import useStyles from "../../shared/styles";
import { Button, Typography, Divider, TextField } from "@material-ui/core";

type Data = {
  authors: Array<Author>;
};

const initialState = {
  name: "",
  genre: "",
  authorId: ""
};

const AddBook = () => {
  const [values, setValues] = useState(initialState);
  const { data, error, loading } = useQuery<Data>(getAuthorsQuery);
  const addBook = useMutation(addBookMutation);

  const handleChange = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    setValues({ ...values, [target.name]: target.value });
  };
  const submitForm = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    addBook({
      update: (proxy, mutationResult) => {
        console.log(mutationResult);
      },
      variables: values,
      refetchQueries: [{ query: getBooksQuery }]
    })
      .then(() => console.log("success"))
      .catch(err => console.log("error"));
    setValues({ ...initialState });
  };
  const classes = useStyles();

  let displayAuthors = null;
  if (loading) {
    displayAuthors = <option value="">Loading...</option>;
  }
  if (error) {
    displayAuthors = <option value="">Error!</option>;
  }
  if (data && data.authors) {
    displayAuthors = data.authors.map((author: Author) => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  }
  return (
    <>
      <Typography variant="h6" align="center" color="primary">
        <strong>Add Book to List</strong>
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
          label="Genre"
          name="genre"
          value={values.genre}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth={true}
          select
          label="Author"
          name="authorId"
          value={values.authorId}
          onChange={handleChange}
          helperText="Please select from our database"
          margin="normal"
          variant="outlined"
          SelectProps={{
            native: true
          }}
          required
        >
          <option value="" />
          {displayAuthors}
        </TextField>
        <Button
          type="submit"
          fullWidth={true}
          variant="contained"
          color="primary"
          size="large"
        >
          Add Book
        </Button>
      </form>
    </>
  );
};

export default AddBook;
