require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { graphqlAuthServer } = require('./graphql-service/graphqlauthserver');

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Async function to start the Apollo Server and apply middleware
async function startServer() {
  await graphqlAuthServer.start();

  // Apply the GraphQL authentication server middleware
  graphqlAuthServer.applyMiddleware({ app });

  // Start the Express server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}

// Call the async function to start the server
startServer();
