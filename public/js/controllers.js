'use strict';

angular.module('myApp')
.controller('mainCtrl', function($scope, $localStorage, Transaction, Date, moment) {

  /////// INITIALIZE ////////
  initialize();
  if($localStorage.transactions.length) updateTotals();


///// START OVER BUTTON /////////
  $scope.reset = () => {
    $localStorage.$reset();
    initialize();
  };
///////////////////////////////////

  $scope.getStarted = money => {
    $localStorage.started = true;
    $localStorage.balance = money;
    $localStorage.startMoney = money;
    $scope.startMoney = '';
  };

  $scope.addTransaction = (transacObj) => {
    Transaction.addTransaction(transacObj)
      .then(transacObj2 => {
        updateTotals(transacObj2.credit || transacObj2.debit);
        $scope.transac = {
          type: 'debit'
        };
      })
    $scope.transac = '';
  };

  /////// TABLE SORTING ////////////
  $scope.sortType = 'id';
  $scope.sortReverse = false;
  //////////////////////////////////


/////// HELPER FUNCTIONS /////////////
  function updateTotals() {
    $localStorage.balance = $localStorage.startMoney;
    $scope.totalCredit = 0;
    $scope.totalDebit = 0;
    $localStorage.transactions.forEach(trans => {
      if(moment().isAfter(moment(trans.date))) {
        trans.datePassed = true;
        $scope.totalCredit += (trans.credit || 0);
        $scope.totalDebit += (trans.debit || 0);
      }
    });
    $localStorage.balance = $localStorage.startMoney + $scope.totalCredit + $scope.totalDebit;
  }
  // function updateTotals() {
  //   $localStorage.balance = $localStorage.startMoney;
  //   $scope.totalCredit = 0;
  //   $scope.totalDebit = 0;
  //   $localStorage.transactions.forEach(trans => {
  //     if(Date.checkTimePassed(trans.date) <= 0) {
  //       trans.datePassed = true;
  //       $scope.totalCredit += (trans.credit || 0);
  //       $scope.totalDebit += (trans.debit || 0);
  //     }
  //   });
  //   $localStorage.balance = $localStorage.startMoney + $scope.totalCredit + $scope.totalDebit;
  // }

  function initialize() {
    $scope.storage = $localStorage.$default({
      started: false,
      transactions: [],
      currentId: 1
    });
    $scope.transac = {
      type: 'debit'
    };
    updateTotals();
  }

});
