(function() {
	function AlbumCtrl(Fixtures, SongPlayer, $stateParams) {
		var album = $stateParams.album;	
		this.albumData = Fixtures.getAlbum(album);
		SongPlayer.setCurrentAlbum(this.albumData);		
    this.songPlayer = SongPlayer;		
	}

	angular
		.module('blocJams')
		.controller('AlbumCtrl', ['Fixtures', 'SongPlayer', "$stateParams", AlbumCtrl]);
})();