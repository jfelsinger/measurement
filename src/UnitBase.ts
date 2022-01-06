export interface iUnitBaseOptions {
    /** The abbreviation for this base: k, m, ly, etc. */
    abbr: string;

    /** The name for this base: meter, kilogram, etc. */
    name?: string;
}

/**
 * The base of a unit, literally the abbreviation and name of the unit without
 * more context:
 *
 * k, kilo
 * - or -
 * m, meter
 */
export interface iUnitBase extends iUnitBaseOptions {
    toString(useAbbreviation?: boolean): string;
}

/**
 * The base of a unit, literally the abbreviation and name of the unit without
 * more context:
 *
 * k, kilo
 * - or -
 * m, meter
 */
export class UnitBase implements iUnitBase {
    /** The abbreviation for this base: k, m, ly, etc. */
    abbr: string;

    /** The name for this base: meter, kilogram, etc. */
    name?: string;

    static get(options: iUnitBase|iUnitBaseOptions): iUnitBase {
        if (options instanceof UnitBase)
            return options;

        else
            return new UnitBase(options);
    }

    constructor(options: iUnitBaseOptions) {
        this.abbr = options.abbr;
        this.name = options.name;
    }

    toString(useAbbreviation: boolean = false) {
        if (useAbbreviation || !this.name)
            return this.abbr;

        return this.name;
    }
}

export default UnitBase
