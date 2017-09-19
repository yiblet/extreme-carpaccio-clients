var dict = {}

dict.DE = 0.21
dict.UK = 0.21
dict.FR = 0.20
dict.IT = 0.25
dict.ES = 0.19
dict.PL = 0.21
dict.RO = 0.20
dict.NL = 0.20
dict.BE = 0.24
dict.EL = 0.20
dict.CZ = 0.19
dict.PT = 0.23
dict.HU = 0.27
dict.SE = 0.23
dict.AT = 0.22
dict.BG = 0.21
dict.DK = 0.21
dict.FI = 0.17
dict.SK = 0.18
dict.IE = 0.21
dict.HR = 0.23
dict.LT = 0.23
dict.SI = 0.24
dict.LV = 0.20
dict.EE = 0.22
dict.CY = 0.21
dict.LU = 0.25
dict.MT = 0.20

var taxes = dict;

function reductions(cost) {

    if (cost>=50000) {
      return 0.15
    } else if (cost >=10000) {
      return 0.1
    } else if (cost >=7000) {
      return 0.07
    } else if (cost >= 5000) {
      return 0.05
    } else {
      return 0.03
    }
}

exports.order = function order(req, res, next) {
  console.log("body: ", req.body)

  var totalCost = 0
  if (! ('prices' in req.body && 'quantities' in req.body && 'reduction' in req.body && 'country' in req.body)) {
    res.status(400);
    return;
  }

  var {prices, quantities, reduction, country} = req.body
  var i;

  // console.log(prices.length)

  for (i=0; i<prices.length; i++)
    totalCost += prices[i] * quantities[i]

  totalCost *= (1+taxes[country])

  if (reduction == 'STANDARD') {
    totalCost *= (1-reductions(totalCost))
  }

  var val = {
    'total' : totalCost
  };

  res.json(val);
}

exports.feedback = function feedback(req, res, next) {
  console.log("FEEDBACK:", req.body);
  next();
}
