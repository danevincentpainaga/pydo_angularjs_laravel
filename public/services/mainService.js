//Services
app.factory('mainService',['$http', function($http){
  return{
    fetchTowns: function(){
      return $http.get(baseUrl+'getAllTowns');
    },
    getMunicipal: function(){
  	  return $http.get(baseUrl+'getAllExtactedTowns');
    },
  }
}]);