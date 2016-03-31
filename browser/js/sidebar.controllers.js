juke.controller('SidebarCtrl', function($scope, $rootScope, $log, ArtistFactory){

	$scope.viewAlbums = function(){
		$rootScope.$broadcast('viewSwap', { name: 'allAlbums' });
	}

	$scope.viewAllArtists = function(){
		ArtistFactory.fetchAll()
			.then(function(artists){
				$scope.artists = artists;
			})
			.catch($log.error);
	}

	$scope.viewOneArtist = function(id){
		$rootScope.$broadcast('viewSwap', { name: 'oneArtist', id: id });		
	}

});