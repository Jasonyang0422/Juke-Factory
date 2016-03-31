juke.factory('ArtistFactory', function($http){

	return {fetchAll, fetchOne, fetchAlbums, fetchSongs}

	function fetchAll(){
		return $http.get('api/artists')
					.then(function(res){
						return res.data;
					});
	}

	function fetchOne(id){
		return $http.get('api/artists/' + id)
					.then(function(res){
						return res.data;
					});
	}

	function fetchAlbums(id){
		return $http.get('api/artists/' + id + '/albums')
					.then(function(res){
						return res.data;
					});
	}

	function fetchSongs(id){
		return $http.get('api/artists/' + id + '/songs')
					.then(function(res){
						return res.data;
					});		
	}


});