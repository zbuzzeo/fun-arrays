'use strict';
const dataset = require('./dataset.json');
const bankBalances = dataset.bankBalances;

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/

let hundredThousandairs = bankBalances.filter(account => {
  if (account.amount > 100000) {
    return account;
  }
})

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object

let sumOfBankBalances = bankBalances.map(account => {
  return parseInt(account.amount);
})
  // reduce the mapped array.
  .reduce((a, b) => {
    return a + b;
  }
  );

/*
  from each of the following states:
    Wisconsin   -   WI
    Illinois    -   IL
    Wyoming     -   WY
    Ohio        -   OH
    Georgia     -   GA
    Delaware    -   DE
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */

// let filteredAccounts = bankBalances.filter(account => {
//   let selectStates = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];
//   if (selectStates.includes(account.state)) {
//     let amount = parseInt(account.amount);
//     let amountWithInterest = amount + (amount * 0.189);
//     // console.log(Math.ceil(amountWithInterest));
//     return Math.ceil(amountWithInterest);
//   }
// });

let selectStates = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];

let sumOfInterests = bankBalances
  .filter(account => {
    return selectStates.includes(account.state);
  })
  .map(account => {
    return parseInt(account.amount);
  })
  .reduce((runningTotal, currentValue) => {
    return Math.round(runningTotal + (currentValue * 0.189));
  }, 0);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

  note: During your summation (
    if at any point during your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
let stateSums = bankBalances
  .reduce((accumulator, account) => {
    console.log(accumulator);
    if (accumulator.hasOwnProperty(account.state)) {
      accumulator[account.state] += Math.round(parseInt(account.amount));
    } else {
      accumulator[account.state] = Math.round(parseInt(account.amount));
    }
    return accumulator;
  }, {});

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
var sumOfHighInterests = null;

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = null;

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs: hundredThousandairs,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
