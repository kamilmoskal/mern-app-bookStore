import React, { useState } from "react";
import { Author } from "../../graphQL/types";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { useQuery } from "react-apollo-hooks";
import { getAuthorsQuery } from "../../graphQL/queries";
import Button from "@material-ui/core/Button";

type Data = {
  authors: Array<Author>;
};

const AddBook = () => {
  const [values, setValues] = useState({
    name: "",
    genre: "",
    authorId: ""
  });
  const { data, error, loading } = useQuery<Data>(getAuthorsQuery);
  const handleChange = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    setValues({ ...values, [target.name]: target.value });
  };
  const submitForm = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    console.log(values);
  };
  const displayAuthors = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error!</div>;
    }
    if (data && data.authors) {
      return data.authors.map((author: Author) => (
        <MenuItem key={author.id} value={author.id}>
          {author.name}
        </MenuItem>
      ));
    }
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
        label="Genre"
        name="genre"
        value={values.genre}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
      />
      <TextField
        select
        label="Author"
        name="authorId"
        value={values.authorId}
        onChange={handleChange}
        helperText="Please select your currency"
        margin="normal"
        variant="outlined"
      >
        {displayAuthors()}
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        Add Book
      </Button>
    </form>
  );
};

export default AddBook;