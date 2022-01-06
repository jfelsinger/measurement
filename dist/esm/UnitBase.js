/**
 * The base of a unit, literally the abbreviation and name of the unit without
 * more context:
 *
 * k, kilo
 * - or -
 * m, meter
 */
export class UnitBase {
    constructor(options) {
        this.abbr = options.abbr;
        this.name = options.name;
    }
    static get(options) {
        if (options instanceof UnitBase)
            return options;
        else
            return new UnitBase(options);
    }
    toString(useAbbreviation = false) {
        if (useAbbreviation || !this.name)
            return this.abbr;
        return this.name;
    }
}
export default UnitBase;
