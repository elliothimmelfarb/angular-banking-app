angular.module('myApp')
.controller('MainController', MainController);

function MainController($localStorage, transactionService, moment) {
  const vm = this;
  const localStorage = $localStorage;
  vm.getStarted = getStarted;
  vm.reset = reset;
  vm.addTransaction = addTransaction;
  vm.sortType = 'id';
  vm.sortReverse = false;

  initialize();

  function reset() {
    localStorage.$reset();
    initialize();
  }

  function getStarted(money) {
    localStorage.started = true;
    localStorage.balance = money;
    localStorage.startMoney = money;
    vm.startMoney = '';
  }

  function addTransaction(transacObj) {
    transactionService.addTransaction(transacObj)
    .then(transacObj2 => {
      updateTotals(transacObj2.credit || transacObj2.debit);
      vm.transac = {
        type: 'debit',
      };
    });
    vm.transac = '';
  }

  // ///// HELPER FUNCTIONS /////////////
  function updateTotals() {
    localStorage.balance = $localStorage.startMoney;
    vm.totalCredit = 0;
    vm.totalDebit = 0;
    localStorage.transactions.forEach(trans => {
      if (moment().isAfter(moment(trans.date))) {
        trans.datePassed = true; // eslint-disable-line no-param-reassign
        vm.totalCredit += (trans.credit || 0);
        vm.totalDebit += (trans.debit || 0);
      }
    });
    localStorage.balance = $localStorage.startMoney + vm.totalCredit + vm.totalDebit;
  }

  function initialize() {
    vm.storage = $localStorage.$default({
      started: false,
      transactions: [],
      currentId: 1,
    });
    vm.transac = {
      type: 'debit',
    };
    if (localStorage.transactions.length) updateTotals();
  }
}
