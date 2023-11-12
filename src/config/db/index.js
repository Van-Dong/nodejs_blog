const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education');
        console.log('Connected DB successly!');
    } catch (error) {
        console.log('Error connected\n' + error);
    }
}

module.exports = { connect };
