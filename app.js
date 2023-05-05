const express = require('express');
const fs = require('fs');
const ExpressError = require('./expressError');
const {calculateMean, calculateMedian, calculateMode} = require('./functions');

const app = express();

// To parse http request body on each request:
app.use(express.json()); //For JSON
app.use(express.urlencoded({ extended: true })); //For Form Data

app.get("/mean", function(req, res, next){
    // debugger
    try {
        if(!req.query.nums){
            throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
        }
        const nums = req.query.nums.split(",").map((el, i) => {
            if (Number.isNaN(Number(el))) {
                throw new ExpressError(
                `The value '${el}' at index ${i} is not a valid number.`, 400);
            }
            return Number(el)
        })
        const result = calculateMean(nums);
        if(req.query.save === "true"){
            const timestamp = new Date().toISOString();
            const data = {
                timestamp: timestamp,
                result: result
            };
            fs.writeFile('./output.txt', JSON.stringify(data), "utf8", function(err) {
                if (err) {
                  console.error(err);
                  process.exit(1);
                }
                console.log('Successfully wrote to file!');
            });
              
        }
        return res.send(result)
    } catch (e) {
        return next(e)
    }
})

app.get("/median", function(req, res, next){
    try {
        if(!req.query.nums){
            throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
        }
        const nums = req.query.nums.split(",").map((el, i) => {
            if (Number.isNaN(Number(el))) {
                throw new ExpressError(
                `The value '${el}' at index ${i} is not a valid number.`, 400);
            }
            return Number(el)
        })
        const result = calculateMedian(nums);
        return res.send(result)
    } catch (e) {
        return next(e)
    }
})

app.get("/mode", function(req, res, next){
    try {
        if(!req.query.nums){
            throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
        }
        const nums = req.query.nums.split(",").map((el, i) => {
            if (Number.isNaN(Number(el))) {
                throw new ExpressError(
                `The value '${el}' at index ${i} is not a valid number.`, 400);
            }
            return Number(el)
        })
        const result = calculateMode(nums);
        return res.send(result)
    } catch (e) {
        return next(e)
    }
})

app.get("/all", function(req, res, next){
    try {
        if(!req.query.nums){
            throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
        }
        const nums = req.query.nums.split(",").map((el, i) => {
            if (Number.isNaN(Number(el))) {
                throw new ExpressError(
                `The value '${el}' at index ${i} is not a valid number.`, 400);
            }
            return Number(el)
        })
        const mean = calculateMean(nums);
        const median = calculateMedian(nums)
        const mode = calculateMode(nums);
        const result = {
            operation: "all",
            mean: mean["value"],
            median: median["value"],
            mode: mode["value"]
        }
        return res.send(result)
    } catch (e) {
        return next(e)
    }
})
// 404 handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
});

// generic error handler
app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000")
  });