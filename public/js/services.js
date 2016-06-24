'use strict';

angular.module('myApp')

.service('Transaction', function($localStorage, $q) {
  this.addTransaction = (transacObj, type) => {
    if(type === 'debit') transacObj.debit = transacObj.amount * -1;
    else transacObj.credit = transacObj.amount;
    transacObj.date = moment(transacObj.date).format('MMM D, YYYY');
    transacObj.newBalance = $localStorage.balance + (transacObj.credit || transacObj.debit)
    $localStorage.transactions.push(transacObj);
    return $q.resolve(transacObj);
  };
});
