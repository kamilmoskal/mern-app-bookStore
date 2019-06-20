import React from "react";
import { useQuery } from "react-apollo-hooks";
import { getBookQuery } from "../../graphQL/queries";
import { Book } from "../../graphQL/types";
import useStyles from "../../shared/styles";
import { CircularProgress, Typography, Divider } from "@material-ui/core";

type Data = {
  book: Book;
};

type Props = {
  bookId: string | null;
};

const BookDetails: React.FC<Props> = ({ bookId }) => {
  const { data, error, loading } = useQuery<Data>(getBookQuery, {
    variables: { id: bookId }
  });
  const classes = useStyles();

  let bookDetails = null;
  if (loading) {
    bookDetails = <CircularProgress size={60} />;
  } else if (data && data.book) {
    const {
      book: {
        name,
        genre,
        author: { name: authorName, books }
      }
    } = data;
    bookDetails = (
      <>
        <div className={classes.overflow}>
          <Typography variant="subtitle1" component="p">
            name: <strong>{name}</strong>
            <br />
            genre: <strong>{genre}</strong>
            <br />
            author: <strong>{authorName}</strong>
            <br />
            All Books by this author:
          </Typography>
          <ul>
            {books &&
              books.map((book: Book) => {
                return (
                  <Typography variant="subtitle2" key={book.id} component="li">
                    &nbsp;&nbsp;&nbsp;- {book.genre} {book.name}
                  </Typography>
                );
              })}
          </ul>
        </div>
      </>
    );
  } else {
    bookDetails = <Typography variant="subtitle1">No book selected</Typography>;
  }
  return (
    <>
      <Typography variant="h6" align="center" color="primary">
        <strong>Book Details</strong>
      </Typography>
      <Divider className={classes.divider} />
      <div className={classes.wrapper}>{bookDetails}</div>
    </>
  );
};

export default BookDetails;
