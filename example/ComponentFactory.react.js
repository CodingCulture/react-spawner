import React from 'react';
import ReactDOM from 'react-dom';
import difference from 'array-difference';
import ComponentSpawner from '../src/ComponentSpawner.react.js';
import SpawnCandidates from './components.spawner.json';

//Import all the Components that the Spawner should inject into the dom.
import Games from '../games/games.react.js';

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
            case "Games":
                component.jsx = <Games type={component.props.type} />;
                break;
        }

        return component;
    }
}