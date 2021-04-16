const express = require('express');
const fs = require('fs');
const CryptoJS = require('crypto-js')
const fetch = require('node-fetch');
const router = express.Router();
const schedule = require('node-schedule');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

schedule.scheduleJob('04 18 * * *', async function () {
  fs.readFile('graph_data/new_dfe-nav_jun1-aug31.json', function read(err, data) {
    if (err) {
      throw err;
    }
    var valuesJSON = JSON.parse(data)
    var accountData = {}
    var valuesDates = Object.keys(valuesJSON)
    var valuesABS = Object.values(valuesJSON)
    var valuesREL = []
    var zero = JSON.parse(valuesABS[0])
    for (i = 0; i < valuesABS.length; i++) {
      valuesREL[i] = (JSON.parse(valuesABS[i]) * 100) / zero
      accountData[valuesDates[i]] = Math.round(valuesREL[i])
    }
    fs.writeFile('graph_data/new_rel_dfe-nav_jun1-aug31.json', JSON.stringify(accountData), function (err) {
      if (err) throw err;
    })
  })
})
schedule.scheduleJob('04 18 * * *', async function () {
  fs.readFile('graph_data/new_nng-nav_jun1-aug31.json', function read(err, data) {
    if (err) {
      throw err;
    }
    var valuesJSON = JSON.parse(data)
    var accountData = {}
    var valuesDates = Object.keys(valuesJSON)
    var valuesABS = Object.values(valuesJSON)
    var valuesREL = []
    var zero = JSON.parse(valuesABS[0])
    for (i = 0; i < valuesABS.length; i++) {
      valuesREL[i] = (JSON.parse(valuesABS[i]) * 100) / zero
      accountData[valuesDates[i]] = Math.round(valuesREL[i])
    }
    fs.writeFile('graph_data/new_rel_nng-nav_jun1-aug31.json', JSON.stringify(accountData), function (err) {
      if (err) throw err;
    })
  })
})
schedule.scheduleJob('04 18 * * *', async function () {
  fs.readFile('graph_data/new_yvn-nav_jun1-aug31.json', function read(err, data) {
    if (err) {
      throw err;
    }
    var valuesJSON = JSON.parse(data)
    var accountData = {}
    var valuesDates = Object.keys(valuesJSON)
    var valuesABS = Object.values(valuesJSON)
    var valuesREL = []
    var zero = JSON.parse(valuesABS[0])
    for (i = 0; i < valuesABS.length; i++) {
      valuesREL[i] = (JSON.parse(valuesABS[i]) * 100) / zero
      accountData[valuesDates[i]] = Math.round(valuesREL[i])
    }
    fs.writeFile('graph_data/new_rel_yvn-nav_jun1-aug31.json', JSON.stringify(accountData), function (err) {
      if (err) throw err;
    })
  })
})
schedule.scheduleJob('04 18 * * *', async function () {
  fs.readFile('graph_data/new_ztf-nav_jun1-aug31.json', function read(err, data) {
    if (err) {
      throw err;
    }
    var valuesJSON = JSON.parse(data)
    var accountData = {}
    var valuesDates = Object.keys(valuesJSON)
    var valuesABS = Object.values(valuesJSON)
    var valuesREL = []
    var zero = JSON.parse(valuesABS[0])
    for (i = 0; i < valuesABS.length; i++) {
      valuesREL[i] = (JSON.parse(valuesABS[i]) * 100) / zero
      accountData[valuesDates[i]] = Math.round(valuesREL[i])
    }
    fs.writeFile('graph_data/new_rel_ztf-nav_jun1-aug31.json', JSON.stringify(accountData), function (err) {
      if (err) throw err;
    })
  })
})

router.get('/gz', function(req, res) {
    fs.readFile('graph_data/new_rel_ztf-nav_jun1-aug31.json', function read(err, data) {
    if (err) {
        throw err;
    }
    res.send(data)
  })
});
router.get('/gd', function(req, res) {
  fs.readFile('graph_data/new_rel_dfe-nav_jun1-aug31.json', function read(err, data) {
  if (err) {
      throw err;
  }
  res.send(data)
})
});
router.get('/gn', function(req, res) {
  fs.readFile('graph_data/new_rel_nng-nav_jun1-aug31.json', function read(err, data) {
  if (err) {
      throw err;
  }
  res.send(data)
})
});
router.get('/gy', function(req, res) {
  fs.readFile('graph_data/new_rel_yvn-nav_jun1-aug31.json', function read(err, data) {
  if (err) {
      throw err;
  }
  res.send(data)
})
});

// //---ENCODING FUNCTION---START
function base64url(source) {
  // Encode in classical base64
  encodedSource = CryptoJS.enc.Base64.stringify(source);

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '');

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');

  return encodedSource;
}
//   //---ENCODING FUNCTION---END

//---HEADER---START
function encodingHeader() {
  var header = {
      "alg": "HS256",
      "typ": "JWT"
  };
  var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
  var encodedHeader = base64url(stringifiedHeader);
  return encodedHeader
}
//---HEADER---END

//---PAYLOAD---START need iss and sub
function encodingData() {
  var d = new Date()
  var iat = Math.round((d.getTime() / 1000))
  var exp = iat + 7200
  var data = {
      "iss": "",
      "sub": "",
      "aud": "summary",
      "iat": iat,
      "exp": exp
  };
  var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
  var encodedData = base64url(stringifiedData);
  return encodedData
}
//---PAYLOAD---END

//---SIGNING TOKEN---START need to add secret code
function signingToken() {
  var token = encodingHeader() + "." + encodingData();
  var secret = "";
  var signature = CryptoJS.HmacSHA256(token, secret);
  signature = base64url(signature);
  var signedToken = token + "." + signature;
  return signedToken
}
//---SIGNING TOKEN---END

//---DATE AND TIME---START
function getCurrentDate() {
  var d = new Date()
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  if (month < 10) {
      var month = "0" + month
  }
  var day = d.getDate()
  if (day < 10) {
    var day = "0" + day
}
  return year + "-" + month + "-" + day
}
//---DATE AND TIME---END

//---REQUEST---START need to add accounts
schedule.scheduleJob('00 00 * * *', async function () {
  const accounts = ["", "", "", ""]
  const accountsFS = ["yvn", "nng", "dfe", "ztf"]
  var date = getCurrentDate()
  var tokenToSend = signingToken()
  var h = {
    'Authorization': `Bearer ${tokenToSend}`
  }
  var i;
  for (i = 0; i < accounts.length; i++) {
    var url = 'https://api-live.exante.eu/md/2.0/summary/' + accounts[i] + '/' + date + '/USD';
    await sleep(5000)
    fetch(url, { method: 'GET', headers: h })
      .then(response => response.json())
      .then(data => {
        j = i - 1;
        var netAssetValue = Math.round(JSON.parse(data.netAssetValue));
        if (accounts[j] == "") {
          netAssetValue = netAssetValue - 250000
        }
        var sessionDate = getCurrentDate();
        fs.readFile('graph_data/new_' + accountsFS[j] + '-nav_jun1-aug31.json', function read(err, data) {
          if (err) {
            throw err;
          }
          var toWrite = JSON.parse(data);
          toWrite[sessionDate] = netAssetValue;
          fs.writeFile('graph_data/new_' + accountsFS[j] + '-nav_jun1-aug31.json', JSON.stringify(toWrite), function (err) {
            if (err) throw err;
          })
        })
      })
      .catch(err => {
        console.error(err.message);
      });
  }
  console.log('Data successfully wriiten!')
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;