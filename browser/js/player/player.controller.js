'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  // var audio = document.createElement('audio');
  // audio.addEventListener('ended', function () {
  //   $scope.next();
  //   // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });
  // audio.addEventListener('timeupdate', function () {
  //   $scope.progress = 100 * audio.currentTime / audio.duration;
  //   // $scope.$digest(); // re-computes current template only (this scope)
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });

  // state
  // $scope.currentSong;
  // $scope.playing = false;
  $scope.getCurrentSong = function(){
    return PlayerFactory.getCurrentSong();
  }
  $scope.isPlaying = function(){
    return PlayerFactory.isPlaying();
  }
  $scope.getProgress = function(){
    return 100 * PlayerFactory.getProgress();
  }

  // main toggle
  $scope.toggle = function () {
    // if ($scope.playing) $rootScope.$broadcast('pause');
    // else $rootScope.$broadcast('play', song);
    if($scope.isPlaying()){
      PlayerFactory.pause();
      return;
    }else{
      PlayerFactory.resume();
    }
      
  };

  // incoming events (from Album or toggle)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);

  // functionality
  // function pause () {
  //   audio.pause();
  //   $scope.playing = false;
  // }
  // function play (event, song){
  //   // stop existing audio (e.g. other song) in any case
  //   pause();
  //   $scope.playing = true;
  //   // resume current song
  //   if (song === $scope.currentSong) return audio.play();
  //   // enable loading new song
  //   $scope.currentSong = song;
  //   audio.src = song.audioUrl;
  //   audio.load();
  //   audio.play();
  // }

  // outgoing events (to Album… or potentially other characters)
  $scope.next = function(){ 
    // pause(); 
    // $rootScope.$broadcast('next'); 
    PlayerFactory.next();
  };

  $scope.prev = function(){ 
    // pause(); 
    // $rootScope.$broadcast('prev'); 
    PlayerFactory.previous();
  };



});








