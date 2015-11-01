describe('Unit tests for tabs', function() {
  var $compile,
      $rootScope;

  // Load the myApp module, which contains the directive
  beforeEach(module('testApp'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Should call onTabActivated handler', function() {
    // Compile a piece of HTML containing the directive
    
    var tab1Activated = false;
   

    $rootScope.tab1Loader = function() {
      tab1Activated = true;
    }

    var tab2Activated = false;
    $rootScope.tab2Loader = function() {
      tab2Activated = true;
    }

    var element = $compile('<custom_tabs>\
                                <custom_tab title="Tab1" on-tab-activated="tab1Loader()">\
                                    Tab1 content\
                                </custom_tab>\
                                <custom_tab title="Tab2" on-tab-activated="tab2Loader()">\
                                    Tab2 content\
                                </custom_tab>\
                          </custom_tabs>')($rootScope);

    $rootScope.$digest();

    //trigger
    angular.element(element.find('a')[1]).trigger('click');

    expect(tab1Activated).toBeFalsy();
    expect(tab2Activated).toBeTruthy();

  });
});