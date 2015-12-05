var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = null;

/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
var roundedDollar = null;

/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = null;

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = null;

/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfInterests = dataset.bankBalances.filter(function(c){
  return ['WY','IL','WI','OH','GA','DE'].indexOf(c.state) === -1;
});
// console.log(sumOfInterests);


/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = dataset.bankBalances
  .reduce(function (previousAccount, currentAccount) {

    // if state key does not exist, create it, and set the first amount to 0
    if( !previousAccount.hasOwnProperty(currentAccount.state) ){
      previousAccount[ currentAccount.state ] = 0;
    }

    // by this point, the key exists and is a Number
    previousAccount[ currentAccount.state ] += parseFloat( currentAccount.amount );
    // round down to cents
    previousAccount[ currentAccount.state ] = Math.round( previousAccount[ currentAccount.state ] * 100 )/100;

    return previousAccount;
  },{});


/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
  */
var sumOfHighInterests = Object.keys(stateSums)
  // only accounts in states that are not in the ones listed
  .filter(function (state) {
    return ['WI','IL','WY','OH','GA','DE'].indexOf( state ) === -1;
  })
  // convert amounts to only the interest
  .map(function (stateKey) {
    return {
      state : stateKey,
      interest : Math.round( stateSums[stateKey] * 0.189 * 100)/100
    };
  })
  // return array of objects
  //  ex: [ {state:'HI', interest:1234}, ...]

  // only use interest amounts greater than 50,000
  .filter(function ( account ) {
    return account.interest > 50000;
  })

  // add all state interests, return rounded to cent
  .reduce(function ( previousInterest, currentAccount ) {
    return previousInterest + currentAccount.interest;
  },0);

sumOfHighInterests = Math.round( sumOfHighInterests * 100)/100;

console.log(sumOfBankBalances);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = null;

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = null;

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = null;

/*
  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
