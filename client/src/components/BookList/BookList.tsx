import React from "react";
import { useQuery } from "react-apollo-hooks";
import { getBooksQuery } from "../../graphQL/queries";
import { Book } from "../../graphQL/types";
import useStyles from "../../shared/styles";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  CircularProgress
} from "@material-ui/core";

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

  let bookList = null;
  if (loading) {
    bookList = <CircularProgress size={60} />;
  }
  if (error) {
    bookList = (
      <Typography variant="subtitle1" align="center">
        Can't connect to server
      </Typography>
    );
  }
  if (data && data.books) {
    bookList = (
      <List className={classes.overflow}>
        {data.books.map((book: Book) => (
          <ListItem
            button
            key={book.id}
            onClick={() => setBook(book.id)}
            selected={book.id === activeBook}
            component="li"
          >
            <ListItemText primary={book.name} />
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <>
      <Typography variant="h6" align="center" color="primary">
        <strong>Book List</strong>
      </Typography>
      <Divider className={classes.divider} />
      <div className={classes.wrapper}>{bookList}</div>
    </>
  );
};

export default BookList;
