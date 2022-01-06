/**
 * Specifies the type of quantity that a unit measures.
 */
enum UnitType {
    Mass = 'Mass',
    Length = 'Length',
    Volume = 'Volume',
    Time = 'Time',
    Angle = 'Angle',
    Temperature = 'Temperature',
    Energy = 'Energy',
    Force = 'Force',
    Pressure = 'Pressure',
    Memory = 'Memory',

    /**
     * Describes a combination of units instead of just a singular quantity,
     * such as km/h
     * */
    Compound = 'Compound',
    Unknown = 'Unknown'
}

export default UnitType
export { UnitType }
