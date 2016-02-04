# React Spawner

react-spawner allows you to mix and match the old web application paradigm of using jQuery or any other enhancing 
JavaScript code and React. It's a great solution for people who want to use some React components in an existing 
website.

## Howto install

Step by step on how to implement react-spawner into your project.

### Extend the base class

Extend the Base Spawner like you would do with any ES6 class.

```
import Spawner from 'react-spawner';

export default class GrandSpawner extends Spawner
{
    
}

```

### Extend the Constructor

Add a list of all the DOM elements that should be filled on page render with the Components that should be rendered 
in that div/span/...

```
    constructor()
    {
        super();
        
        //Set an array of objects that need to be spawned, you could include an json file, like in example/
        this.setSpawnList([{
            "name": "HelloWorld",
                "props": {},
                "target": "ngr-target-games",
                "jsx": null
        }]);
        
        //Initiate the spawner
        this.spawner(this.getSpawnList());
    }
```

### Override the classFiller method

Add a method in your Spawner class that converts the "name" parameter to a JSX react component. The parameter component
is required!

```
import Spawner from 'react-spawner';
import HelloWorld from './HelloWorld.react.js';

export default class GrandSpawner extends Spawner
{
    ...
    
    classFiller(component)
    {
        switch(component.name)
        {
            //Add the component types you want to expose to the spawner
            case "HelloWorld":
                component.jsx = <HelloWorld />;
                break;
        }
        
        return component;
    }
    
    ...
}

```

### Add the ComponentSpawner

Add the component spawner to your main.js file.

```
import ComponentFactory from './GrandSpawner.react.js';

var application = new GrandSpawner();
```

and expose the public API in the same file *(will be updated in the next version)*

```
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
``` 

You've now installed react-spawner.

## Usage

By default, react-spawner will check your list on page-render, and will inject the components that have a DOMNode on the
page. 

If you want to re-run the react-spawner on the fly, because you for instance have added a new DOMNode with jQuery, you
can run ```reactApplication.reload```. This will apply the diff of the component list you've supplied.

If you want to append a component to the DOM that wasn't defined in the componentlist, you can use the 
```reactApplication.spawnUnregistered(domElement, ReactClass, props)``` method. If the domElement (the id of a DOMNode),
is found and the ReactClass is defined in the classFiller, a new component will spawn.


