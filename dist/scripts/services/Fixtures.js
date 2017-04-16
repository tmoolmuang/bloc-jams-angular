(function() {
  function Fixtures() {
    var Fixtures = {};
    var albumPicasso = {
      title: 'The Colors',
      artist: 'Pablo Picasso',
      label: 'Cubism',
      year: '1881',
      albumArtUrl: "/assets/images/album_covers/03.png",
      songs: [
        { title: 'Blue', duration: '161.71', audioUrl: '/assets/music/blue' },
        { title: 'Green', duration: '103.96', audioUrl: '/assets/music/green' },
        { title: 'Red', duration: '268.45', audioUrl: '/assets/music/red' },
        { title: 'Pink', duration: '153.14', audioUrl: '/assets/music/pink' },
        { title: 'Magenta', duration: '374.22', audioUrl: '/assets/music/magenta' }
      ]
    };

    var albumGx = {
      title: 'Just For You',
      artist: 'Grand Ex',
      label: 'EMI',
      year: '1984',
      albumArtUrl: "/assets/images/album_covers/gx.jpg",
     	songs: [
        { title: 'Dew', duration: '204.00', audioUrl: '/assets/music/_dew' },
        { title: 'Friend', duration: '282.00', audioUrl: '/assets/music/_friend' },
        { title: 'Purity', duration: '246.00', audioUrl: '/assets/music/_purity' },
        { title: 'Forsaken', duration: '198.00', audioUrl: '/assets/music/_forsaken' },
			 	{ title: 'Purity (instument)', duration: '249.00', audioUrl: '/assets/music/_purity(inst)' }
      ]
   	};
		
    Fixtures.getAlbum = function(albumIndex) {
      // hack for 2 albums :TODO	
			return (albumIndex == 0) ? albumPicasso : albumGx;
    };
    
		Fixtures.getCollection = function() {
			// hack for 2 albums :TODO
			var collection = [];
			collection.push(albumPicasso);
			collection.push(albumGx);
			return collection;
    };
		
    return Fixtures;
  }

  angular
    .module('blocJams')
    .factory('Fixtures', Fixtures);
})();