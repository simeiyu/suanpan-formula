
var app = angular.module('app', [
  // 'ngMaterial',
  'ngAnimate',
  // 'ngSanitize',
  'ui.bootstrap',
  'angularBootstrapNavTree',
  'ui.codemirror'
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
              "zh_CN": "AA"
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
              "zh_CN": "BB"
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
              "zh_CN": "CC"
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
              "zh_CN": "DD"
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
      backdrop: 'static',
      animation: true,
      templateUrl: 'tpl/formulaEditor.html',
      controller: ['$scope',
        function ($scope) {
          $scope.popupTitle = '编辑公式'
          $scope.inputAttr = '输出1'
          // $scope.popupLoading = true;
          $scope.popupHasFooter = true;

          $scope.popupLoading = false;

          formatField = function(field) {
            let result = {...field};
            result.typeLabel = result.type;
            result.labelClass = ''
            switch(field.type) {
              case 'string':
                result.typeLabel = '文本'
                result.labelClass = 'string-label'
                break;
              case 'array':
                result.typeLabel = '数组'
                result.labelClass = 'array-label'
                break;
              case 'number':
                result.typeLabel = '数字'
                result.labelClass = 'number-label'
                break;
              case 'date':
                result.typeLabel = '时间戳'
                result.labelClass = 'time-label'
                break;
            }
            return result;
          }

          $scope.editorOptions = {
            placeholder: '请输入公式',
            // mode:"text/html", //实现代码高亮,
            matchBrackets: true,   //括号匹配
            autoCloseBrackets:true,	// 是否自动闭合括号
            // extraKeys: {"Ctrl": "autocomplete"},
            indentUnit: 0, //缩进单位，值为空格数，默认为2 
            smartIndent: false, // 自动缩进,
            lineWrapping: true, // false->scroll, true-> word-break,
            autofocus: true,
          };

          $scope.fomularEditorValue = ""

          $scope.codemirrorLoaded = function(_editor){
            // Editor part
            $scope._editor = _editor;
            var _doc = _editor.getDoc();
            _editor.focus();

            handleShowHint = function () {
              const codeEditor = _editor;
              const codeMirrorInstance = _editor.constructor;
              const cur = codeEditor.getCursor();
              const curLine = codeEditor.getLine(cur.line);
              const end = cur.ch;
              const start = end;
              let list = [];
              // 根据不同情况给list赋值，默认为[]，即不显示提示框。
              const cursorOneCharactersBefore = `${curLine.charAt(start - 1)}`;
              if(cursorOneCharactersBefore === 'I'){
                list = ['IF'];
              } else if (cursorOneCharactersBefore === 'A') {
                list = ['AND'];
              } else if (cursorOneCharactersBefore === 'O') {
                list = ['OR'];
              }
              return {list: list, from: codeMirrorInstance.Pos(cur.line, start-1), to: codeMirrorInstance.Pos(cur.line, end)};
            }
            // Options
            _editor.setOption('hintOptions', {hint: handleShowHint, completeSingle: false});
            _doc.markClean();
        
            // Events
            _editor.on("beforeChange", function(){
              console.log("beforeChange")

            });
            _editor.on("change", function(instance, changeObj){
               console.log("change", instance, changeObj)
               instance.closeHint();
               instance.showHint();
               if (changeObj.origin === "custom_add") {
                const from = {line: changeObj.from.line, ch: changeObj.from.ch};
                const length = changeObj.text[0].split("").length;
                const to = {line: changeObj.from.line, ch: changeObj.from.ch + length};
                instance.markText(from,to,{className: 'cm-field-name', selectRight: true, atomic: true})
               }
            });
            _editor.constructor.defineSimpleMode("simplemode", {
              start: [
                {regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
                {regex: /IF|AND|OR/, token: "keyword"},
                {regex: /true|false|null|undefined/, token: "atom"},
                {regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i, token: "number"},
                {regex: /\/(?:[^\\]|\\.)*?\//, token: "variable-3"},
                {regex: /[-+\/*=<>!]+/, token: "operator"},
                {regex: /[\{\[\(]/, indent: true},
                {regex: /[\}\]\)]/, dedent: true},
                {regex: /[a-z$][\w$]*/, token: "variable"},
              ]
            });
            _editor.setOption('mode', 'simplemode');
          };

          var portsList = [...nodeEl.metadata.def.ports]
          var currFieldList = [];
          portsList.forEach(port => {
            if(port.ioType === 'in') {
              const portFormat = {
                id: port.uuid,
                name: port.description.zh_CN,
                type: port.subType
              }
              const newField = formatField(portFormat);
              currFieldList.push(newField);
            }
          })
          $scope.currFieldList = currFieldList


          $scope.formularList = [{
            label: '常用函数',
            children: [
              {label: 'IF', format: 'IF(A,B,C)', description: '表示如果满足条件A，那么返回B，否则返回C'}
            ]
          },{
            label: '逻辑函数',
            children: [
              {label: 'AND', format: 'AND(逻辑表达式1,逻辑表达式2,...)', description: '如果所有参数都为真，AND函数返回布尔值true，否则返回布尔值 false'},
              {label: 'OR', format: 'OR(逻辑表达式1,逻辑表达式2,...)', description: '如果任意参数为真，OR 函数返回布尔值true；如果所有参数为假，返回布尔值false。'},
            ]
          }]

          $scope.handleTreeSelect = function(branch) {
            console.log("aaaaaaaaaaa", branch)
          }

          $scope.handleClickAddField = function(field) {
            if($scope._editor) {
              var doc = $scope._editor.getDoc();
              var pos = doc.getCursor();
              doc.replaceRange(field.name, pos, undefined, 'custom_add');
              const newCursorPos = {line: pos.line, ch: pos.ch + field.name.split("").length}
              console.log("newCursorPos",newCursorPos)
              $scope._editor.focus();
              doc.setCursor(newCursorPos)
            }
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