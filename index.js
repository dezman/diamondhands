const chalk = require('chalk');
const figlet = require('figlet');
const package = require('./package.json');

//libs
// const AppolloController = require('./lib/ApolloController');
const Model = require('./lib/Model');
const Animal = require('./lib/Animal');
// import Model from './lib/Model';
// const Molecule = require('./lib/Molecule');
// const Muon = require('./lib/Muon');


module.exports.init = () => {
  console.log(
    chalk.green(
      figlet.textSync('Diamondhands', { horizontalLayout: 'full' })
    )
  );

  return '';
}

module.exports.version = () => {
  console.log(
    chalk.green("version number: " + package.version)
  );
  return '';
}


// 