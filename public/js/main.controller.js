'use strict';

angular.module('myApp')
  .controller('MainController', MainController);

function MainController($localStorage, Transaction, moment) {
  const vm = this;

  /////// INITIALIZE ////////
  initialize();
  if($localStorage.transactions.length) updateTotals();


///// START OVER BUTTON /////////
  vm.reset = () => {
    $localStorage.$reset();
    initialize();
  };
///////////////////////////////////

  vm.getStarted = money => {
    $localStorage.started = true;
    $localStorage.balance = money;
    $localStorage.startMoney = money;
    vm.startMoney = '';
  };

  vm.addTransaction = (transacObj) => {
    Transaction.addTransaction(transacObj)
      .then(transacObj2 => {
        updateTotals(transacObj2.credit || transacObj2.debit);
        vm.transac = {
          type: 'debit'
        };
      })
    vm.transac = '';
  };

  /////// TABLE SORTING ////////////
  vm.sortType = 'id';
  vm.sortReverse = false;
  //////////////////////////////////


/////// HELPER FUNCTIONS /////////////
  function updateTotals() {
    $localStorage.balance = $localStorage.startMoney;
    vm.totalCredit = 0;
    vm.totalDebit = 0;
    $localStorage.transactions.forEach(trans => {
      if(moment().isAfter(moment(trans.date))) {
        trans.datePassed = true;
        vm.totalCredit += (trans.credit || 0);
        vm.totalDebit += (trans.debit || 0);
      }
    });
    $localStorage.balance = $localStorage.startMoney + vm.totalCredit + vm.totalDebit;
  }

  function initialize() {
    vm.storage = $localStorage.$default({
      started: false,
      transactions: [],
      currentId: 1
    });
    vm.transac = {
      type: 'debit'
    };
    updateTotals();
  }
}
