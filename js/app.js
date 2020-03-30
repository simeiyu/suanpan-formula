
var app = angular.module('app', [
  // 'ngMaterial',
  'ngAnimate',
  // 'ngSanitize',
  'ui.bootstrap',
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
            "controlInstUuid": "d6589d001ca311ea970f4ffa408b8947",
            "value": "IF(AND(in1>2,in1<3), yes, no)\nIF(in1,in2,in3)\nAND(in1,in2,in3)"
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

  setFormularValue = function(controlInstUuid, formularStr) {
    const params = {...$scope.node.metadata.def.params}
    const keys = Object.keys(params);
    keys.forEach(key => {
      if(params[key].controlInstUuid && params[key].controlInstUuid === controlInstUuid) {
        $scope.node.metadata.def.params[key].value = formularStr;
        return;
      }
    })
  }

  getFormularValue = function(controlInstUuid) {
    const params = {...$scope.node.metadata.def.params}
    const keys = Object.keys(params);
    let formularStr = '';
    keys.forEach(key => {
      if(params[key].controlInstUuid && params[key].controlInstUuid === controlInstUuid) {
        formularStr = $scope.node.metadata.def.params[key].value;
        return;
      }
    })
    return formularStr;
  }
  
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

          $scope.editorOptions = {
            placeholder: '请在此输入公式...',
            matchBrackets: true,   //括号匹配
            autoCloseBrackets:true,	// 是否自动闭合括号
            indentUnit: 0, //缩进单位，值为空格数，默认为2 
            smartIndent: false, // 自动缩进,
            lineWrapping: true, // false->scroll, true-> word-break,
            autofocus: true,
          };

          $scope.codemirrorLoaded = function(_editor){
            // Editor part
            $scope._editor = _editor;
            var _doc = _editor.getDoc();
            setTimeout(()=>{
              const initValue = getFormularValue(controlInstUuid);
              if(initValue && initValue !== '') {
                _doc.replaceRange(initValue, {line:0, char:0}, undefined, 'setInitValue');
              }
            },0)

            handleShowHint = function () {
              const codeEditor = _editor;
              const CodeMirror = _editor.constructor;
              const cur = codeEditor.getCursor();
              const curLine = codeEditor.getLine(cur.line);
              const end = cur.ch;
              const start = end;
              const keywords = ["AND", "IF", "OR"];
    
              const lineChars = curLine.split('');
              var index = end;
              for(let i = end-1; i >= 0; i-=1) {
                if(/\w/.test(lineChars[i])) {
                  index = i;
                } else {
                  break;
                }
              }
              var word = '';
              if(index < end) {
                word = curLine.slice(index, end);
              }
              const result = [];
              function add(keywords, charBefore) {
                keywords.forEach( keyword => {
                  if (charBefore && keyword.lastIndexOf(charBefore.toUpperCase(), 0) === 0) {
                    result.push(keyword);
                  }
                })
              }
              // 根据不同情况给list赋值，默认为[]，即不显示提示框。
              if(word !== '') {
                add(keywords, word);
              }
              const wordLen = word.split('').length
              return {list: result, from: CodeMirror.Pos(cur.line, start-wordLen), to: CodeMirror.Pos(cur.line, end)};
            }
            // Options
            _editor.setOption('hintOptions', {hint: handleShowHint, completeSingle: false});

            searchSubStr = function (str,subStr){
              let positions = [];
              let pos = str.indexOf(subStr);
              while(pos>-1){
                  positions.push(pos);
                  pos = str.indexOf(subStr,pos+1);
              }
              return positions;
            }
        
            // Events
            _editor.on("change", function(instance, changeObj){
              console.log("change", instance, changeObj)
              instance.closeHint();
              if (changeObj.origin) {
                if (changeObj.origin==='setInitValue') {
                  _editor.focus();
                  const currentLineValue = changeObj.text; // text 行数据
                  currentLineValue.forEach( (currentValue, index) => {
                    currFieldList.forEach(field => {
                      const positions = searchSubStr(currentValue,field.id);
                      positions.forEach(pos => {
                        const from = {line: index, ch: pos};
                        const length = field.id.length;
                        const to = {line: index, ch: pos + length};
                        const spanDom = document.createElement('span');
                        spanDom.innerHTML=field.name;
                        spanDom.className = 'cm-field-name';
                        instance.markText(from,to,{selectRight: true, atomic: true, replacedWith: spanDom})
                      })
                    })
                  })
                } else if (/custom_add-field-/.test(changeObj.origin)) {
                  const originPre = changeObj.origin;
                  const name = originPre.replace("custom_add-field-","")
                  const from = {line: changeObj.from.line, ch: changeObj.from.ch};
                  const length = changeObj.text[0].split("").length;
                  const to = {line: changeObj.from.line, ch: changeObj.from.ch + length};
                  const spanDom = document.createElement('span');
                  spanDom.innerHTML=name;
                  spanDom.className = 'cm-field-name';
                  instance.markText(from,to,{selectRight: true, atomic: true, replacedWith: spanDom})
                } else if (changeObj.origin==='complete') {
                  var pos = _doc.getCursor();
                  _doc.replaceRange("()", pos, undefined, 'custom_add-formular');
                  const newCursorPos = {line: pos.line, ch: pos.ch+1}
                  _doc.setCursor(newCursorPos)
                } else if (!/custom_add-formular/.test(changeObj.origin)){
                  instance.showHint();
                }
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
                {regex: /[a-zA-Z$][\w$]*/, token: "variable"},
              ]
            });
            _editor.setOption('mode', 'simplemode');
          };

          $scope.formularList = [{
            label: '常用函数',
            expand: true,
            children: [
              {label: 'IF', format: 'IF(A,B,C)', description: '表示如果满足条件A，那么返回B，否则返回C'}
            ]
          },{
            label: '逻辑函数',
            expand: true,
            children: [
              {label: 'AND', format: 'AND(逻辑表达式1,逻辑表达式2,...)', description: '如果所有参数都为真，AND函数返回布尔值true，否则返回布尔值 false'},
              {label: 'OR', format: 'OR(逻辑表达式1,逻辑表达式2,...)', description: '如果任意参数为真，OR 函数返回布尔值true；如果所有参数为假，返回布尔值false。'},
            ]
          }]


          $scope.handleClickTreeLabel = function(index) {
            $scope.formularList[index].expand = !$scope.formularList[index].expand
          }

          $scope.selecFormular = {format: '', description: ''}
          $scope.handleTreeSelect = function(branch) {
            if($scope._editor) {
              var doc = $scope._editor.getDoc();
              var pos = doc.getCursor();
              doc.replaceRange(`${branch.label}()`, pos, undefined, `custom_add-formular`,);
              const newCursorPos = {line: pos.line, ch: pos.ch + branch.label.split("").length+1}
              $scope._editor.focus();
              doc.setCursor(newCursorPos)
            }
          }

          $scope.handleTreeHover = function(branch) {
            $scope.selecFormular = {...branch};
          }

          $scope.handleClickAddField = function(field) {
            if($scope._editor) {
              var doc = $scope._editor.getDoc();
              var pos = doc.getCursor();
              doc.replaceRange(field.id, pos, undefined, `custom_add-field-${field.name}`,);
              const newCursorPos = {line: pos.line, ch: pos.ch + field.id.split("").length}
              $scope._editor.focus();
              doc.setCursor(newCursorPos)
            }
          }

          $scope.ok = function () {
            let formular = $scope._editor.getValue();
            console.log("公式结果", formular)
            setFormularValue(controlInstUuid, formular);
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