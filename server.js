const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require('./schema/schema');

const app = express();
const PORT = 8000;

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
});