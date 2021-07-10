const express = require('express');
const { json } = require('express');
const models = require('./models');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();

mongoose.connect('mongodb+srv://user:Zq3K8SoKDZISvklD@cluster0.4qxio.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(json());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen("8000", () => {
    console.log(`listening at port`, 8000);
})