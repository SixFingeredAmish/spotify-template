var data;
//utlize spotify api search
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query=';

var myApp = angular.module('myApp', ['firebase']);
myApp.controller('MainController', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject, $http){

  var ref = new Firebase("https://onelistfm.firebaseio.com");

  var accountsRef = ref.child("accounts");
  var listsRef = ref.child("lists");

  $scope.accounts = $firebaseObject(accountsRef);
  $scope.lists = $firebaseArray(listsRef);

  $scope.listClicked = false;

  $scope.clicked = function(songList) {
    $scope.songs = [];
    $scope.track = "";
    $scope.tracks = "";

    if (songList.songs != 0) {
      var listUrl = new Firebase("https://onelistfm.firebaseio.com/songList/" + songList.$id + "/" + songList.songs);
      var playlist = $firebaseArray(baz);
      $scope.songs = playlist;
    }
  }
  $scope.authObj = $firebaseAuth(ref);

  //mike's login stuff
  // Test if already logged in
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
      $scope.accounts.$save()
    })

  // Catch any errors
    .catch(function(error) {
      console.error("Error: ", error);
    });
  }

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

  //create new playlist
  $scope.create = function() {
    $scope.lists.$add({
      title: $scope.listName,
      userId: $scope.userId,
      songs: 0,
      time: Firebase.ServerValue.TIMESTAMP
    }).then(function() {
      $scope.listName = "";
      $scope.lists.$save();
    })
  }

  //spotify search
  $scope.audioObject = {};
  $scope.search = function() {
    $http.get(baseUrl + $scope.track).success(function(response){
      data = $scope.tracks = response.tracks.items;
      console.log($scope.track);
      console.log(data);
    })
  }

  //play song preview
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause();
      $scope.currentSong = false;
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play();
      $scope.currentSong = song;
    }
  }

  //add song to queue
  $scope.addSong = function(songList, track) {
    if (songList.songs == 0) { //if list empty
      var listUrl = new Firebase("https://onelistfm.firebaseio.com/lists/" + songList.$id);
      var tempList = listUrl.push([]);
      songList.songs = tempList.key();
      $scope.lists.$save(songList);
    }
    $scope.songs = [];
    var listUrl = new Firebase("https://onelistfm.firebaseio.com/lists/" + songList.$id + "/" + songList.songs);
    var tempList = listUrl.push(angular.copy(track));
    var playlist = $firebaseArray(tempList);
    $scope.songs = playlist;

    console.log(playlist);
  }
})
