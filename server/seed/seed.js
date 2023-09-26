const db = require("../config/connection");
const { User } = require("../models");
const userData = require("./userData.json");

const seed = async () => {
  db.once("open", async () => {
    await User.deleteMany({});

    const createdUsers = [];
    for (const user of userData) {
      const newUser = await User.create(user);
      createdUsers.push(newUser);
    }

    console.log(createdUsers);

    console.log("Data is seeded");
    process.exit(0);
  });
};

seed();
