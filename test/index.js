const chai = require('chai');

global.expect = chai.expect;

process.on('unhandledRejection', trace => console.log(trace));
