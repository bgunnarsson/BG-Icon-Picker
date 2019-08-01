angular.module("umbraco").controller("bgPicker.Controller", function ($scope, $http, assetsService, notificationsService) {
	$scope.icons = [];
	$scope.pattern = '<i class="{0}"></i>'; // DEFAULT ICON PATTERN
	$scope.overlay = {
		view: '/App_Plugins/bgIconPicker/bgPicker.dialog.html',
		width: 500,
		show: false,
		title: 'Select an icon',
		pickIcon: (icon) => {
			$scope.overlay.show = false;
			$scope.model.value = icon;
		},
		close: () => {
			$scope.overlay.show = false;
		}
	};

	if ($scope.model.config.pattern !== null && $scope.model.config.pattern !== '') {
		$scope.pattern = $scope.model.config.pattern;
	};

	// Get the matching class names from the stylesheet
	var getIcons = () => {
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
		.then((response, status, headers, config) => {
			var hasMatches = styleRegex.test(response.data);

			//reset regex
			styleRegex.compile(styleRegexPattern, "g");

			if (hasMatches) {
				var match = styleRegex.exec(response.data);

				while (match !== null) {
					match = styleRegex.exec(response.data);

					// check if match has populated array
					if (match !== null && match.length > 1) {

						//c heck if array already contains match and not on exclude list
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
		.catch((data, status, headers, config) => {
			notificationsService.error('ERROR:', 'file ' + stylePath + ' not found.');
			isError = true;
		});

		// Load the supplied css stylesheet using the umbraco assetsService
		assetsService.loadCss(stylePath);

		return matches;
	};

	$scope.openDialog = () => {
		$scope.overlay.show = true;
		$scope.overlay.icons = $scope.icons;
		$scope.overlay.render = $scope.render;
		$scope.overlay.pattern = $scope.pattern;
	};

	//
	$scope.render = (currentClassName) => {
		return $scope.pattern.replace("{0}", currentClassName);
	};

	$scope.refresh = () => {
		$scope.model.value = '';
	};

	// LOAD
	// =======================
	$scope.icons = getIcons();
});
