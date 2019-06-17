const express = require("express");
const graphqlHTTP = require("express-graphql");
// const schema = require("./schema");

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(
  "/graphql",
  graphqlHTTP({
    // schema: MyGraphQLSchema,
    // graphiql: true
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
