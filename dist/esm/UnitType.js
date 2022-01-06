/**
 * Specifies the type of quantity that a unit measures.
 */
var UnitType;
(function (UnitType) {
    UnitType["Mass"] = "Mass";
    UnitType["Length"] = "Length";
    UnitType["Volume"] = "Volume";
    UnitType["Time"] = "Time";
    UnitType["Memory"] = "Memory";
    UnitType["Angle"] = "Angle";
    UnitType["Temperature"] = "Temperature";
    UnitType["Charge"] = "Charge";
    UnitType["Energy"] = "Energy";
    UnitType["Force"] = "Force";
    UnitType["Pressure"] = "Pressure";
    /**
     * Describes a combination of units instead of just a singular quantity,
     * such as km/h
     * */
    UnitType["Compound"] = "Compound";
    UnitType["Unknown"] = "Unknown";
})(UnitType || (UnitType = {}));
export default UnitType;
export { UnitType };
