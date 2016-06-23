'use strict';

$(document).ready(init);

function init() {
  $('select').val('debit');
}

const app = angular.module('bankingApp', ['ngStorage']);

app.controller('mainCtrl', function($scope, $localStorage) {

  //delete $localStorage.started;
  //delete $localStorage.balance;
  // $localStorage.transactions = [];

  if($localStorage.started === undefined) {
    $localStorage.started = false;
    $localStorage.transactions = [];
  }

  $scope.$storage = $localStorage;

  $scope.getStarted = money => {
    $localStorage.started = true;
    $localStorage.balance = money;
  };

  $scope.addTransaction = transacObj => {
    if(transacObj.type === 'debit') transacObj.debit = transacObj.amount * -1;
    else transacObj.credit = transacObj.amount;
    transacObj.newBalance = $localStorage.balance + (transacObj.credit || transacObj.debit)
    $localStorage.transactions.push(transacObj);
    $scope.transac = '';
    $localStorage.balance += (transacObj.credit || transacObj.debit)
  };

});
