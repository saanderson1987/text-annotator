// const Text = require('/models/text.js');
const Text = require('../models/text.js');

for (let i = 9; i < 17; i++) {
  Text.deleteText(i)
  .then((data) => {
    console.log (data, 'deleted');
  })
  .catch((error) => {
    console.log(error);
  });

}
