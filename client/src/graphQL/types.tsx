export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Author = {
  __typename?: "Author";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  age?: Maybe<Scalars["Int"]>;
  books: Array<Book>;
};

export type Book = {
  __typename?: "Book";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  genre?: Maybe<Scalars["String"]>;
  author: Author;
};

export type Mutation = {
  __typename?: "Mutation";
  addAuthor?: Maybe<Author>;
  addBook?: Maybe<Book>;
};

export type MutationAddAuthorArgs = {
  name: Scalars["String"];
  age: Scalars["Int"];
};

export type MutationAddBookArgs = {
  name: Scalars["String"];
  genre: Scalars["String"];
  authorId: Scalars["ID"];
};

export type RootQueryType = {
  __typename?: "RootQueryType";
  book?: Maybe<Book>;
  books?: Maybe<Array<Maybe<Book>>>;
  author?: Maybe<Author>;
  authors?: Maybe<Array<Maybe<Author>>>;
};

export type RootQueryTypeBookArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type RootQueryTypeAuthorArgs = {
  id?: Maybe<Scalars["ID"]>;
};
