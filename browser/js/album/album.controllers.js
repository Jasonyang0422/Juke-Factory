'use strict';

juke.controller('AlbumCtrl', function($scope, $http, $rootScope, $log , albumFactory, PlayerFactory) {

  // load our initial data
 // albumFactory.fetchAll()
 //      .then(function (albums) {
 //        //console.log(albums);
 //        return albumFactory.fetchById(albums[0]._id);
 //        //return $http.get('/api/albums/' + albums[0]._id); // temp: get one
 //      })    
 //      //.then(function (res) { return res.data })
 //      .then(function (album) {
 //        console.log(album);
 //        album.imageUrl = '/api/albums/' + album._id + '.image';
 //        album.songs.forEach(function (song, i) {
 //          song.audioUrl = '/api/songs/' + song._id + '.audio';
 //          song.albumIndex = i;
 //        });
 //        $scope.album = album;
 //      })
 //      .catch($log.error); // $log service can be turned on and off; also, pre-bound

  // main toggle
  $scope.toggle = function (song, songs) {
    // if ($scope.playing && song === $scope.currentSong) {
    //   $rootScope.$broadcast('pause');
    // } else $rootScope.$broadcast('play', song);
    if($scope.isPlaying() && song === $scope.getCurrentSong()){
        PlayerFactory.pause();
        return; 
    }
    if(!$scope.isPlaying() && song === $scope.getCurrentSong()){
      PlayerFactory.resume();
      return;
    }else{
      if(songs)
        PlayerFactory.start(song, songs);
      else
        PlayerFactory.start(song, $scope.album.songs);        
    }
  };

  $scope.getCurrentSong = function(){
    return PlayerFactory.getCurrentSong();
  }

  $scope.isPlaying = function(){
    return PlayerFactory.isPlaying();
  }
  //incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);
  $rootScope.$on('viewSwap', function(event, data){
    $scope.showMe = (data.name === 'oneAlbum');

    if(data.name === 'oneAlbum'){
      albumFactory.fetchAll()
        .then(function (albums) {
          return albumFactory.fetchById(data.id);
        })    
        .then(function (album) {
          console.log(album);
          album.imageUrl = '/api/albums/' + album._id + '.image';
          album.songs.forEach(function (song, i) {
            song.audioUrl = '/api/songs/' + song._id + '.audio';
            song.albumIndex = i;
          });
          $scope.album = album;
        })
        .catch($log.error);
    }

});
  // functionality
  // function pause () {
  //   $scope.playing = false;
  // }
  // function play (event, song) {
  //   $scope.playing = true;
  //   $scope.currentSong = song;
  // };

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num % m) + m) % m; };

  // jump `interval` spots in album (negative to go back, default +1)
  function skip (interval) {
    if (!$scope.currentSong) return;
    var index = $scope.currentSong.albumIndex;
    index = mod( (index + (interval || 1)), $scope.album.songs.length );
    $scope.currentSong = $scope.album.songs[index];
    if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  };
  function next () { skip(1); };
  function prev () { skip(-1); };

});
