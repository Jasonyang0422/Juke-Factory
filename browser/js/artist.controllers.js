juke.controller('ArtistCtrl', function($scope, $rootScope, $log, ArtistFactory){

	$rootScope.$on('viewSwap', function(event, data){
		$scope.showMe = (data.name === 'oneArtist');
		if(data.name === 'oneArtist'){

			ArtistFactory.fetchOne(data.id)
				.then(function(artist){
					$scope.artist = artist;
				})
				.catch($log.error);

			ArtistFactory.fetchAlbums(data.id)
				.then(function(albums){
					$scope.albums = albums;
				})
				.catch($log.error);

			ArtistFactory.fetchSongs(data.id)
				.then(function(songs){
			        songs.forEach(function (song, i) {
			           song.audioUrl = '/api/songs/' + song._id + '.audio';
			           song.albumIndex = i;
			        });					
					$scope.songs = songs;
				})
				.catch($log.error);				

		}
	});

	$scope.getImageByAlbum = function(album){
		return '/api/albums/' + album._id + '.image';
	}
	$scope.viewOneAlbum = function(id){
		$rootScope.$broadcast('viewSwap', { name: 'oneAlbum', id: id });		
	}

});