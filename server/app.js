const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// allow cross-origin requests
app.use(cors());

// connect database
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
