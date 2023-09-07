const { ApolloServer } = require('apollo-server-express');
const { UserModel } = require('./model');
const typeDefs = require('./typedef.js');

const resolvers = {
  Query: {
    getUserById: async (_, { id }) => {
      return UserModel.findById(id);
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        const user = new UserModel(args);
        await user.save();
        return user;
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: "bounded"
});

module.exports = server;
