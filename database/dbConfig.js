const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb://127.0.0.1:27017"; // Thay đổi URI nếu cần thiết

// Tên của database và collection mới
const dbName = "smartHome";
//const collectionName = "user";

// Tạo một client mới
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createDatabaseAndCollection() {
  try {
    // Kết nối tới MongoDB
    await client.connect();

    // Lấy ra reference của database
    const database = client.db(dbName);

    // Tạo collection trong database
    //await database.createCollection(collectionName);
    //console.log(
    //  `Collection "${collectionName}" created successfully in database "${dbName}"`
    //);

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

    const devicesCollection = database.collection("devices");
    await devicesCollection.insertMany([
      { device: "light", status: 1 },
      { device: "air-conditioner", status: 1 },
      { device: "auto-light", status: 0 },
      { device: "auto-air-conditioner", status: 0 },
      { device: "front-door", status: 0 },
      { device: "back-door", status: 0 },
    ]);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    // Đóng kết nối sau khi hoàn tất công việc
    await client.close();
  }
}

// Gọi hàm để tạo database và collection
createDatabaseAndCollection();
