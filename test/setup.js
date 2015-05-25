// Undefine fetch so that github/fetch will add the shim allowing us to test using sinon
window.fetch = undefined;

var chai = require('chai');
var sinonChai = require('sinon-chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);