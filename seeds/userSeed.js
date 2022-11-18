const { User } = require('../models');

const usersArray = [
    {
        first_name: "Arely",
        last_name: "Cole",
        email: "Vincenzo12@hotmail.com",
        password: "password123",
    },
    {
        first_name: "Cullen",
        last_name: "Harber",
        email: "Milford.Reichert@yahoo.com",
        password: "password123",
    },
];


const seedUsers = () => User.bulkCreate(usersArray, {
    individualHooks: true,
});

module.exports = seedUsers;

