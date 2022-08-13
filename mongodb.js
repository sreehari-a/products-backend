// const { MongoClient, ObjectId } = require("mongodb");

// const connectionUrl = "mongodb://127.0.0.1:27017";
// const databaseName = "task-manager";

// const id = new ObjectId();
// console.log("id", id);
// console.log("timestamp", id.getTimestamp());
// console.log("hexstring", id.toHexString());

// MongoClient.connect(
//   connectionUrl,
//   { useNewUrlParser: true },
//   (error, client) => {
//     if (error) {
//       return console.log("Cannot connect to database");
//     }
//     const db = client.db(databaseName);

//     //insert one document
//     // db.collection('users').insertOne({
//     //     _id: id,
//     //     name: 'Chandana',
//     //     age: 22,
//     // }, (error, result) => {
//     //     if(error) {
//     //         return console.log('Unable to insert new user');
//     //     }
//     //     console.log(result)
//     // });

//     //insert many documents
//     // db.collection('users').insertMany([{
//     //     name: 'Vivek',
//     //     age: 24,
//     // }, {
//     //     name: 'Amrutha',
//     //     age: 25
//     // }], (error, result) => {
//     //     if(error) {
//     //         return console.log('Unable to insert new user');
//     //     }
//     //     console.log(result)
//     // })

//     //insert multiple tasks into tasks db
//     db.collection("tasks").insertMany(
//       [
//         {
//           description: "Study MongoDB",
//           completed: false,
//         },
//         {
//           description: "Study NodeJS",
//           completed: false,
//         },
//         {
//           description: "Learn swimming",
//           completed: false,
//         },
//       ],
//       (error, result) => {
//         if (error) {
//           return console.log("Unable to insert new user");
//         }
//         console.log(result);
//       }
//     );

//     //read one
//     // db.collection("users").findOne(
//     //   {
//     //     name: "Chandana",
//     //   },
//     //   (error, result) => {
//     //     if (error) {
//     //       return console.log("Unable to find the user");
//     //     }
//     //     console.log(result);
//     //   }
//     // );
//     //read one with query
//     // db.collection("users").findOne(
//     //   {
//     //     _id: new ObjectId("62dfd1242849c3dd3142a343"),
//     //     age: { $gt: 20 },
//     //   },
//     //   (error, result) => {
//     //     if (error) {
//     //       return console.log("Unable to find the user");
//     //     }
//     //     console.log(result);
//     //   }
//     // );
//     //read all with query
//     // db.collection("users")
//     //   .find({
//     //     age: { $gt: 20 },
//     //   })
//     //   .toArray((error, result) => {
//     //     if (error) {
//     //       return console.log("Unable to find the user");
//     //     }
//     //     console.log(result);
//     //   });

//     // read one task by Id
//     // db.collection("tasks")
//     //   .findOne({
//     //     _id: new ObjectId('62dfd6fd55d75777bf724111'),
//     //   }, (error, result) => {
//     //     if (error) {
//     //       return console.log("Unable to find the user");
//     //     }
//     //     console.log(result);
//     //   })

//     //read multiple tasksdb.collection("users")
//     // db.collection("tasks")
//     //   .find({
//     //     completed: false,
//     //   })
//     //   .toArray((error, result) => {
//     //     if (error) {
//     //       return console.log("Unable to find the user");
//     //     }
//     //     console.log(result);
//     //   });

//     // update single file
//     // db.collection("users")
//     //   .updateOne(
//     //     {
//     //       name: "Sreehari",
//     //     },
//     //     {
//     //       $set: {
//     //         name: "Sreehari A",
//     //       },
//     //       $inc: {
//     //         age: 1,
//     //       },
//     //     }
//     //   )
//     //   .then((result) => {
//     //     console.log("result", result);
//     //   })
//     //   .catch((error) => {
//     //     console.log("error", error);
//     //   });

//     //update multiple tasks
//     // db.collection("tasks")
//     //   .updateMany(
//     //     {
//     //       completed: false,
//     //     },
//     //     {
//     //       $set: {
//     //         completed: true,
//     //       },
//     //     }
//     //   )
//     //   .then((result) => {
//     //     console.log("result", result);
//     //   })
//     //   .catch((error) => {
//     //     console.log("error", error);
//     //   });

//     //delete one with query
//     // db.collection("tasks")
//     //   .deleteOne({
//     //     description: 'Study MongoDB'
//     //   })
//     //   .then((result) => {
//     //     console.log("result", result);
//     //   })
//     //   .catch((error) => {
//     //     console.log("error", error);
//     //   });

//     //delete multiple with query
//     // db.collection("tasks")
//     //   .deleteMany({
//     //     age: { $gt: 20 },
//     //   })
//     //   .then((result) => {
//     //     console.log("result", result);
//     //   })
//     //   .catch((error) => {
//     //     console.log("error", error);
//     //   });
//   }
// );
