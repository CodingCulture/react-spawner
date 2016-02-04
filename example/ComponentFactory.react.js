import React from 'react';
import ReactDOM from 'react-dom';
import difference from 'array-difference';
import ComponentSpawner from '../src/ComponentSpawner.react.js';
import SpawnCandidates from './components.spawner.json';

import HelloWorld from './HelloWorld.react.js';

/**
 * Class ComponentFactory.
 */
export default class ComponentFactory extends ComponentSpawner
{
    /**
     * ComponentFactory constructor.
     */
    constructor()
    {
        super();
        this.setSpawnList(SpawnCandidates);
        this.spawner(this.getSpawnList());
    }

    /**
     * Implements the classFiller function
     *
     * @param component
     * @returns {*}
     */
    classFiller(component)
    {
        switch(component.name)
        {
            case "HelloWorld":
                component.jsx = <HelloWorld />;
                break;
        }

        return component;
    }
}