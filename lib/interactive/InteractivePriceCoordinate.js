"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("../utils");

var _utils2 = require("./utils");

var _EachPriceCoordinate = require("./wrapper/EachPriceCoordinate");

var _EachPriceCoordinate2 = _interopRequireDefault(_EachPriceCoordinate);

var _HoverTextNearMouse = require("./components/HoverTextNearMouse");

var _HoverTextNearMouse2 = _interopRequireDefault(_HoverTextNearMouse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InteractivePriceCoordinate = function (_Component) {
	_inherits(InteractivePriceCoordinate, _Component);

	function InteractivePriceCoordinate(props) {
		_classCallCheck(this, InteractivePriceCoordinate);

		var _this = _possibleConstructorReturn(this, (InteractivePriceCoordinate.__proto__ || Object.getPrototypeOf(InteractivePriceCoordinate)).call(this, props));

		_this.handleDrag = _this.handleDrag.bind(_this);
		_this.handleDragComplete = _this.handleDragComplete.bind(_this);
		_this.terminate = _utils2.terminate.bind(_this);

		_this.saveNodeType = _utils2.saveNodeType.bind(_this);
		_this.getSelectionState = (0, _utils2.isHoverForInteractiveType)("alertList").bind(_this);

		_this.nodes = [];
		_this.state = {};
		return _this;
	}

	_createClass(InteractivePriceCoordinate, [{
		key: "handleDrag",
		value: function handleDrag(index, yValue) {
			this.setState({
				override: {
					index: index,
					yValue: yValue
				}
			});
		}
	}, {
		key: "handleDragComplete",
		value: function handleDragComplete(moreProps) {
			var _this2 = this;

			var override = this.state.override;

			if ((0, _utils.isDefined)(override)) {
				var alertList = this.props.alertList;

				var newAlertList = alertList.map(function (each, idx) {
					var selected = idx === override.index;
					return selected ? _extends({}, each, {
						yValue: override.yValue,
						selected: selected
					}) : _extends({}, each, {
						selected: selected
					});
				});
				var draggedAlert = newAlertList[override.index];
				this.setState({
					override: null
				}, function () {
					_this2.props.onDragComplete(newAlertList, moreProps, draggedAlert);
				});
			}
		}
	}, {
		key: "handleDrawLine",
		value: function handleDrawLine(xyValue) {
			var current = this.state.current;


			if ((0, _utils.isDefined)(current) && (0, _utils.isDefined)(current.start)) {
				this.setState({
					current: {
						start: current.start,
						end: xyValue
					}
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var alertList = this.props.alertList;
			var override = this.state.override;

			return _react2.default.createElement(
				"g",
				null,
				alertList.map(function (each, idx) {
					var props = each;
					return _react2.default.createElement(_EachPriceCoordinate2.default, _extends({ key: idx,
						ref: _this3.saveNodeType(idx),
						index: idx
					}, props, {
						selected: each.selected,
						yValue: (0, _utils2.getValueFromOverride)(override, idx, "yValue", each.yValue),

						onDrag: _this3.handleDrag,
						onDragComplete: _this3.handleDragComplete,
						edgeInteractiveCursor: "react-stockcharts-move-cursor"
					}));
				})
			);
		}
	}]);

	return InteractivePriceCoordinate;
}(_react.Component);

InteractivePriceCoordinate.propTypes = {
	onChoosePosition: _propTypes2.default.func.isRequired,
	onDragComplete: _propTypes2.default.func.isRequired,
	onSelect: _propTypes2.default.func,

	defaultPriceCoordinate: _propTypes2.default.shape({
		bgFill: _propTypes2.default.string.isRequired,
		bgOpacity: _propTypes2.default.number.isRequired,
		textFill: _propTypes2.default.string.isRequired,
		fontFamily: _propTypes2.default.string.isRequired,
		fontWeight: _propTypes2.default.string.isRequired,
		fontStyle: _propTypes2.default.string.isRequired,
		fontSize: _propTypes2.default.number.isRequired,
		text: _propTypes2.default.string.isRequired
	}).isRequired,

	hoverText: _propTypes2.default.object.isRequired,
	alertList: _propTypes2.default.array.isRequired,
	enabled: _propTypes2.default.bool.isRequired
};

InteractivePriceCoordinate.defaultProps = {
	onChoosePosition: _utils.noop,
	onDragComplete: _utils.noop,
	onSelect: _utils.noop,

	defaultPriceCoordinate: {
		bgFill: "#FFFFFF",
		bgOpacity: 1,
		textFill: "#F10040",
		fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		text: "Lorem ipsum..."
	},
	hoverText: _extends({}, _HoverTextNearMouse2.default.defaultProps, {
		enable: true,
		bgHeight: 18,
		bgWidth: 175,
		text: "Click and drag the edge circles"
	}),
	alertList: []
};

InteractivePriceCoordinate.contextTypes = {
	subscribe: _propTypes2.default.func.isRequired,
	unsubscribe: _propTypes2.default.func.isRequired,
	generateSubscriptionId: _propTypes2.default.func.isRequired,
	chartId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired
};

exports.default = InteractivePriceCoordinate;
//# sourceMappingURL=InteractivePriceCoordinate.js.map