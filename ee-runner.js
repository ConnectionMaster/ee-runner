// include closure
var path = require('path');
var closureBasePath = path.join(__dirname, '/ext/closure-library/closure/goog' + path.sep);
var goog = require('closure').Closure({CLOSURE_BASE_PATH: closureBasePath});
require('./ext/closure-library/closure/goog/bootstrap/nodejs')

/*
var path = require('path');
var closureBasePath = path.join(__dirname, '/ext/closure-library/closure/goog/');
print(closureBasePath)
var goog = require('closure').Closure({CLOSURE_BASE_PATH: closureBasePath});

*/
 
// include fixed version of XMLHttpRequest (supports sync calls)
global.XMLHttpRequest = require('./ext/xmlhttprequest-sync/lib/XMLHttpRequest').XMLHttpRequest;

// include GEE sources
require('./ext/earthengine-api/javascript/src/encodable')
require('./ext/earthengine-api/javascript/src/serializer')
require('./ext/earthengine-api/javascript/src/data')
require('./ext/earthengine-api/javascript/src/computedobject')
require('./ext/earthengine-api/javascript/src/types')
require('./ext/earthengine-api/javascript/src/function')
require('./ext/earthengine-api/javascript/src/apifunction')
require('./ext/earthengine-api/javascript/src/element')
require('./ext/earthengine-api/javascript/src/filter')
require('./ext/earthengine-api/javascript/src/collection')
require('./ext/earthengine-api/javascript/src/number')
require('./ext/earthengine-api/javascript/src/string')
require('./ext/earthengine-api/javascript/src/date')
require('./ext/earthengine-api/javascript/src/list')
require('./ext/earthengine-api/javascript/src/dictionary')
require('./ext/earthengine-api/javascript/src/geometry')
require('./ext/earthengine-api/javascript/src/feature')
require('./ext/earthengine-api/javascript/src/customfunction')
require('./ext/earthengine-api/javascript/src/featurecollection')
require('./ext/earthengine-api/javascript/src/image')
require('./ext/earthengine-api/javascript/src/imagecollection')
require('./ext/earthengine-api/javascript/src/terrain')
require('./ext/earthengine-api/javascript/src/ee')

var fs = require('fs')
var request = require('request');

// replacements used in playground code
global.print = function(arg) { console.log(arg); }
global.Map.addLayer = function(arg) {}
global.Map.addCenterObject = function(arg) {}
global.Map.getBounds = function(arg) {}

global.download = function(url, path) {
  var finished = false;

  var downloadAsync = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };

  downloadAsync(url, path, function(){
    finished = true;
  });

  while(!finished) {
     require('deasync').sleep(100);
  }
}

// setup authorization
gee = require('./authenticate')

// initialize google earth engine and call script
gee.initialize(function() {
  // parse command line
  var cmd = require('commander')

  cmd
    .version('0.0.1')
    .description('Google Earth Engine Playground code runner')
    .usage('ee-runner <path>')
    .parse(process.argv);

  if(cmd.args.length != 1) {
    cmd.help();
    process.exit();
  }

  var scriptName = cmd.args[0]
 
  require(path.join(process.cwd(), scriptName))
});