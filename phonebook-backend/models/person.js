const mongoose = require('mongoose'),
  uniqueValidator = require('mongoose-unique-validator');

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      unique: true,
      required: true,
    },
    number: {
      type: String,
      minlength: 8,
      unique: true,
      required: true,
    },
  },
  { timestamps: true },
);

// Add mongoose-unique-validator plugin to model
personSchema.plugin(uniqueValidator);

// Transform id to string and delete __id and __v
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
