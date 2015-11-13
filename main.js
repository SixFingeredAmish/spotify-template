var app = angular.module('app', ['spotify']);

app.config(function (SpotifyProvider) {
  SpotifyProvider.setClientId("7800dc3be577424e9ec87e9917bd41d3");
  SpotifyProvider.setRedirectUri("http://localhost:8080/callback.html");
  SpotifyProvider.setScope("user-read-private playlist-read-private playlist-modify-private playlist-modify-public");
  SpotifyProvider.setAuthToken("token");
})

app.controller('MainController', ['$scope', 'Spotify', function ($scope, Spotify) {
  $scope.login = function () {
    Spotify.login();
  };

  $scope.userId = function () {
    Spotify.getCurrentUser();
  }

  $scope.searchArtist = function () {
    Spotify.search($scope.searchartist, 'artist').then(function (data) {
      $scope.artists = data.artists.items;
    });
  };

  $scope.createPlaylist = function () {
    Spotify.createPlaylist(userId, { name: 'OneList' });
  }

  // Spotify.createPlaylist(':userid', { name: 'OneList' }).then(function (data) {
  // console.log('playlist created');


// });


}]);
