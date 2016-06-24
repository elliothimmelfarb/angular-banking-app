'use strict';

angular.module('myApp')
.controller('mainCtrl', function($scope, $localStorage, Transaction) {

  // $localStorage.$reset();


  /////// INITIALIZE ////////
  $scope.type = 'credit';
  initialize();
  if($localStorage.transactions.length) updateTotals(0);
  ///////////////////////////

  $scope.reset = () => {
    $localStorage.$reset();
    initialize();
  }

  $scope.getStarted = money => {
    $localStorage.started = true;
    $localStorage.balance = money;
    $scope.startMoney = '';
  };

  $scope.addTransaction = (transacObj, type) => {
    Transaction.addTransaction(angular.copy(transacObj), angular.copy(type))
      .then(transacObj2 => {
        updateTotals(transacObj2.credit || transacObj2.debit);
      })
    $scope.transac = '';
  };

  function updateTotals(balanceChange) {
    $localStorage.balance += balanceChange;
    $scope.totalCredit = 0;
    $scope.totalDebit = 0;
    $localStorage.transactions.forEach(trans => {
      $scope.totalCredit += (trans.credit || 0);
      $scope.totalDebit += (trans.debit || 0);
    });
  }
  function initialize() {
    $scope.storage = $localStorage.$default({
      started: false,
      transactions: []
    });
  }

});
