describe('Unit tests for listFiles', function() {
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

  it('Should reflect ', function() {

    //add files to the scope
    var listFiles = $rootScope.listFiles = [];
    for(var i=0 ; i < 100; i++) {
      listFiles.push({name: 'file' + i});
    }

    //define list files dialog
    var listFilesElement = $compile('<list-files-dialog title="List files" list-files="listFiles"></list-files-dialog>')($rootScope);
    $rootScope.$digest();

    //output selected files
    var ul = $compile('<ul>\
                        <li ng-repeat="file in listFiles" listFiles="listFiles" ng-if="file.selected">\
                          {{file.name}}\
                        </li>\
                      </ul> ')($rootScope);

    $rootScope.$digest();    
              
    //check that there is no selected files
    expect(ul.find('li').length).toBe(0);


    //select some files
    var NUMBER_TO_SELECT = 30;
    var fileInputs = $('.ui-dialog').find('input');
    for(var i=0; i< NUMBER_TO_SELECT ; i++) {
      $(fileInputs[i]).trigger('click');
    }

    //check that correpondent changes reflected to the scoup
    expect(ul.find('li').length).toBe(NUMBER_TO_SELECT);

  });
});