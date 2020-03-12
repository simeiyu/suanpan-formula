
var app = angular.module('app', [
  // 'ngMaterial',
  'ngAnimate',
  // 'ngSanitize',
  'ui.bootstrap',
  'angularBootstrapNavTree'
]);
app.controller('myCtrl', function($scope, $uibModal) {
  $scope.node = {
    "id": "1ae3b260636811ea91ff81a14904b45b",
    "component": 5215,
    "metadata": {
      "def": {
        "description": {
          "zh_CN": "编辑公式"
        },
        "type": 5,
        "docUrl": "",
        "author": "qiushui",
        "codeName": "",
        "codePath": "",
        "params": {
          "inputData1": {
            "type": "string",
            "propertyName": "dataName",
            "defInPortUuid": "in1"
          },
          "outputData1": {
            "type": "array",
            "propertyName": "dataName",
            "defOutPortUuid": "out1"
          },
          "inputData2": {
            "type": "date",
            "propertyName": "dataName",
            "defInPortUuid": "in2"
          },
          "inputData3": {
            "type": "number",
            "propertyName": "dataName",
            "defInPortUuid": "in3"
          },
          "inputData4": {
            "type": "array",
            "propertyName": "dataName",
            "defInPortUuid": "in4"
          },
          "__coreNumPerExecutor": {
            "type": "string",
            "controlInstUuid": "system-core-num",
            "value": "",
            "isRequired": false
          },
          "__executorNum": {
            "type": "string",
            "controlInstUuid": "system-executor-num",
            "isRequired": false,
            "value": ""
          },
          "__memSizePerExecutor": {
            "type": "string",
            "controlInstUuid": "system-mem-size",
            "value": "",
            "isRequired": false
          },
          "__queue": {
            "type": "string",
            "controlInstUuid": "system-queue",
            "value": "",
            "isRequired": false
          },
          "__formula": {
            "type": "string",
            "controlInstUuid": "d6589d001ca311ea970f4ffa408b8947"
          }
        },
        "ports": [
          {
            "uuid": "in1",
            "description": {
              "en_US": "input data",
              "zh_CN": "A"
            },
            "display": true,
            "type": "data",
            "ioType": "in",
            "subType": "all"
          },
          {
            "uuid": "out1",
            "description": {
              "en_US": "output data",
              "zh_CN": "输出数据"
            },
            "display": true,
            "type": "data",
            "ioType": "out",
            "subType": "storage.txt"
          },
          {
            "uuid": "in2",
            "description": {
              "en_US": "input data",
              "zh_CN": "B"
            },
            "display": true,
            "ioType": "in",
            "type": "data",
            "subType": "all"
          },
          {
            "uuid": "in3",
            "description": {
              "en_US": "input data",
              "zh_CN": "C"
            },
            "display": true,
            "ioType": "in",
            "type": "data",
            "subType": "all"
          },
          {
            "uuid": "in4",
            "description": {
              "en_US": "input data",
              "zh_CN": "D"
            },
            "display": true,
            "ioType": "in",
            "type": "data"
          }
        ],
        "actionList": [
          {},
          {},
          {}
        ],
        "dockerRepo": "formula_component",
        "downloadList": [
          {},
          {},
          {}
        ],
        "watchList": [
          {},
          {},
          {}
        ],
        "dockerCmd": "python run.py components.formula.app"
      },
      "ui": {
        "tabs": {
          "fields": {
            "tabName": {
              "en_US": "Fields Setting",
              "zh_CN": "字段设置",
              "zh": "字段设置"
            },
            "controls": []
          },
          "params": {
            "tabName": {
              "en_US": "Parameters Setting",
              "zh_CN": "参数设置",
              "zh": "参数设置"
            },
            "controls": [
              {
                "uuid": "d6589d001ca311ea970f4ffa408b8947",
                "type": "formula_editor",
                "label": {
                  "zh_CN": "编辑公式"
                },
                "placeholder": {
                  "zh_CN": "占位提示文本"
                },
                "tooltip": {
                  "zh_CN": ""
                },
                "relations": {
                  "hide": {
                    "operator": "=="
                  }
                }
              }
            ]
          },
          "tune": {
            "tabName": {
              "en_US": "Tuning",
              "zh_CN": "执行调优",
              "zh": "执行调优"
            },
            "controls": [
              {
                "uuid": "system-executor-num",
                "type": "string",
                "label": {
                  "zh_CN": "executor数目"
                },
                "placeholder": {
                  "zh_CN": "默认自动选择"
                }
              },
              {
                "uuid": "system-core-num",
                "type": "string",
                "label": {
                  "zh_CN": "每个executor的core数目"
                },
                "placeholder": {
                  "zh_CN": "默认自动选择"
                }
              },
              {
                "uuid": "system-mem-size",
                "type": "string",
                "label": {
                  "zh_CN": "每个executor的内存数(GB)"
                },
                "placeholder": {
                  "zh_CN": "默认自动选择"
                }
              },
              {
                "uuid": "system-queue",
                "type": "string",
                "label": {
                  "zh_CN": "队列"
                },
                "placeholder": {
                  "zh_CN": "默认自动选择"
                }
              }
            ]
          }
        }
      },
      "locale": "zh_CN",
      "label": "公式编辑器",
      "x": 454.5,
      "y": 297,
      "type": "my_component",
      "width": 90,
      "height": 90
    }
  }
  var popup;
  
  $scope.showFormulaEidtor = function (controlInstUuid) {
    var nodeEl = $scope.node;
    popup = $uibModal.open({
      animation: true,
      templateUrl: 'tpl/formulaEditor.html',
      controller: ['$scope',
        function ($scope) {
          $scope.popupTitle = '编辑公式';
          // $scope.popupLoading = true;
          $scope.popupHasFooter = true;

          $scope.popupLoading = false;

          formatField = function(field) {
            let result = {...field};
            result.typeLabel = result.type;
            result.labelClass = '';
            switch(field.type) {
              case 'string':
                result.typeLabel = '文本';
                result.labelClass = 'string-label'
                break;
              case 'array':
                result.typeLabel = '数组';
                result.labelClass = 'array-label'
                break;
              case 'number':
                result.typeLabel = '数字';
                result.labelClass = 'number-label'
                break;
              case 'date':
                result.typeLabel = '时间戳';
                result.labelClass = 'time-label'
                break;
            }
            return result;
          }

          var paramsList = {...nodeEl.metadata.def.params}
          var paramsKeyList = Object.keys(paramsList);
          var currFieldList = [];
          paramsKeyList.forEach(key => {
            if(paramsList[key].defInPortUuid) {
              const inputField = paramsList[key];
              const newield = formatField(inputField);
              currFieldList.push(newield);
            }
          })
          $scope.currFieldList = currFieldList


          $scope.formularList = [{
            label: '常用函数',
            children: ['IF']
          },{
            label: '逻辑函数',
            children: ['AND','OR']
          }]

          $scope.handleTreeSelect = function(branch) {
            console.log("aaaaaaaaaaa", branch)
          }

          $scope.ok = function () {
            popup.close();
          };

          $scope.cancel = function () {
            popup.close();
          };
          $scope.$on('modal.closing', function (event, isClose) {
            popup = undefined;
          });

          $scope.$on('$destroy', function () {
          });
        }],
      size: 'lg',
      appendTo: ''
    });
  }
})