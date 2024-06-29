export class MyJSON {
    properties: Map<string, string>;
    constructor (properties: Map<string, string>) {
        this.properties = properties;
    }

    getProperties() {
        return this.properties;
    }
}