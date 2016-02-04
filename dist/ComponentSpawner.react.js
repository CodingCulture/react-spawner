'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

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
            _reactDom2.default.render(component.jsx, document.getElementById(component.target));
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