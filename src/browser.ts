import * as bundle from './index';
(<any>window).measurement = bundle.measurement;

Object.keys(bundle).forEach((key) => {
    (<any>window).measurement[key] = (<any>bundle)[key];
});

// measurement.library.unitsList.forEach((unit) => {
//     let m = (<any>measurement);
//     if (!m[unit.name]) m[unit.name] = unit;
//     if (!m[unit.abbr]) m[unit.abbr] = unit;
// });
