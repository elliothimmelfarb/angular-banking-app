angular
  .module('myApp')
    .factory('transactionService', transactionService);

function transactionService($localStorage, $q) {
  const service = {
    addTransaction,
  };

  return service;

  function addTransaction(transacObj) {
    /* eslint-disable no-param-reassign */
    if (transacObj.type === 'debit') transacObj.debit = transacObj.amount * -1;
    else transacObj.credit = transacObj.amount;
    transacObj.id = $localStorage.currentId++;
    transacObj.date = new Date(transacObj.date);
    transacObj.newBalance = $localStorage.balance + (transacObj.credit || transacObj.debit);
    $localStorage.transactions.push(transacObj);
    return $q.resolve(transacObj);
    /* eslint-enable no-param-reassign */
  }
}
