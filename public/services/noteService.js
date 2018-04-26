app.factory('edit', function($http, $q){

	// var id;
return{
	getMessage: function(id) {
		var deferred = $q.defer();
		return $http.get(baseUrl+'edit_notes/'+id).then(function(response){
	        deferred.resolve(response.data);
	        // console.log(deferred.promise);
	        // return deferred.promise;
	       	var ans = deferred.promise;
	      	return ans.$$state.value;
        });
	},

	setMessage: function(Id){
		// id = Id;
	}
}
});
