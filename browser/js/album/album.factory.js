'use strict';
juke.factory('albumFactory', function($http){
  // non-UI logic in here
   return {
  		fetchAll : fetchAll,
  		fetchById: fetchById
  	}



  	function fetchAll(){
  		return $http.get('/api/albums/')
  				      .then(function (res) { 
  					       return res.data
  				      });

  	}

  	function fetchById(id){
  		return $http.get('/api/albums/' + id)
  					   .then(function(res){
  						    return res.data
  					   });
  	}

  	

});
/*
  */