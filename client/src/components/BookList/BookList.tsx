import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Book } from "../../graphQLSchema/types";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

type Data = {
  books: Array<Book>;
};

const BookList = () => (
  <Query<Data> query={getBooksQuery}>
    {({ data, loading, error }) => {
      if (loading) return <h3>Loading...</h3>;
      if (error) console.log(error);
      return (
        <ul>
          {data &&
            data.books &&
            data.books.map((book: Book) => <li key={book.id}>{book.name}</li>)}
        </ul>
      );
    }}
  </Query>
);

export default BookList;
