import React, { useState } from "react";
import BookList from "./components/BookList/BookList";
import AddBook from "./components/AddBook/AddBook";
import AddAuthor from "./components/AddAuthor/AddAuthor";
import BookDetails from "./components/BookDetails/BookDetails";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const App: React.FC = () => {
  const [activeBook, setActiveBook] = useState<null | string>(null);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <h1>Book List</h1>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <BookList
            setBook={(id: string) => setActiveBook(id)}
            activeBook={activeBook}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={8}>
          <BookDetails bookId={activeBook} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AddBook />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AddAuthor />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
