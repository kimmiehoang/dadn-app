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

    const usersCollection = database.collection("user");
    await usersCollection.createIndex({ email: 1 }, { unique: true });

    await usersCollection.insertOne({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "123abc",
      avtLink:
        "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    });
    await usersCollection.insertOne({
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@gmail.com",
      password: "456xyz",
      avtLink:
        "https://static.vecteezy.com/system/resources/thumbnails/026/829/465/small_2x/beautiful-girl-with-autumn-leaves-photo.jpg",
    });
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await client.close();
  }
}

createDatabaseAndCollection();
