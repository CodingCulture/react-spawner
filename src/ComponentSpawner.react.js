/**
 * Class that will spawn Components if their appropriate DOM elements are present.
 */
export default class ComponentSpawner
{
    /**
     * Constructs the ComponentsFactory.
     */
    constructor()
    {
        this.spawns = [];
        this.spawnList = [];
    }

    /**
     * Gets all spawns that have occurred
     * @returns {Array}
     */
    getSpawns()
    {
        return this.spawns;
    }

    /**
     * Sets the SpawnList
     *
     * @param {Array} list
     */
    setSpawnList(list)
    {
        this.spawnList = list;
    }

    /**
     * Returns the list of all known DOMNode's and their assigned React Component.
     *
     * @returns {Array}
     */
    getSpawnList()
    {
        return this.spawnList;
    }

    /**
     * Fills the blank JSX in the component objects.
     * Modifies the spawnlist.
     */
    classFiller(component)
    {
        throw new TypeError('classFilter can not be called on the super class, please extend the ComponentSpawner')
    }

    /**
     * Builds the object for a component
     *
     * @param {string} domElement : Id of the DOMNode you want to populate.
     * @param {string} ReactClass : the className of the React Component you want to spawn.
     * @param {object} props : Props for the React Component.
     */
    buildComponentObject(domElement, ReactClass, props)
    {
        return {
            "name": ReactClass,
            "props": props,
            "target": domElement,
            "jsx": null
        }
    }

    /**
     * Renders an Component on the fly
     *
     * @param {object} component
     */
    renderComponent(component)
    {
        ReactDOM.render(
            component.jsx,
            document.getElementById(component.target)
        );
    }

    /**
     * Spawns all Components
     *
     * @param {Array} list
     */
    spawner(list)
    {
        for (let component of list) {
            if (document.getElementById(component.target)) {
                this.renderComponent(this.classFiller(component));
                this.spawns.push(component);
            }
        }
    }

    /**
     * Re-runs the the bootstrapping process, but only processes the divs that were not present on page render
     */
    reload()
    {
        var diff = difference(this.getSpawns(), this.getSpawnList());
        this.spawner(diff);
    }

    /**
     * Spawns a component that isn't registered in the components.spawner.json.
     *
     * @param {string} domElement : Id of the DOMNode you want to populate.
     * @param {string} ReactClass : the className of the React Component you want to spawn.
     * @param {object} props : Props for the React Component.
     */
    spawnUnregistered(domElement, ReactClass, props)
    {
        var component = this.classFiller(this.buildComponentObject(domElement, ReactClass, props));
        this.renderComponent(component);
    }
}