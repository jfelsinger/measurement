/**
 * Specifies the type of quantity that a unit measures.
 */
enum UnitType {
    Mass = 'Mass',
    Length = 'Length',
    Volume = 'Volume',
    Time = 'Time',

    Memory = 'Memory',

    Angle = 'Angle',
    Temperature = 'Temperature',

    Charge = 'Charge',
    Energy = 'Energy',

    Force = 'Force',

    Pressure = 'Pressure',


    /**
     * Describes a combination of units instead of just a singular quantity,
     * such as km/h
     * */
    Compound = 'Compound',
    Unknown = 'Unknown'
}

export default UnitType
export { UnitType }
