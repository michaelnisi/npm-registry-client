
module.exports = ping

var url = require("url")

function ping (uri, cb) {
  var c = this.conf.getCredentialsByURI(uri)
  if (!c || !c.auth) {
    var er = new Error("Must be logged in to ping the registry")
    er.code = 'ENEEDAUTH'
    return cb(er)
  }
  uri = url.resolve(uri, "/-/ping?write=true")
  this.request("GET", uri, null, function (er, fullData) {
    if (er) {
      cb(er)
    } else if (fullData) {
      console.log(fullData)
      cb(null, fullData)
    } else {
      cb(new Error("Sorry, I cannot reach the registry"))
    }
  })
}
