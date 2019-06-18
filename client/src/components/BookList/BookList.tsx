import React from "react";
import { useQuery } from "react-apollo-hooks";
import { Book } from "../../graphQL/types";
import { getBooksQuery } from "../../graphQL/queries";

type Data = {
  books: Array<Book>;
};

const BookList = () => {
  const { data, error, loading } = useQuery<Data>(getBooksQuery);

  const displayBooks = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error!</div>;
    }
    if (data && data.books) {
      return data.books.map((book: Book) => <li key={book.id}>{book.name}</li>);
    }
  };

  return <ul>{displayBooks()}</ul>;
};

export default BookList;
