const bcrypt = require('bcryptjs');
const users = [
    {
        name:'Admin User',
        email:'user@gmail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Mehedi',
        email:'mehedi@gmail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Shehab',
        email:'shehab@gmail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },

]

module.exports = users;