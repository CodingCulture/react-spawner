import React from 'react';
import ReactDOM from 'react-dom';
import difference from 'array-difference';

//Replace path by 'react-spawner/src/ComponentSpawner.react.js
import ComponentSpawner from '../../../src/ComponentSpawner.react.js';
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

        console.log(this.getSpawnList());
        console.log(this.getSpawns());
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