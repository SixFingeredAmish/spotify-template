var data;
//utlize spotify api search
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query=';

var myApp = angular.module('myApp', ['firebase', 'spotify']);

angular.module("myApp").config(function($sceProvider) {
  $sceProvider.enabled(false);
});

myApp.controller('MainController', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject, $http, Spotify){

  var ref = new Firebase("https://onelistfm.firebaseio.com");

  var accountsRef = ref.child("accounts");
  var listsRef = ref.child("lists");

  $scope.accounts = $firebaseObject(accountsRef);
  $scope.lists = $firebaseArray(listsRef);



  $scope.clicked = function(songList) {
    $scope.songs = [];
    $scope.track = "";
    $scope.tracks = "";
  }

  //mike's login stuff
  // Test if already logged in
  $scope.authObj = $firebaseAuth(ref);

  var authData = $scope.authObj.$getAuth();
  if (authData) {
    $scope.userId = authData.uid;
  }

  // SignUp function
  $scope.signUp = function() {
    // Create user
    $scope.authObj.$createUser({
      email: $scope.email,
      password: $scope.password,
    })

    // Once the user is created, call the logIn function

    .then($scope.logIn)

    // Once logged in, set and save the user data
    .then(function(authData) {
      $scope.userId = authData.uid;
      $scope.accounts[authData.uid] ={
        username:$scope.username
      }
      //create playlist, so every acc has 1 list

          $scope.lists.$add({
            title: "OneList",
            userId: $scope.userId,
            songs: 0,
            time: Firebase.ServerValue.TIMESTAMP,
            songId: "https://embed.spotify.com/?uri=spotify:trackset:OneList:0FutrWIUM5Mg3434asiwkp",
        })
        $scope.listName = "";
        $scope.lists.$save();


      $scope.accounts.$save()
    })

  // Catch any errors
    .catch(function(error) {
      console.error("Error: ", error);
    });
  }

  $scope.songId = "https://embed.spotify.com/?uri=spotify:trackset:OneList:0FutrWIUM5Mg3434asiwkp";

  // SignIn function
  $scope.signIn = function() {
    $scope.logIn().then(function(authData){
      $scope.userId = authData.uid;
    })
  }

  // LogIn function
  $scope.logIn = function() {
    return $scope.authObj.$authWithPassword({
      email: $scope.email,
      password: $scope.password
    })
  }

  // LogOut function
  $scope.logOut = function() {
    $scope.authObj.$unauth()
    $scope.userId = false
    $scope.username = "";
    $scope.email = "";
    $scope.password = "";
  }

  //spotify search
  // $scope.audioObject = {};
  $scope.search = function() {
    Spotify.search($scope.track, 'track').then(function (response) {
      data = $scope.tracks = response.tracks.items;

      console.log($scope.track);
      console.log(data);
    })
  };

  //add song to queue
  $scope.addSong = function(songId, track) {
    $scope.songId = $scope.songId + "," + track.id;

    $scope.lists.$save(songId);
  }

})
