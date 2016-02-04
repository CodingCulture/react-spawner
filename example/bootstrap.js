import React from 'react';
import ReactDOM from 'react-dom';
import ComponentFactory from './ComponentFactory.react.js';

var application = new ComponentFactory();

window.reactApplication = {
    /**
     * {@inheritdoc}
     * @returns {Object}
     */
    getSpawns: function()
    {
        return application.getSpawns();
    },

    /**
     * {@inheritdoc}
     * @returns {Object}
     */
    reload: function()
    {
        return application.reload();
    },

    /**
     * {@inheritdoc}
     * @returns {Object}
     */
    spawnUnregistered: function(domElement, ReactClass, props)
    {
        return application.spawnUnregistered(domElement, ReactClass, props);
    }
};