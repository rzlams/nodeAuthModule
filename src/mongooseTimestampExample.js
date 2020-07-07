const mongoose = require('mongoose');

const Schema = mongoose.Schema( // eslint-disable-line
    {
      username: {type: String, required: true},
      description: {type: String, required: true},
      duration: {type: Number, required: true},
      date: {type: Date, required: true},
    },
    {
      timestamps: {createdAt: true, updatedAt: true},
    },
);

const Exercise = mongoose.model('Exercise', Schema);

module.exports = Exercise;
