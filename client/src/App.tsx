import React, { useState } from "react";
import useStyles from "./styles";
import { Container, Grid, Typography } from "@material-ui/core";
import BookList from "./components/BookList/BookList";
import AddBook from "./components/AddBook/AddBook";
import AddAuthor from "./components/AddAuthor/AddAuthor";
import BookDetails from "./components/BookDetails/BookDetails";

const App: React.FC = () => {
  const [activeBook, setActiveBook] = useState<null | string>(null);
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        <Grid item sm={12}>
          <Typography
            className={classes.title}
            variant="h4"
            align="center"
            color="primary"
          >
            Book Store
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <BookList
            setBook={(id: string) => setActiveBook(id)}
            activeBook={activeBook}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
