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
        homeName: "Room 1",
        address: "123 Avenue Street, New York, USA",
        owner: ["johndoe@gmail.com"],
        userAdafruit: "tienhoang",
        key: "",
      },
      {
        homeName: "Room 2",
        address: "456 Dixon Street, Texas, USA",
        owner: ["johndoe@gmail.com", "janesmith@gmail.com"],
        userAdafruit: "tienhoang",
        key: "",
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
        home: ["Room 1", "Room 2"],
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "janesmith@gmail.com",
        password: "456xyz",
        avtLink:
          "https://static.vecteezy.com/system/resources/thumbnails/026/829/465/small_2x/beautiful-girl-with-autumn-leaves-photo.jpg",
        home: ["Room 2"],
      },
    ]);

    usersCollection = database.collection("devices");

    await usersCollection.insertMany([
      {
        deviceName: "air-conditioner1",
        deviceType: "air-conditioner",
        homeName: "Room 1",
        autoDevice: true,
        deviceValue: [0, 25, 50, 75],
        deviceSettings: {
          tempThresholdLow: 25,
          tempThresholdAverage: 30,
          tempThresholdHigh: 35,
        },
        adafruitFeed: "bbc-fan",
      },
      {
        deviceName: "air-conditioner2",
        deviceType: "air-conditioner",
        homeName: "Room 2",
        autoDevice: true,
        deviceValue: [0, 25, 50, 75],
        deviceSettings: {
          tempThresholdLow: 25,
          tempThresholdAverage: 30,
          tempThresholdHigh: 35,
        },
        adafruitFeed: "bbc-fan",
      },
      {
        deviceName: "light1",
        homeName: "Room 1",
        deviceType: "light",
        autoDevice: true,
        deviceValue: [0, 1],
        deviceSettings: [],
        adafruitFeed: "bbc-led",
      },
      {
        deviceName: "air-conditioner1",
        deviceType: "air-conditioner",
        homeName: "Room 2",
        autoDevice: true,
        deviceValue: [0, 25, 50, 75],
        deviceSettings: {
          tempThresholdLow: 25,
          tempThresholdAverage: 30,
          tempThresholdHigh: 35,
        },
        adafruitFeed: "bbc-fan",
      },
      {
        deviceName: "light1",
        deviceType: "light",
        homeName: "Room 2",
        autoDevice: true,
        deviceValue: [0, 1],
        deviceSettings: [],
        adafruitFeed: "bbc-led",
      },
    ]);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await client.close();
  }
}

createDatabaseAndCollection();
