const axios = require("axios");
const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList
} = graphql;

//company schema
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
        description: { type: graphql.GraphQLString },
        users: { 
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:9001/companies/${parentValue.id}/users`)
                .then(resp => resp.data);
            }
        }
    })
});

//user schema
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: graphql.GraphQLString },
        firstName: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt },
        company: { 
            type: CompanyType,
            resolve(parentValue, args) {
                return axios.get(`http://localhost:9001/companies/${parentValue.companyId}`)
                .then(resp => resp.data);
            }
        }
    })
});

// where everything starts.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //root query to query user
        user: {
            type: UserType,
            args: { id: { type: graphql.GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:9001/users/${args.id}`)
                .then(resp => resp.data);
            }
        },
        //root query to query company
        company: {
            type: CompanyType,
            args: { id: { type: graphql.GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:9001/companies/${args.id}`)
                .then(resp => resp.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});