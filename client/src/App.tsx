import React from "react";
import BookList from "./components/BookList/BookList";
import AddBook from "./components/AddBook/AddBook";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <BookList />
      <AddBook />
    </div>
  );
};

export default App;
