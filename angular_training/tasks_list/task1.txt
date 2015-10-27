1. To display the inheritance of scopes in angularjs applications do the following:
 a. with ng-init create a shared value in root scope
 b. create parentCtrl1 and parentCtrl2 on the same level under root scope
 c. in the scope level of parentCtrl1 and parentCtrl2 place inputs with ng-model bound to shared value
 d. near each input place output of shared value with {{}} expression
 e. create ChildCtrl1 and ChildCtrl2 under parentCtrl1 scope
 f. in the scope level of ChildCtrl1 and ChildCtrl2 place inputs with ng-model bound to shared value
 g. near each inputs place outputs of shared value with {{}} expression
 h. improve the application so that all the {{}} show the same values after different scenarios of typing in valuse into different inputs.