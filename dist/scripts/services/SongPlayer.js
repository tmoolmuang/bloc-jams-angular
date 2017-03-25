(function() {
  function SongPlayer($rootScope, Fixtures) {
    var SongPlayer = {};

     /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

       /**
    * @desc Album information
    * @type {Object}
    */
//    var currentAlbum = Fixtures.getAlbum();
		var currentAlbum = null;
		
		
		SongPlayer.setCurrentAlbum = function(album) {
			if (currentBuzzObject) {
        stopSong();
				currentBuzzObject = null;
      }
			currentAlbum = album;		
		}	
		

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong();
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true,
				volume: 30
      });
      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {          
          if (SongPlayer.volume == null) {
            SongPlayer.volume = currentBuzzObject.getVolume();            
          }
          else {
            SongPlayer.setVolume(SongPlayer.volume);
          }
					if (currentBuzzObject) {						
						SongPlayer.currentTime = currentBuzzObject.getTime();
						if (SongPlayer.currentTime >= song.duration) {
							stopSong();
							setTimeout(function() {
								SongPlayer.next();
							}, 3000); 
						}						
					}
        });
      });
      SongPlayer.currentSong = song;
    };

    /**
    * @function getSongIndex
    * @desc Gets currently playing song index of current album
    * @param {Object} song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

     /**
    * @function playSong
    * @desc Plays selecting song and sets playing property of the song to true
    * @param {Object} song
    */
    var playSong = function(song) {
      (SongPlayer.mute)?currentBuzzObject.mute():currentBuzzObject.unmute();
      currentBuzzObject.play();
      song.playing = true;
      song.pausing = false;
    };

     /**
    * @function stopSong
    * @desc Stops selecting song and sets playing property of the song to false
    */
    var stopSong = function() {
      currentBuzzObject.stop();				
			SongPlayer.currentTime = 0;
      SongPlayer.currentSong.playing = false;
      SongPlayer.currentSong.pausing = false;
    };

     /**
    * @desc Current selected song
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**
    * @desc Current playback time (in seconds) of currently playing song
    * @type {Number}
    */
    SongPlayer.currentTime = null;

    /**
    * @desc Current volume set
    * @type {Number}
    */
    SongPlayer.volume = null;

    /**
    * @desc Mute status 
    * @type {Boolean}
    */
    SongPlayer.mute = false;

     /**
    * @function play
    * @desc Plays selecting song and sets playing property of the song to true
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			}
			else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject && currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}
    };

    /**
    * @function pause
    * @desc Pauses playing song and sets playing property of the song to false
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
      song.pausing = true;
    };

    /**
    * @function previous
    * @desc Sets current song index to the previous song
    */
    SongPlayer.previous = function() {
			if (currentBuzzObject) {				
				var currentSongIndex = getSongIndex(SongPlayer.currentSong);
				currentSongIndex--;
				if (currentSongIndex < 0) {
					stopSong();
				}
				else {
					var song = currentAlbum.songs[currentSongIndex];
					setSong(song);
					playSong(song);
				}
			}
    };

    /**
    * @function next
    * @desc Sets current song index to the next song
    */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;
      if (currentSongIndex > currentAlbum.songs.length-1) {
        stopSong();
      }
      else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function setCurrentTime
    * @desc Set current time (in seconds) of currently playing song
    * @param {Number} time
    */
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };

    /**
    * @function setVolume
    * @desc Set volume level of currently playing song
    * @param {Number} volume
    */
    SongPlayer.setVolume = function(volume) {
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(volume);
        SongPlayer.volume = volume;
      }
    };

    /**
    * @function muteToggle
    * @desc toggle between mute and unmute
    * @param {Number} volume
    */
    SongPlayer.muteToggle = function() {
      if (currentBuzzObject) {
        currentBuzzObject.toggleMute();
        SongPlayer.mute = currentBuzzObject.isMuted();
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();