const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb://127.0.0.1:27017"; // Thay đổi URI nếu cần thiết

const dbName = "smartHome";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createDatabaseAndCollection() {
  try {
    await client.connect();

    const database = client.db(dbName);

    let usersCollection = database.collection("homes");
    await usersCollection.createIndex({ homeName: 1 }, { unique: true });

    await usersCollection.insertMany([
      {
        homeName: "myhome1",
        address: "123 Avenue Street, New York, USA",
      },
      {
        homeName: "myhome2",
        address: "456 Dixon Street, Texas, USA",
      },
    ]);

    usersCollection = database.collection("users");
    await usersCollection.createIndex({ email: 1 }, { unique: true });

    await usersCollection.insertMany([
      {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        password: "123abc",
        avtLink:
          "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
        home: ["myhome1", "myhome2"],
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "janesmith@gmail.com",
        password: "456xyz",
        avtLink:
          "https://static.vecteezy.com/system/resources/thumbnails/026/829/465/small_2x/beautiful-girl-with-autumn-leaves-photo.jpg",
        home: ["myhome2"],
      },
    ]);

    usersCollection = database.collection("devices");

    await usersCollection.insertMany([
      {
        deviceName: "air-conditioner1",
        homeName: "myhome1",
        autoDevice: true,
        deviceValue: [0, 25, 50, 75],
        deviceSettings: [{ tempThreshold: [25, 30, 35] }],
      },
      {
        deviceName: "light1",
        homeName: "myhome1",
        autoDevice: true,
        deviceValue: [0, 1],
        deviceSettings: [],
      },
      {
        deviceName: "air-conditioner1",
        homeName: "myhome2",
        autoDevice: true,
        deviceValue: [0, 25, 50, 75],
        deviceSettings: [],
      },
      {
        deviceName: "light1",
        homeName: "myhome2",
        autoDevice: true,
        deviceValue: [0, 1],
        deviceSettings: [],
      },
    ]);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await client.close();
  }
}

createDatabaseAndCollection();
