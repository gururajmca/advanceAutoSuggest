var myApp = angular.module('myApp', ['ngSanitize']);
myApp.controller('myController', function($scope) {
    //var $ctrl = this;
    $scope.example = 'Custom Rule Builder';
    $scope.ruleCode = '';

    // $scope.$watch('ruleCode', function(newVal, oldVal) {
    //   if(newVal !== oldVal) {
    //     //$ctrl.ruleCode = 'Child Rule';
    //     console.log('New valye ', $scope.ruleCode);
    //   }
    //
    // });
});
