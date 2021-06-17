require('dotenv').config();
const mongo = require('mongoose');
var db = mongo.connect('mongodb+srv://admin2:' + process.env.DEV + '@cluster0.8ybrw.mongodb.net/Cluster0?retryWrites=true&w=majority')

var log_conf = {
  transport: function(data) {
    console.log(data.output)
    var loginfo = db.collection('loginfo')
    loginfo.insert(data, function(err, log) {
      if (err) {
        console.error(err)
      }
    })
  }
}

var logger = require('tracer').console(log_conf)

logger.log('hello')
logger.trace('hello', 'world')
logger.debug('hello %s', 'world', 123)
logger.info('hello %s %d', 'world', 123, { foo: 'bar' })
logger.warn('hello %s %d %j', 'world', 123, { foo: 'bar' })
logger.error(
  'hello %s %d %j',
  'world',
  123,
  { foo: 'bar' },
  [1, 2, 3, 4],
  Object
)

console.log('\n\n\npress ctrl-c to exit')