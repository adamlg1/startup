const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const messagesCollection = db.collection('message');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('connected :)');
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

//make sure db is ready to add 
  async function prepDatabase() {
    try {
      // Creates message collection if needed
      const collections = await db.listCollections({ name: 'message' }).toArray();
      if (collections.length === 0) {
        await db.createCollection('message');
        console.log('Initialized the database');
      }
    } catch (error) {
      console.error('Error initializing the database:', error);
      throw error;
    }
  }

  async function addMessage(message) {
    const result = await messagesCollection.insertOne(message);
    return result;
  }


  // ges messages from database
  async function getMessages() {
    try {
      const messages = await messagesCollection.find({}).toArray();
      console.log('got the message:', messages);
      return messages;
    } catch (error) {
      console.error('Error getting message:', error);
      throw error;
    }
  }
  
  