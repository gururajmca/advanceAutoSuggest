myApp.directive('customRuleBuilder', [ '$http', '$timeout', function($http, $timeout) {
  return {
      templateUrl: 'customRuleBuilder.html',
      restrict: 'E',
      scope: {
        ruleCode: '=',
        fakeAreaElement: '<',
        textArea: '<'
      },
      link: function($scope, $element, $attrs) {

        // Context highlighting
        $scope.context_tabs = [
          {
            id: 1,
            text: 'entity',
            selected: true
          },
          {
            id: 2,
            text: 'condition',
            selected: false
          },
          {
            id: 3,
            text: 'string',
            selected: false
          },
          {
            id: 4,
            text: 'condition',
            selected: false
          }
        ];

        // Change the context_tab
        $scope.changeContext = function(context_tab) {
          angular.forEach($scope.context_tabs, function(context_val, context_key) {
            if(context_val.text == context_tab) {
                context_val.selected = true;
            } else {
               context_val.selected = false;
            }
          });
        }

        // Dropdown code
        $scope.autoCompleteList = [];
        $scope.isSelectedFromAS = false;
        $scope.isShowDropSuggestion = false;

        $scope.fakeAreaElement = $element.find('.fakeArea');
        $scope.ruleCodeFake = '';
        $scope.textArea = $element.find('.realArea');;

        // Init the FakeArea
        $scope.initFakeArea = function() {
          var properties = [
              'direction',  // RTL support
              'boxSizing',
              'width',  // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
              'overflowX',
              'overflowY',  // copy the scrollbar for IE
              'color',
              'height',

              'borderTopWidth',
              'borderRightWidth',
              'borderBottomWidth',
              'borderLeftWidth',

              'borderTopColor',
              'borderRightColor',
              'borderBottomColor',
              'borderLeftColor',

              'borderTopStyle',
              'borderRightStyle',
              'borderBottomStyle',
              'borderLeftStyle',
              'borderRadius',

              'backgroundColor',

              'paddingTop',
              'paddingRight',
              'paddingBottom',
              'paddingLeft',

              // https://developer.mozilla.org/en-US/docs/Web/CSS/font
              'fontStyle',
              'fontVariant',
              'fontWeight',
              'fontStretch',
              'fontSize',
              'fontSizeAdjust',
              'lineHeight',
              'fontFamily',

              'textAlign',
              'textTransform',
              'textIndent',
              'textDecoration',  // might not make a difference, but better be safe

              'letterSpacing',
              'wordSpacing',
              'whiteSpace',
              'wordBreak',
              'wordWrap'
          ];
          properties.forEach(function (prop) {
              $scope.fakeAreaElement.css(prop, $scope.textArea.css(prop));
          });
        }

        // Call the initFakeArea()
        $scope.initFakeArea();

        // When user changes the realArea text
        $element.bind("keydown keypress", function (event) {
            // Make sure autoCompleteList is empty and get fresh list from backend
            $scope.autoCompleteList = [];

            // Handle space event and get the next set of suggestions
            if(event.which === 32) {
              var payload = {};
              // Todo need to change
              payload['platform'] = 'aws';
              payload['query'] = $scope.ruleCode;
              $scope.ruleCode = $scope.ruleCode + ' ';
              $http.post("mockData.php", payload)
              .then(function(response) {
                  $scope.isShowDropSuggestion = true;
                  var fake_html = '';
                  var context_name = '';
                  angular.forEach(response.data, function(value, key) {
                      $scope.autoCompleteList.push(value);
                      context_name = value.type;
                  });
                  // Set the context
                  $scope.changeContext(context_name);
              });

              // Don't allow system events prevent them?
              // event.preventDefault();
              return false;
            } else { // Handle free key events otherthen space: all user to type his favorite text without blocking
              // Use timeout for reflecting the text in sync.
              $timeout(function() {
                  // Split user entered text into spaces and apply the default color ????
                  var wordList = $scope.ruleCode.split(" ");
                  var fake_html = '';
                  angular.forEach(wordList, function(value, key) {
                      fake_html += '<span class="default">'+value+'</span>&nbsp;';
                  });

                  // Assign to the fakeArea
                  $scope.ruleCodeFake = fake_html;
              }, 0);

            }
        });
      },
      //controllerAs: '$ctrl',
      controller: function($scope, $http) {
        //var $ctrl = this;

        // Add the watcher to keep checking the realArea text. copy and paste option should also work
        $scope.$watch('ruleCode', function(oldVal, newVal) {
          //$scope.isSelectedFromAS = false;
          if(oldVal !== newVal) {
            var payload = {};
            payload['platform'] = 'aws';
            payload['query'] = $scope.ruleCode;
            $http.post("mockData.php", payload)
            .then(function(response) {
                console.log(response);
                var fake_html = '';
                angular.forEach(response.data, function(value, key) {
                    //fake_html += '<span class="'+value.type+'">'+value.tagname+'</span>&nbsp;';
                });
                console.log(fake_html);
                //$scope.ruleCodeFake = fake_html;
            });
          }
        });

        $scope.addSuggestionToQuery = function(suggestion) {
          var realArea_text = $scope.ruleCode + ' ' + suggestion.tagname;
          var fakeArea_text = '<span class="'+suggestion.type+'">' + $scope.ruleCode + '</span>&nbsp;' + '<span class="'+suggestion.type+'">'+suggestion.tagname+'</span>&nbsp;';
          $scope.ruleCode = realArea_text;
          $scope.ruleCodeFake = fakeArea_text;
          $scope.isSelectedFromAS = true;
          $scope.isShowDropSuggestion = false;
        }


      }
  }
}]);
