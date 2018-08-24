var myApp = angular.module('buddyList', ['ngRoute'])

//ng-route config
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'default.html',
    })
    .when('/buddy-info/:buddy_index', {
      templateUrl: 'buddy_info.html',
      controller: 'buddyInfoCtrl'
    })
    .when('/Add', {
      templateUrl: 'buddy_form.html',
      controller: 'addBuddyCtrl'
    })
    .when('/edit/:buddy_index', {
      templateUrl: 'buddy_form.html',
      controller: 'editBuddyCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
})

// controllers
.controller('navCtrl', function($scope) {
  $scope.nav = {
    navItems: ['Home', 'Add'],
    selectedIndex: 0,
    navClick: function($index) {
      $scope.nav.selectedIndex = $index;
    }
  };
})

.controller('homeCtrl', function($scope, BuddyService) {
  $scope.buddys = BuddyService.getBuddys();

  //Sorts Ascending Based on Option Selected
  $scope.sortBy = function(option) {
      $scope.sortOptionSelected = option;
    },

    //Prompts User Before Deleting
    $scope.removeBuddy = function(item) {
      if (confirm("Press [Ok] to Delete")) {
        var index = $scope.buddys.indexOf(item);
        $scope.buddys.splice(index, 1);
        $scope.removed = 'Buddy successfully removed.';
      }

    };

})

.controller('buddyInfoCtrl', function($scope, $routeParams) {
  var index = $routeParams.buddy_index;
  $scope.currentBuddy = $scope.buddys[index];
})

.controller('addBuddyCtrl', function($scope, $location) {
  //needed to show the correct button on the buddy form
  
  $scope.path = $location.path();
  //$scope.isDisabled = false;
   
  $scope.addBuddy = function() {
    var buddy = $scope.currentBuddy;
    
    if(buddy!=undefined && buddy.userName!=undefined){
      // $scope.isDisabled = true;
       buddy.id = $scope.buddys.length;
       $scope.buddys.push(buddy);
       $scope.myLink = "#/buddy-info/"+ buddy.id +"";
    }
   
  };

})

.controller('editBuddyCtrl', function($scope, $routeParams) {
  $scope.index = $routeParams.buddy_index;
  $scope.currentBuddy = $scope.buddys[$scope.index];
  $scope.currentBuddy.birthday = new Date($scope.currentBuddy.birthday);
})

// directives
.directive('buddy', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'buddy.html'
  }
})

// services
.factory('BuddyService', [function() {
  var factory = {};

  factory.getBuddys = function() {
    return buddyList;
  }

 
  var buddyList = [{
    id: 0,
    userName: 'gow18tham',
    firstName: 'Gowtham',
    lastName: 'Jonnagurukula',
    status: 'Available',
    birthday: '1996-08-01',
    gender: 'male',
    email: 'gowtham181996@gmail.com',
    phone: '9994643072',
    bio: 'Intern at EMR Philips Bangalore',
    lastSeen: '2016-01-11T02:04:23'
  },{
    id: 1,
    userName: 'ashi55',
    firstName: 'Ashish',
    lastName: 'Kakabul',
    status: 'Offline',
    birthday: '1996-08-05',
    gender: 'male',
    email: 'aashishnag.k@gmail.com',
    phone: '8190008108',
    bio: 'Intern at Global It Philips ',
    lastSeen: '2016-01-11T02:04:23'
  },{
    id: 2,
    userName: 'sai456',
    firstName: 'Saikumar',
    lastName: 'pulluri',
    status: 'Available',
    birthday: '1996-10-17',
    gender: 'male',
    email: 'saikumar.puluri@gmail.com',
    phone: '9679783841',
    bio: 'Intern at Philips bangalore',
    lastSeen: '2016-01-11T02:04:23'
  },{
    id: 3,
    userName: 'yuvi2242',
    firstName: 'yuvaraj',
    lastName: 'Tuduru',
    status: 'Away',
    birthday: '1996-03-12',
    gender: 'male',
    email: 'yuvi2242@gmail.com',
    phone: '9994322866',
    bio: 'Intern at Philips Lightning',
    lastSeen: '2016-01-11T02:04:23'
  },{
    id: 4,
    userName: 'sharath',
    firstName: 'Sharath',
    lastName: 'Reddishetti',
    status: 'Away',
    birthday: '1995-06-13',
    gender: 'male',
    email: 'sharath.r@gmail.com',
    phone: '7793977909',
    bio: 'Intern at Philips Signify Bangalore',
    lastSeen: '2016-01-11T02:04:23'
  }];
  return factory;
}]);