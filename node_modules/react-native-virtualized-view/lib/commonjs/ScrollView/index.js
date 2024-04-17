"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ScrollViewComponent = props => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, _extends({}, props, {
    data: [],
    keyExtractor: (_e, i) => 'dom' + i.toString(),
    ListEmptyComponent: null,
    renderItem: null,
    ListHeaderComponent: () => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.children)
  }));
};

var _default = ScrollViewComponent;
exports.default = _default;
//# sourceMappingURL=index.js.map