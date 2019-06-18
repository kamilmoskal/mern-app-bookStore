import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { Book } from "../../graphQL/types";
import { getBooksQuery } from "../../graphQL/queries";
import BookDetails from "../BookDetails/BookDetails";

type Data = {
  books: Array<Book>;
};

const BookList = () => {
  const [activeBook, setActiveBook] = useState<null | string>(null);
  const { data, error, loading } = useQuery<Data>(getBooksQuery);

  let displayBooks = null;
  if (loading) {
    displayBooks = <div>Loading...</div>;
  }
  if (error) {
    displayBooks = <div>Error!</div>;
  }
  if (data && data.books) {
    displayBooks = data.books.map((book: Book) => (
      <li key={book.id} onClick={e => setActiveBook(book.id)}>
        {book.name}
      </li>
    ));
  }

  return (
    <>
      <ul>{displayBooks}</ul>
      <BookDetails bookId={activeBook} />
    </>
  );
};

export default BookList;
