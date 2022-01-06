import * as safeMath from './safeMath';
import { expect } from 'chai';
import 'mocha';
describe('safeMath', () => {
    describe('add', () => {
        [
            { args: [1, 2], result: 3 },
            { args: [1.0005, 2.000125], result: 3.000625 },
            { args: [0.0005, 0.000125], result: 0.000625 },
        ].forEach((scenario) => {
            it(`should provide the correct result for: ${scenario.args.join(' + ')}; (${scenario.result})`, () => {
                expect(safeMath.add(...scenario.args)).to.equal(scenario.result);
            });
        });
    });
    describe('subtract', () => {
        [
            { args: [1, 2], result: -1 },
            { args: [3.0005, 2.000125], result: 1.000375 },
            { args: [0.0005, 0.000125], result: 0.000375 },
        ].forEach((scenario) => {
            it(`should provide the correct result for: ${scenario.args.join(' + ')}; (${scenario.result})`, () => {
                expect(safeMath.subtract(...scenario.args)).to.equal(scenario.result);
            });
        });
    });
    describe('multiply', () => {
        [
            { args: [1, 2], result: 2 },
            { args: [0, 2], result: 0 },
            { args: [2, 2], result: 4 },
            { args: [2.5, 2], result: 5 },
            { args: [2.3, 2], result: 4.6 },
            { args: [0.003, 2], result: 0.006 },
            { args: [0.003, 2.5], result: 0.0075 },
            { args: [0.003, 0.025], result: 0.000075 },
            { args: [3, 3, 3], result: 27 },
        ].forEach((scenario) => {
            it(`should provide the correct result for: ${scenario.args.join(' * ')}; (${scenario.result})`, () => {
                expect(safeMath.multiply(...scenario.args)).to.equal(scenario.result);
            });
        });
    });
    describe('divide', () => {
        [
            { args: [2, 1], result: 2 },
            { args: [0, 2], result: 0 },
            { args: [2, 2], result: 1 },
            { args: [2.5, 2], result: 1.25 },
            { args: [2.3, 2], result: 1.15 },
            { args: [0.003, 2], result: 0.0015 },
            { args: [0.003, 2.5], result: 0.0012 },
            { args: [0.003, 0.025], result: 0.12 },
            { args: [27, 3, 3], result: 3 },
            { args: [27.5, 5], result: 5.5 },
            { args: [27.5, 5, 5], result: 1.1 },
        ].forEach((scenario) => {
            it(`should provide the correct result for: ${scenario.args.join(' / ')}; (${scenario.result})`, () => {
                expect(safeMath.divide(...scenario.args)).to.equal(scenario.result);
            });
        });
    });
});
