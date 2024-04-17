function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { FlatList } from 'react-native';

const ScrollViewComponent = props => {
  return /*#__PURE__*/React.createElement(FlatList, _extends({}, props, {
    data: [],
    keyExtractor: (_e, i) => 'dom' + i.toString(),
    ListEmptyComponent: null,
    renderItem: null,
    ListHeaderComponent: () => /*#__PURE__*/React.createElement(React.Fragment, null, props.children)
  }));
};

export default ScrollViewComponent;
//# sourceMappingURL=index.js.map