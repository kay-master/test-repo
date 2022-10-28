#### Section 1 - (5 mins)
1. Explain the difference between an abstract class and an interface.
  
2. What is the purpose of getters and setters in a class?
	
#### Section 2 - Testing - (5 mins)
Explain the purpose of black box testing
In your opinion what are the benefits of test cases

Section 3 - NodeJS specific questions - (5 mins)
What is an error first callback, and what is the reason for this pattern existing?
Explain the difference between fs.readSync and fs.read (File System module in Nodejs)
What tasks do you feel should be done asynchronously?

Section 4 - NodeJS coding - (15 - 20 mins)
(a) is a trivial example of callback hell
Refactor the code for the better, using any techniques you are aware of
Place code in load_contents.js
Take path as an argument

Section 5 - NodeJS coding with classes - Fruit Basket - (40 - 50 mins)
Load data from file `input.json`, the file contents are given in (i) Example input data
You must create and use a FruitBasket class and a Fruit class.
You may create any additional classes based on your approach 
Implement code that will answer the following questions:
How many fruits are in the basket
How many fruits of a specific type are in the basket
How heavy is the basket
Output the data to file `output.json`, the file format should match (ii) Example output data for the given input data in (i), this is simply a json file
Create a success scenario black box test


Section 6 - NodeJS test cases - Fruit Basket 
This is an optional section and does not need to be completed if you have already spent more than an hour and a half on the previous sections
Create a failure scenario black box test
Write the unit test cases you feel are most relevant









(a)
const fs = require('fs');
const path = process.argv[2];

function getFileContents(path, callback) {
  fs.exists(path, (exists) => {
    if (exists) {
      console.log('exists');
      fs.stat(path, (err, stats) => {
        if (err) {
          return callback(new Error('Error trying to get stats'));
        }
        console.log(stats);
        if (stats.size > 0) {
          fs.readFile(path, (err, buffer) => {
            if (err) {
              return callback(new Error('Error trying to get stats'));
            }
            return callback(null, buffer);
          })
        } else {
          return callback(new Error('File exists but there is no content'));
        }
      })
    } else {
      return callback(new Error('File does not exist'));
    }
  })
}


getFileContents(path, (err, contents) => {
  if (err) {
    console.error(`There was an error getting contents for ${path}`, err);
    return;
  }
  console.info('File was found and the contents were loaded');
});


The Fruit Basket Project
We have a fruit basket
It has a max allowed weight
We have various types of fruits, Apples | Oranges | Peaches | Pears
All fruits have a weight
All fruits have a color

(i) Example input data:
[{
  "id": "1ceb8c95-736f-4da3-86d9-86d55893b38a",
  "max_weight": 8,
  "contents": [{
    "type": "apple",
    "color": "green",
    "weight": 1.5
  }, {
    "type": "apple",
    "color": "red",
    "weight": 1
  }, {
    "type": "pear",
    "color": "green",
    "weight": 2.5
  }]
}]


(ii) Example output data for the given input data in (i):
[{
  "id": "1ceb8c95-736f-4da3-86d9-86d55893b38a",
  "total_fruits": 3,
  "total_weight": 5,
  "fruit_counts": [{
    "type": "apple",
    "count": 2
  }, {
    "type": "pear",
    "count": 1
  }]
}]
