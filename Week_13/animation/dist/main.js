/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tools_animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/animation.js */ \"./tools/animation.js\");\n/* harmony import */ var _tools_cubic_bezier_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools/cubic-bezier.js */ \"./tools/cubic-bezier.js\");\n\n\nvar tl = new _tools_animation_js__WEBPACK_IMPORTED_MODULE_0__.Timeline();\nvar animation = new _tools_animation_js__WEBPACK_IMPORTED_MODULE_0__.Animation(document.querySelector('#el').style, \"transform\", 0, 500, 2000, 0, (0,_tools_cubic_bezier_js__WEBPACK_IMPORTED_MODULE_1__.default)(.25, .1, .25, 1), function (v) {\n  return \"translateX(\".concat(v, \"px)\");\n});\ndocument.querySelector('#el').addEventListener('mouseover', function () {\n  return tl.pause();\n});\ndocument.querySelector('#el').addEventListener('mouseout', function () {\n  return tl.resume();\n});\ntl.start();\nsetTimeout(function () {\n  tl.add(animation);\n}, 1000);\n\n//# sourceURL=webpack://animation/./main.js?");

/***/ }),

/***/ "./tools/animation.js":
/*!****************************!*\
  !*** ./tools/animation.js ***!
  \****************************/
/*! namespace exports */
/*! export Animation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Timeline [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Timeline\": () => /* binding */ Timeline,\n/* harmony export */   \"Animation\": () => /* binding */ Animation\n/* harmony export */ });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar TICK = Symbol('tick');\nvar TICK_HANDLER = Symbol('tick-handler');\nvar ANIMATIONS = Symbol('animations');\nvar TIMELINE_START = Symbol('timeline-start');\nvar ANIMATION_START = Symbol('animation-start');\nvar PAUSE_START = Symbol('pause-start');\nvar PAUSED_TIME = Symbol('pause-time');\nvar Timeline = /*#__PURE__*/function () {\n  function Timeline() {\n    var _this = this;\n\n    _classCallCheck(this, Timeline);\n\n    this.init();\n\n    this[TICK] = function () {\n      var now = Date.now();\n      var t;\n\n      var _iterator = _createForOfIteratorHelper(_this[ANIMATIONS]),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var animation = _step.value;\n\n          if (_this[ANIMATION_START].get(animation) < _this[TIMELINE_START]) {\n            // animation starts before timeline starts\n            t = now - _this[TIMELINE_START];\n          } else {\n            // animation starts after timeline starts\n            t = now - _this[ANIMATION_START].get(animation);\n          }\n\n          t -= _this[PAUSED_TIME]; // remove paused time\n\n          t -= animation.delay; // apply delay\n\n          if (t >= 0) {\n            // if t < 0, it means animation is not started yet\n            if (animation.duration > t) {\n              // animation receives time, update property\n              animation.receive(t);\n            } else {\n              // delete expired animation\n              _this[ANIMATIONS][\"delete\"](animation);\n            }\n          }\n        } // ask for next frame\n\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      _this[TICK_HANDLER] = requestAnimationFrame(_this[TICK]);\n    };\n  }\n\n  _createClass(Timeline, [{\n    key: \"init\",\n    value: function init() {\n      this[TIMELINE_START] = Date.now();\n      this[ANIMATIONS] = new Set();\n      this[ANIMATION_START] = new Map(); // key: animation, value: start time\n\n      this[PAUSED_TIME] = 0; // init PAUSED_TIME as 0, means never paused\n\n      this[PAUSE_START] = 0;\n      this[TICK_HANDLER] = null;\n    }\n  }, {\n    key: \"start\",\n    value: function start() {\n      this[TICK]();\n    }\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      this[PAUSE_START] = Date.now();\n      cancelAnimationFrame(this[TICK_HANDLER]);\n    }\n  }, {\n    key: \"resume\",\n    value: function resume() {\n      this[PAUSED_TIME] += Date.now() - this[PAUSE_START];\n      this[TICK]();\n    }\n  }, {\n    key: \"reset\",\n    value: function reset() {\n      cancelAnimationFrame(this[TICK_HANDLER]);\n      this.init();\n    }\n  }, {\n    key: \"add\",\n    value: function add(animation) {\n      var startTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Date.now();\n      this[ANIMATIONS].add(animation);\n      this[ANIMATION_START].set(animation, startTime);\n    }\n  }]);\n\n  return Timeline;\n}();\nvar Animation = /*#__PURE__*/function () {\n  function Animation(object, property, startValue, endValue, duration, delay, timingFn, template) {\n    _classCallCheck(this, Animation);\n\n    this.object = object;\n    this.property = property;\n    this.startValue = startValue;\n    this.endValue = endValue;\n    this.duration = duration;\n    this.delay = delay;\n\n    this.timingFn = timingFn || function (v) {\n      return v;\n    };\n\n    this.template = template || function (v) {\n      return v;\n    };\n  }\n\n  _createClass(Animation, [{\n    key: \"receive\",\n    value: function receive(time) {\n      var range = this.endValue - this.startValue;\n      var progress = this.timingFn(time / this.duration);\n      this.object[this.property] = this.template(this.startValue + range * progress);\n    }\n  }]);\n\n  return Animation;\n}();\n\n//# sourceURL=webpack://animation/./tools/animation.js?");

/***/ }),

/***/ "./tools/cubic-bezier.js":
/*!*******************************!*\
  !*** ./tools/cubic-bezier.js ***!
  \*******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/**\n * https://github.com/gre/bezier-easing\n * BezierEasing - use bezier curve for transition easing function\n * by Gaëtan Renaudeau 2014 - 2015 – MIT License\n */\n// These values are established by empiricism with tests (tradeoff: performance VS precision)\nvar NEWTON_ITERATIONS = 4;\nvar NEWTON_MIN_SLOPE = 0.001;\nvar SUBDIVISION_PRECISION = 0.0000001;\nvar SUBDIVISION_MAX_ITERATIONS = 10;\nvar kSplineTableSize = 11;\nvar kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);\nvar float32ArraySupported = typeof Float32Array === 'function';\n\nfunction A(aA1, aA2) {\n  return 1.0 - 3.0 * aA2 + 3.0 * aA1;\n}\n\nfunction B(aA1, aA2) {\n  return 3.0 * aA2 - 6.0 * aA1;\n}\n\nfunction C(aA1) {\n  return 3.0 * aA1;\n} // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.\n\n\nfunction calcBezier(aT, aA1, aA2) {\n  return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;\n} // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.\n\n\nfunction getSlope(aT, aA1, aA2) {\n  return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);\n}\n\nfunction binarySubdivide(aX, aA, aB, mX1, mX2) {\n  var currentX,\n      currentT,\n      i = 0;\n\n  do {\n    currentT = aA + (aB - aA) / 2.0;\n    currentX = calcBezier(currentT, mX1, mX2) - aX;\n\n    if (currentX > 0.0) {\n      aB = currentT;\n    } else {\n      aA = currentT;\n    }\n  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);\n\n  return currentT;\n}\n\nfunction newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {\n  for (var i = 0; i < NEWTON_ITERATIONS; ++i) {\n    var currentSlope = getSlope(aGuessT, mX1, mX2);\n\n    if (currentSlope === 0.0) {\n      return aGuessT;\n    }\n\n    var currentX = calcBezier(aGuessT, mX1, mX2) - aX;\n    aGuessT -= currentX / currentSlope;\n  }\n\n  return aGuessT;\n}\n\nfunction LinearEasing(x) {\n  return x;\n}\n\nfunction bezier(mX1, mY1, mX2, mY2) {\n  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {\n    throw new Error('bezier x values must be in [0, 1] range');\n  }\n\n  if (mX1 === mY1 && mX2 === mY2) {\n    return LinearEasing;\n  } // Precompute samples table\n\n\n  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);\n\n  for (var i = 0; i < kSplineTableSize; ++i) {\n    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);\n  }\n\n  function getTForX(aX) {\n    var intervalStart = 0.0;\n    var currentSample = 1;\n    var lastSample = kSplineTableSize - 1;\n\n    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {\n      intervalStart += kSampleStepSize;\n    }\n\n    --currentSample; // Interpolate to provide an initial guess for t\n\n    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);\n    var guessForT = intervalStart + dist * kSampleStepSize;\n    var initialSlope = getSlope(guessForT, mX1, mX2);\n\n    if (initialSlope >= NEWTON_MIN_SLOPE) {\n      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);\n    } else if (initialSlope === 0.0) {\n      return guessForT;\n    } else {\n      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);\n    }\n  }\n\n  return function BezierEasing(x) {\n    // Because JavaScript number are imprecise, we should guarantee the extremes are right.\n    if (x === 0 || x === 1) {\n      return x;\n    }\n\n    return calcBezier(getTForX(x), mY1, mY2);\n  };\n}\n\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bezier);\n\n//# sourceURL=webpack://animation/./tools/cubic-bezier.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;