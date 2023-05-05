// jest functions.test.js
const {calculateMean, calculateMedian, calculateMode} = require('./functions');

describe("calculate mean value of an array of nums", function(){
    test("testing mean of nums", function(){
        expect(calculateMean([1,2,3,4])).toEqual({"operation": "mean", "value": 2.5})
    })
    test("testing mean of nums", function(){
        expect(calculateMean([])).toEqual({"operation": "mean", "value": 0})
    })
})
describe("calculate median value of array of nums", function() {
    test("testing even length", function(){
    expect(calculateMedian([1,2,3,4])).toEqual({"operation": "median", "value": 2.5})
    })
    test("testing odd length", function(){
        expect(calculateMedian([1,2,3])).toEqual({"operation": "median", "value": 2})
    })
})
describe("calculate mode value of array of nums", function() {
    test("testing mode", function(){
    expect(calculateMode([1,2,3,4,2,2,2,2,])).toEqual({"operation": "mode", "value": 2})
    })
})