const MongoClient = require('mongodb').MongoClient;

const DB_URI = "mongodb+srv://arslankamcybekov7:LMS2024@cluster0.tqevgqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!DB_URI) {
  console.error("ERROR: DB_URI is not defined. Please set the database URI.");
  process.exit(1);
}

MongoClient.connect(DB_URI, (err, client) => {
  if (err) {
    console.log("ERROR: Failed to connect to database.");
    console.log(err);
    return;
  }

  // Extract the database name from the connection string
  const dbName = 'Cluster0';  // Manually set your database name since it's not clear from the URI
  const db = client.db(dbName);

  console.log(`Connected to ${dbName} database successfully.`);

  db.collection('users')
    .updateMany(
      {
        points: { $exists: false }
      },
      {
        $set: {
          points: 0 // Set the default points value to 0
        }
      }
    )
    .then(res => {
      console.log(`${res.modifiedCount} documents updated successfully.`);
      console.log("Database connection closed.");
      client.close();
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      console.log("Database connection closed.");
      client.close();
    });
});
