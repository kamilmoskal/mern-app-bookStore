import React from "react";
import { useQuery } from "react-apollo-hooks";
import { Book } from "../../graphQL/types";
import { getBookQuery } from "../../graphQL/queries";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  console.log(data);
  if (loading) {
    return <CircularProgress />;
  }
  if (data && data.book) {
    return (
      <div>
        <h5>{data.book.name}</h5>
      </div>
    );
  } else {
    return <h5>No book selected</h5>;
  }
};

export default BookDetails;
