const fs = require('fs-extra');
const chokidar = require('chokidar');

const typedefSrcPath = 'C:/Users/reals/OneDrive/Desktop/EAZIPAY/mongodb-service/typedef.graphql';
const typedefDestPath = './graphql-service/graphql/typedef.graphql';

// Initial copy of typedefs
fs.copyFile(typedefSrcPath, typedefDestPath, (err) => {
  if (err) {
    console.error('Error copying typedef.graphql:', err);
  } else {
    console.log('Initial typedef.graphql copied successfully.');
  }
});

// Watch for changes and update typedefs
chokidar.watch(typedefSrcPath).on('change', (event, path) => {
  fs.copyFile(typedefSrcPath, typedefDestPath, (err) => {
    if (err) {
      console.error('Error copying typedef.graphql:', err);
    } else {
      console.log('typedef.graphql updated successfully.');
    }
  });
});
