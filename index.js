const { ApolloServer, gql } = require('apollo-server');
const journeys = [
    {
        id:1,
        name:"Project A",
        desc:"About project A"
    },
    {
        id:2,
        name:"Project B",
        desc:"About project B"

    }
];

const typeDefs = gql `
    type Query {
        journeys:[Journey]
    }

    type Journey {
        id: Int
        name: String
        desc: String
    }
    type addjourney{
        name: String
        desc: String
    }

    type Mutation{
        addJourney(name: String, desc: String): addjourney
    }

    

`;

const resolvers = {
    Query: {
        journeys: () => journeys,
    },
    Mutation:{
        addJourney:(_,data)=>{
            console.log(data);
            let val = journeys.length +1;
            data["id"] = val;
            console.log(data);
            journeys.push(data)
            console.log(journeys);
            return data;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(url);
  console.log(`🚀  Server ready at ${url}`);
});