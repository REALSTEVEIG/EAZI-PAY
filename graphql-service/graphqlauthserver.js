require('dotenv').config();

if (process.env.NODE_ENV == 'development') {
  require('./watchtypedefs');
}

const { ApolloServer } = require('apollo-server-express');
const { UserModel } = require('../mongodb-service/model');
const typeDefs = require('./graphql/typedef.graphql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    //Any Query
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      try {

        const user = await UserModel.findOne({ email });

        if (user) {
          throw new Error('User already exists');
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({ username, email, password: hashedPassword });

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);

        return {user: newUser, token};

      } catch (error) {
        throw new Error('Failed to create user ' + error.message);
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          throw new Error('No user with that email');
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
          throw new Error('Incorrect password');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        return { user, token };
      } catch (error) {
        console.error('Error logging in:', error);
        throw Error('Failed to log in ' + error.message);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: "bounded"
});

module.exports = {
  graphqlAuthServer: server,
};