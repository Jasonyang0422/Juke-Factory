'use strict';

juke.factory('PlayerFactory', function(){
  // non-UI logic in here
  var audio = document.createElement('audio');
  var playing = false;
  var currentSong = null;
  var list;
  var progress = 0;
  // return{
  // 	start: start,
  // 	pause: pause,
  //   resume: resume,
  //   isPlaying: isPlaying
  // };

  return{start, pause, resume, isPlaying, getCurrentSong, next, previous, getProgress};

  function start(song, songList){
    list = songList;
  	this.pause();
  	audio.src = song.audioUrl;
  	audio.load();
  	audio.play();
    playing = true;
    currentSong = song;
    audio.addEventListener('timeupdate', function(){
      progress = audio.currentTime / audio.duration;
    });
    audio.addEventListener('ended', function(){
      this.next();
    })
  }

  function pause(){
    console.log(audio);
  	audio.pause();
    playing = false;
  }

  function resume(){
    console.log('cool')
    audio.play();
    playing = true;
  }

  function isPlaying(){
    return playing;
  }

  function getCurrentSong(){
    return currentSong;
  }

  function next(){
    var index = list.indexOf(currentSong);
    if(index === list.length - 1)
      index = 0;
    else
      index ++;
    this.start(list[index]);
  }

  function previous(){
    var index = list.indexOf(currentSong);
    if(index === 0)
      index = list.length - 1;
    else
      index --;
    this.start(list[index]);
  }



  function getProgress(){
    console.log(progress);
    return progress;
  }

});

















