(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/niels/PhpstormProjects/npm-packages/react-spawner/node_modules/array-difference/difference.js":[function(require,module,exports){
(function(global) {

	var indexOf = Array.prototype.indexOf || function(elem) {
		var idx, len;

		if (this == null) {
			throw new TypeError("indexOf called on null or undefined");
		}

		for (idx = 0, len = this.length; idx < len; ++idx) {
			if (this[idx] === elem) {
				return idx;
			}
		}

		return -1;
	};

	function difference(a, b) {
		var idx, len;
		var res = [];

		for (idx = 0, len = a.length; idx < len; ++idx) {
			if (indexOf.call(b, a[idx]) === -1) {
				res.push(a[idx]);
			}
		}
		for (idx = 0, len = b.length; idx < len; ++idx) {
			if (indexOf.call(a, b[idx]) === -1) {
				res.push(b[idx]);
			}
		}
		return res;
	}

	if (typeof module === "object" && module.exports) {
		module.exports = difference;
	} else if (typeof define === "function" && define.amd) {
		define(function() {
			return difference;
		});
	} else {
		global.difference = difference;
	}

}(this));

},{}],"/Users/niels/PhpstormProjects/npm-packages/react-spawner/src/ComponentSpawner.react.js":[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _arrayDifference = require('array-difference');

var _arrayDifference2 = _interopRequireDefault(_arrayDifference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class that will spawn Components if their appropriate DOM elements are present.
 */

var ComponentSpawner = function () {
    /**
     * Constructs the ComponentsFactory.
     */

    function ComponentSpawner() {
        _classCallCheck(this, ComponentSpawner);

        this.spawns = [];
        this.spawnList = [];
    }

    /**
     * Gets all spawns that have occurred
     * @returns {Array}
     */

    _createClass(ComponentSpawner, [{
        key: 'getSpawns',
        value: function getSpawns() {
            return this.spawns;
        }

        /**
         * Sets the SpawnList
         *
         * @param {Array} list
         */

    }, {
        key: 'setSpawnList',
        value: function setSpawnList(list) {
            this.spawnList = list;
        }

        /**
         * Returns the list of all known DOMNode's and their assigned React Component.
         *
         * @returns {Array}
         */

    }, {
        key: 'getSpawnList',
        value: function getSpawnList() {
            return this.spawnList;
        }

        /**
         * Fills the blank JSX in the component objects.
         * Modifies the spawnlist.
         */

    }, {
        key: 'classFiller',
        value: function classFiller(component) {
            throw new TypeError('classFilter can not be called on the super class, please extend the ComponentSpawner');
        }

        /**
         * Builds the object for a component
         *
         * @param {string} domElement : Id of the DOMNode you want to populate.
         * @param {string} ReactClass : the className of the React Component you want to spawn.
         * @param {object} props : Props for the React Component.
         */

    }, {
        key: 'buildComponentObject',
        value: function buildComponentObject(domElement, ReactClass, props) {
            return {
                "name": ReactClass,
                "props": props,
                "target": domElement,
                "jsx": null
            };
        }

        /**
         * Renders an Component on the fly
         *
         * @param {object} component
         */

    }, {
        key: 'renderComponent',
        value: function renderComponent(component) {
            ReactDOM.render(component.jsx, document.getElementById(component.target));
        }

        /**
         * Spawns all Components
         *
         * @param {Array} list
         */

    }, {
        key: 'spawner',
        value: function spawner(list) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var component = _step.value;

                    if (document.getElementById(component.target)) {
                        this.renderComponent(this.classFiller(component));
                        this.spawns.push(component);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        /**
         * Re-runs the the bootstrapping process, but only processes the divs that were not present on page render
         */

    }, {
        key: 'reload',
        value: function reload() {
            var diff = (0, _arrayDifference2.default)(this.getSpawns(), this.getSpawnList());
            this.spawner(diff);
        }

        /**
         * Spawns a component that isn't registered in the components.spawner.json.
         *
         * @param {string} domElement : Id of the DOMNode you want to populate.
         * @param {string} ReactClass : the className of the React Component you want to spawn.
         * @param {object} props : Props for the React Component.
         */

    }, {
        key: 'spawnUnregistered',
        value: function spawnUnregistered(domElement, ReactClass, props) {
            var component = this.classFiller(this.buildComponentObject(domElement, ReactClass, props));
            this.renderComponent(component);
        }
    }]);

    return ComponentSpawner;
}();

exports.default = ComponentSpawner;

},{"array-difference":"/Users/niels/PhpstormProjects/npm-packages/react-spawner/node_modules/array-difference/difference.js"}]},{},["/Users/niels/PhpstormProjects/npm-packages/react-spawner/src/ComponentSpawner.react.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXJyYXktZGlmZmVyZW5jZS9kaWZmZXJlbmNlLmpzIiwic3JjL0NvbXBvbmVudFNwYXduZXIucmVhY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDekNxQjs7Ozs7QUFLakIsYUFMaUIsZ0JBS2pCLEdBQ0E7OEJBTmlCLGtCQU1qQjs7QUFDSSxhQUFLLE1BQUwsR0FBYyxFQUFkLENBREo7QUFFSSxhQUFLLFNBQUwsR0FBaUIsRUFBakIsQ0FGSjtLQURBOzs7Ozs7O2lCQUxpQjs7b0NBZ0JqQjtBQUNJLG1CQUFPLEtBQUssTUFBTCxDQURYOzs7Ozs7Ozs7OztxQ0FTYSxNQUNiO0FBQ0ksaUJBQUssU0FBTCxHQUFpQixJQUFqQixDQURKOzs7Ozs7Ozs7Ozt1Q0FVQTtBQUNJLG1CQUFPLEtBQUssU0FBTCxDQURYOzs7Ozs7Ozs7O29DQVFZLFdBQ1o7QUFDSSxrQkFBTSxJQUFJLFNBQUosQ0FBYyxzRkFBZCxDQUFOLENBREo7Ozs7Ozs7Ozs7Ozs7NkNBV3FCLFlBQVksWUFBWSxPQUM3QztBQUNJLG1CQUFPO0FBQ0gsd0JBQVEsVUFBUjtBQUNBLHlCQUFTLEtBQVQ7QUFDQSwwQkFBVSxVQUFWO0FBQ0EsdUJBQU8sSUFBUDthQUpKLENBREo7Ozs7Ozs7Ozs7O3dDQWNnQixXQUNoQjtBQUNJLHFCQUFTLE1BQVQsQ0FDSSxVQUFVLEdBQVYsRUFDQSxTQUFTLGNBQVQsQ0FBd0IsVUFBVSxNQUFWLENBRjVCLEVBREo7Ozs7Ozs7Ozs7O2dDQVlRLE1BQ1I7Ozs7OztBQUNJLHFDQUFzQiw4QkFBdEIsb0dBQTRCO3dCQUFuQix3QkFBbUI7O0FBQ3hCLHdCQUFJLFNBQVMsY0FBVCxDQUF3QixVQUFVLE1BQVYsQ0FBNUIsRUFBK0M7QUFDM0MsNkJBQUssZUFBTCxDQUFxQixLQUFLLFdBQUwsQ0FBaUIsU0FBakIsQ0FBckIsRUFEMkM7QUFFM0MsNkJBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsU0FBakIsRUFGMkM7cUJBQS9DO2lCQURKOzs7Ozs7Ozs7Ozs7OzthQURKOzs7Ozs7Ozs7aUNBYUE7QUFDSSxnQkFBSSxPQUFPLCtCQUFXLEtBQUssU0FBTCxFQUFYLEVBQTZCLEtBQUssWUFBTCxFQUE3QixDQUFQLENBRFI7QUFFSSxpQkFBSyxPQUFMLENBQWEsSUFBYixFQUZKOzs7Ozs7Ozs7Ozs7OzBDQVlrQixZQUFZLFlBQVksT0FDMUM7QUFDSSxnQkFBSSxZQUFZLEtBQUssV0FBTCxDQUFpQixLQUFLLG9CQUFMLENBQTBCLFVBQTFCLEVBQXNDLFVBQXRDLEVBQWtELEtBQWxELENBQWpCLENBQVosQ0FEUjtBQUVJLGlCQUFLLGVBQUwsQ0FBcUIsU0FBckIsRUFGSjs7OztXQS9HaUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKGdsb2JhbCkge1xuXG5cdHZhciBpbmRleE9mID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YgfHwgZnVuY3Rpb24oZWxlbSkge1xuXHRcdHZhciBpZHgsIGxlbjtcblxuXHRcdGlmICh0aGlzID09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJpbmRleE9mIGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZFwiKTtcblx0XHR9XG5cblx0XHRmb3IgKGlkeCA9IDAsIGxlbiA9IHRoaXMubGVuZ3RoOyBpZHggPCBsZW47ICsraWR4KSB7XG5cdFx0XHRpZiAodGhpc1tpZHhdID09PSBlbGVtKSB7XG5cdFx0XHRcdHJldHVybiBpZHg7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIC0xO1xuXHR9O1xuXG5cdGZ1bmN0aW9uIGRpZmZlcmVuY2UoYSwgYikge1xuXHRcdHZhciBpZHgsIGxlbjtcblx0XHR2YXIgcmVzID0gW107XG5cblx0XHRmb3IgKGlkeCA9IDAsIGxlbiA9IGEubGVuZ3RoOyBpZHggPCBsZW47ICsraWR4KSB7XG5cdFx0XHRpZiAoaW5kZXhPZi5jYWxsKGIsIGFbaWR4XSkgPT09IC0xKSB7XG5cdFx0XHRcdHJlcy5wdXNoKGFbaWR4XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAoaWR4ID0gMCwgbGVuID0gYi5sZW5ndGg7IGlkeCA8IGxlbjsgKytpZHgpIHtcblx0XHRcdGlmIChpbmRleE9mLmNhbGwoYSwgYltpZHhdKSA9PT0gLTEpIHtcblx0XHRcdFx0cmVzLnB1c2goYltpZHhdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlcztcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGRpZmZlcmVuY2U7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0Z2xvYmFsLmRpZmZlcmVuY2UgPSBkaWZmZXJlbmNlO1xuXHR9XG5cbn0odGhpcykpO1xuIiwiaW1wb3J0IGRpZmZlcmVuY2UgZnJvbSAnYXJyYXktZGlmZmVyZW5jZSc7XG5cbi8qKlxuICogQ2xhc3MgdGhhdCB3aWxsIHNwYXduIENvbXBvbmVudHMgaWYgdGhlaXIgYXBwcm9wcmlhdGUgRE9NIGVsZW1lbnRzIGFyZSBwcmVzZW50LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb25lbnRTcGF3bmVyXG57XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyB0aGUgQ29tcG9uZW50c0ZhY3RvcnkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5zcGF3bnMgPSBbXTtcbiAgICAgICAgdGhpcy5zcGF3bkxpc3QgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGFsbCBzcGF3bnMgdGhhdCBoYXZlIG9jY3VycmVkXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGdldFNwYXducygpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGF3bnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgU3Bhd25MaXN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0XG4gICAgICovXG4gICAgc2V0U3Bhd25MaXN0KGxpc3QpXG4gICAge1xuICAgICAgICB0aGlzLnNwYXduTGlzdCA9IGxpc3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGlzdCBvZiBhbGwga25vd24gRE9NTm9kZSdzIGFuZCB0aGVpciBhc3NpZ25lZCBSZWFjdCBDb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0U3Bhd25MaXN0KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnNwYXduTGlzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaWxscyB0aGUgYmxhbmsgSlNYIGluIHRoZSBjb21wb25lbnQgb2JqZWN0cy5cbiAgICAgKiBNb2RpZmllcyB0aGUgc3Bhd25saXN0LlxuICAgICAqL1xuICAgIGNsYXNzRmlsbGVyKGNvbXBvbmVudClcbiAgICB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NsYXNzRmlsdGVyIGNhbiBub3QgYmUgY2FsbGVkIG9uIHRoZSBzdXBlciBjbGFzcywgcGxlYXNlIGV4dGVuZCB0aGUgQ29tcG9uZW50U3Bhd25lcicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkcyB0aGUgb2JqZWN0IGZvciBhIGNvbXBvbmVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRvbUVsZW1lbnQgOiBJZCBvZiB0aGUgRE9NTm9kZSB5b3Ugd2FudCB0byBwb3B1bGF0ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gUmVhY3RDbGFzcyA6IHRoZSBjbGFzc05hbWUgb2YgdGhlIFJlYWN0IENvbXBvbmVudCB5b3Ugd2FudCB0byBzcGF3bi5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcHJvcHMgOiBQcm9wcyBmb3IgdGhlIFJlYWN0IENvbXBvbmVudC5cbiAgICAgKi9cbiAgICBidWlsZENvbXBvbmVudE9iamVjdChkb21FbGVtZW50LCBSZWFjdENsYXNzLCBwcm9wcylcbiAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcIm5hbWVcIjogUmVhY3RDbGFzcyxcbiAgICAgICAgICAgIFwicHJvcHNcIjogcHJvcHMsXG4gICAgICAgICAgICBcInRhcmdldFwiOiBkb21FbGVtZW50LFxuICAgICAgICAgICAgXCJqc3hcIjogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhbiBDb21wb25lbnQgb24gdGhlIGZseVxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbXBvbmVudFxuICAgICAqL1xuICAgIHJlbmRlckNvbXBvbmVudChjb21wb25lbnQpXG4gICAge1xuICAgICAgICBSZWFjdERPTS5yZW5kZXIoXG4gICAgICAgICAgICBjb21wb25lbnQuanN4LFxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29tcG9uZW50LnRhcmdldClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTcGF3bnMgYWxsIENvbXBvbmVudHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3RcbiAgICAgKi9cbiAgICBzcGF3bmVyKGxpc3QpXG4gICAge1xuICAgICAgICBmb3IgKGxldCBjb21wb25lbnQgb2YgbGlzdCkge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbXBvbmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDb21wb25lbnQodGhpcy5jbGFzc0ZpbGxlcihjb21wb25lbnQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwYXducy5wdXNoKGNvbXBvbmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZS1ydW5zIHRoZSB0aGUgYm9vdHN0cmFwcGluZyBwcm9jZXNzLCBidXQgb25seSBwcm9jZXNzZXMgdGhlIGRpdnMgdGhhdCB3ZXJlIG5vdCBwcmVzZW50IG9uIHBhZ2UgcmVuZGVyXG4gICAgICovXG4gICAgcmVsb2FkKClcbiAgICB7XG4gICAgICAgIHZhciBkaWZmID0gZGlmZmVyZW5jZSh0aGlzLmdldFNwYXducygpLCB0aGlzLmdldFNwYXduTGlzdCgpKTtcbiAgICAgICAgdGhpcy5zcGF3bmVyKGRpZmYpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNwYXducyBhIGNvbXBvbmVudCB0aGF0IGlzbid0IHJlZ2lzdGVyZWQgaW4gdGhlIGNvbXBvbmVudHMuc3Bhd25lci5qc29uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRvbUVsZW1lbnQgOiBJZCBvZiB0aGUgRE9NTm9kZSB5b3Ugd2FudCB0byBwb3B1bGF0ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gUmVhY3RDbGFzcyA6IHRoZSBjbGFzc05hbWUgb2YgdGhlIFJlYWN0IENvbXBvbmVudCB5b3Ugd2FudCB0byBzcGF3bi5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcHJvcHMgOiBQcm9wcyBmb3IgdGhlIFJlYWN0IENvbXBvbmVudC5cbiAgICAgKi9cbiAgICBzcGF3blVucmVnaXN0ZXJlZChkb21FbGVtZW50LCBSZWFjdENsYXNzLCBwcm9wcylcbiAgICB7XG4gICAgICAgIHZhciBjb21wb25lbnQgPSB0aGlzLmNsYXNzRmlsbGVyKHRoaXMuYnVpbGRDb21wb25lbnRPYmplY3QoZG9tRWxlbWVudCwgUmVhY3RDbGFzcywgcHJvcHMpKTtcbiAgICAgICAgdGhpcy5yZW5kZXJDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICB9XG59Il19
