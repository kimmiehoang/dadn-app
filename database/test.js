import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const dbName = 'smartHome';
const poolSize = 10;

const pool = {
  clients: [],
  async connect() {
    if (this.clients.length < poolSize) {
      const client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      this.clients.push(client);
      return client;
    } else {
      throw new Error('Pool is full');
    }
  },
  release(client) {
    const index = this.clients.indexOf(client);
    if (index !== -1) {
      this.clients.splice(index, 1);
      client.close();
    }
  },
};

async function createOrConnectDatabase() {
  try {
    const client = await pool.connect();

    const adminDB = client.db('admin');
    const databaseList = await adminDB.admin().listDatabases();
    const databaseExists = databaseList.databases.some(
      (db) => db.name === dbName
    );

    if (!databaseExists) {
      await adminDB.admin().createDatabase(dbName);
      console.log('Database created successfully!');
      const database = client.db(dbName);
      console.log('Connected to database:', dbName);

      await database.createCollection('user');
      console.log('Collection "user" created successfully!');

      await database.createCollection('door');
      console.log('Collection "door" created successfully!');

      const usersCollection = database.collection('user');
      await usersCollection.createIndex({ email: 1 }, { unique: true });

      await usersCollection.insertOne({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123abc',
      });
      await usersCollection.insertOne({
        name: 'Jane Smith',
        email: 'janesmith@gmail.com',
        password: '456xyz',
      });

      const doorsCollection = database.collection('door');
      await doorsCollection.insertOne({
        doorName: 'Front Door',
        openTimes: [
          new Date('2024-03-24T08:23:42Z'),
          new Date('2024-03-24T08:24:26Z'),
        ],
      });
      await doorsCollection.insertOne({ doorName: 'Back Door', openTimes: [] });
    }

    pool.release(client);

    return client.db(dbName);
  } catch (error) {
    console.error('Error creating or connecting to database:', error);
    throw error;
  }
}

export const db = createOrConnectDatabase();
