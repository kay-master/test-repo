const fs = require('fs');
const path = process.argv[2];

async function openFile(path) {
  return new Promise((resolve, reject) => {
    fs.open(path, 'r', (err, fd) => {
      if (err) {
        if (err.code === 'ENOENT') {
          reject(new Error('File does not exist'))
          return;
        }

        reject(err)
      }

      resolve(fd)
    });
  })
}

async function getStats(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(new Error('Error trying to get stats'));
      }

      if (stats.size > 0) {
        resolve(stats)
      }

      reject(new Error('File exists but there is no content'));
    })
  })
}

async function getFileContents(path, callback) {

  let fileDescriptor = 0;

  try {
    if (!path) {
      console.error(`Path is required`);
      return
    }

    fileDescriptor = await openFile(path);

    await getStats(path);

    fs.read(fileDescriptor, (err, bytes, buffer) => {

      if (err) {
        return callback(err);
      }

      return callback(null, { buffer, bytes });
    })
  } catch (error) {
    // Close the opened file.
    fs.close(fileDescriptor, (err) => {
      if (err) {
        console.log(err);
      }

      console.log("\nFile closed successfully\n");
    });

    callback(error);
  }
}

getFileContents(path, (err, contents) => {
  if (err) {
    console.error(`There was an error getting contents for ${path}\n`, err);
    return;
  }

  console.info('File was found and the contents were loaded');

  if (contents.bytes > 0) {
    console.log(contents.buffer.
      slice(0, contents.bytes).toString());
  }

  console.log(contents.bytes + " bytes read");
});
