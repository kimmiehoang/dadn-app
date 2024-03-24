const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb://127.0.0.1:27017"; // Thay đổi URI nếu cần thiết

// Tên của database và collection mới
const dbName = "smartHome";
const collectionName = "user";

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
    await database.createCollection(collectionName);
    console.log(
      `Collection "${collectionName}" created successfully in database "${dbName}"`
    );

    const usersCollection = database.collection("user");
    await usersCollection.createIndex({ email: 1 }, { unique: true });

    await usersCollection.insertOne({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123abc",
    });
    await usersCollection.insertOne({
      name: "Jane Smith",
      email: "janesmith@gmail.com",
      password: "456xyz",
    });

    const doorsCollection = database.collection("door");
    await doorsCollection.insertOne({
      doorName: "Front Door",
      openTimes: [
        new Date("2024-03-24T08:23:42Z"),
        new Date("2024-03-24T08:24:26Z"),
      ],
    });
    await doorsCollection.insertOne({ doorName: "Back Door", openTimes: [] });
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    // Đóng kết nối sau khi hoàn tất công việc
    await client.close();
  }
}

// Gọi hàm để tạo database và collection
createDatabaseAndCollection();
