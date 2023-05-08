import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import { UUID } from 'bson';
config();

const URI = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB;
const COLLECTIONS = {
  test: 'api-tests',
};
const client = new MongoClient(URI, {
  pkFactory: { createPk: () => new UUID().toBinary() },
});

async function run() {
  try {
    await client.connect().then(() => console.log('Connected...'));

    // Write here your query
    const result = await client
      .db(DB_NAME)
      .collection(COLLECTIONS.test)
      .findOne({});

    console.log('Result:', result);

    // End of query
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close().then(() => console.log('Connection closed...'));
  }
}

run();
