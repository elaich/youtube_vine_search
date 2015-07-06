angular.module('myapp', []) ;

angular.module('myapp')
.controller('mycontroller', ['$http', '$scope', function($http, $scope) {
  var youtubeAPI = '/api/search/youtube?q=';
  var vineAPI = '/api/search/vine?q=';
  $scope.pages = [];
  $scope.search = function() {
    $scope.yb_url = youtubeAPI + $scope.query;
    $http.get($scope.yb_url)
      .success(function(response) {
        console.log(response);
        $scope.youtubeNextPageToken = response.nextPageToken;
        $scope.pages.push({youtube: response});
      });

    $scope.vn_url = vineAPI + $scope.query;
    $http.get($scope.vn_url)
      .success(function(response) {
        $scope.vineNextPage = response.nextPage;
        $scope.pages.push({vine: response});
      });
  }

  $scope.load = function() {
    $scope.loading = true;
    $scope.yb_url = youtubeAPI + $scope.query;
    $scope.yb_url += '&token=' + $scope.youtubeNextPageToken;

    if ($scope.youtubeNextPageToken)
      $http.get($scope.yb_url)
        .success(function(response) {
          $scope.youtubeNextPageToken = response.nextPageToken;
          $scope.pages.push({youtube: response})
            $scope.loading = false;
        });

    $scope.vn_url = vineAPI + $scope.query;
    $scope.vn_url += '&token=' + $scope.vineNextPage;
    if ($scope.vineNextPage)
      $http.get($scope.vn_url)
        .success(function(response) {
          $scope.vineNextPage = response.nextPage;
          $scope.pages.push({vine: response})
            $scope.loading = false;
        });

  }
}])
