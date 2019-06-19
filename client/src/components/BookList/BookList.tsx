import React from "react";
import { useQuery } from "react-apollo-hooks";
import { Book } from "../../graphQL/types";
import { getBooksQuery } from "../../graphQL/queries";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import useStyles from "./styles";

type Data = {
  books: Array<Book>;
};

interface Props {
  setBook: (id: string) => void;
  activeBook: string | null;
}

const BookList: React.FC<Props> = ({ setBook, activeBook }) => {
  const { data, error, loading } = useQuery<Data>(getBooksQuery);
  const classes = useStyles();

  let displayBooks = null;
  if (loading) {
    displayBooks = <div>Loading...</div>;
  }
  if (error) {
    displayBooks = <div>Error!</div>;
  }
  if (data && data.books) {
    displayBooks = data.books.map((book: Book) => (
      <ListItem
        button
        key={book.id}
        onClick={() => setBook(book.id)}
        selected={book.id === activeBook}
        component="li"
      >
        <ListItemText primary={book.name} />
      </ListItem>
    ));
  }

  return <List className={classes.root}>{displayBooks}</List>;
};

export default BookList;
