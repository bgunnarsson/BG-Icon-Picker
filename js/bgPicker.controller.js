angular.module("umbraco").controller("bgPicker.Controller", function ($scope, $http, assetsService, notificationsService) {
	// SETUP
	// =======================
	
	$scope.icons = [];
	$scope.pattern = '<i class="{0}"></i>'; // DEFAULT ICON PATTERN
	$scope.overlay = {
		view: '/App_Plugins/bgIconPicker/views/bgPicker.dialog.html',
		width: 500,
		show: false,
		title: 'Select an icon',
		pickIcon: function(icon) {
			$scope.overlay.show = false;
			$scope.model.value = icon;
		},
		close: function() {
			$scope.overlay.show = false;
		}
	};

	if ($scope.model.config.pattern != null && $scope.model.config.pattern != '') {
		$scope.pattern = $scope.model.config.pattern;
	};

	// PRIVATE FUNCTIONS
	// =======================
	
	// Get the matching class names from the stylesheet
	var getIcons = function () {
		var stylePath = $scope.model.config.stylePath,
			styleRegexPattern = $scope.model.config.styleRegex,
			styleRegex = new RegExp(styleRegexPattern, 'g'),
			matches = [],
			isError = false;

		// Get the class names from the specified stylesheet,
		// use angular http request to make a cached request for the stylesheet content.
		$http({
			method: 'GET', 
			url: stylePath,
			cache: true
		})
		.success(function (data, status, headers, config) {
			var hasMatches = styleRegex.test(data);

			//reset regex
			styleRegex.compile(styleRegexPattern, "g");

			if (hasMatches) {
				var match = styleRegex.exec(data);

				while (match != null) {
					match = styleRegex.exec(data);

					// check if match has populated array
					if (match != null && match.length > 1) {

						//check if array already contains match and not on exclude list
						if (!(matches.indexOf(match[1]) > 0)) {
							matches.push(match[1]);
							hasMatches = true;
						}
					}
				}
			}

			matches.sort();

			if (!hasMatches && !isError) {
				isError = true;
				notificationsService.error('ERROR:', 'No matches in stylesheet for regex: ' + styleRegexPattern);
			}
		})
		.error(function (data, status, headers, config) {
			notificationsService.error('ERROR:', 'file ' + stylePath + ' not found.');
			isError = true;
		});

		// Load the supplied css stylesheet using the umbraco assetsService
		assetsService.loadCss(stylePath);

		return matches;
	};


	// HELPER FUNCTIONS
	// =======================
	
	$scope.openDialog = function() {
		$scope.overlay.show = true;
		$scope.overlay.icons = $scope.icons;
		$scope.overlay.render = $scope.render;
		$scope.overlay.pattern = $scope.pattern;
	};

	// 
	$scope.render = function (currentClassName) {
		return $scope.pattern.replace("{0}", currentClassName.replace(".", " "));
	};

	$scope.refresh = function() {
		$scope.model.value = '';
	};

	// LOAD
	// =======================
	$scope.icons = getIcons();
});
