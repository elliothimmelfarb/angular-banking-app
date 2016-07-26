'use strict';

angular.module('myApp')

.service('Transaction', function($localStorage, $q) {
  this.addTransaction = (transacObj) => {
    if(transacObj.type === 'debit') transacObj.debit = transacObj.amount * -1;
    else transacObj.credit = transacObj.amount;
    transacObj.id = $localStorage.currentId++;
    // transacObj.date = moment(transacObj.date).format('MMMM D, YYYY');
    transacObj.date = new Date(transacObj.date);
    transacObj.newBalance = $localStorage.balance + (transacObj.credit || transacObj.debit)
    $localStorage.transactions.push(transacObj);
    return $q.resolve(transacObj);
  };
})
