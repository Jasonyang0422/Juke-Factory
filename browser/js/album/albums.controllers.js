'use strict';

juke.controller('Albums', function($scope, $http, $rootScope, $log , albumFactory) {

	albumFactory.fetchAll()
		.then(function(albums){
			console.log(albums);
			$scope.albums = albums;
		})

	$scope.getImageByAlbum = function(album){
		return '/api/albums/' + album._id + '.image';
	}



});