import {CustomChart} from './custom-chart.js';

const SERVER_URL = 'http://localhost:3000/api/';
const DAILY_WEIGHTS_PATH = 'weights-daily-by-dates-entry';

const DEFAULT_MINY = 170;
const DEFAULT_MAXY = 190;
const TEST_DATE1 = "2021-06-15";
const TEST_DATE2 = "2022-07-22";

//Canvas context
const ctx = document.querySelector("#weight-chart").getContext("2d");

//"Enums"
const WEIGHT_CHART = Symbol("Weight");
const BF_CHART = Symbol("Body Fat");

//Buttons
const weightBtn = document.querySelector("#weight-btn");
const bodyFatBtn = document.querySelector("#body-fat-btn");
const drawChartBtn = document.querySelector("#draw-chart-btn");

//Form inputs
const dailyValues = document.querySelector("#checkbox-daily-values");
const runningAverage = document.querySelector("#checkbox-seven-day-running-avg");
const startDate = document.querySelector("#start-date");
const endDate = document.querySelector("#end-date");
const minY = document.querySelector("#min-y-value");
const maxY = document.querySelector("#max-y-value");
const gridLines = document.querySelector("#grid-lines");

//Which chart to display
let chartToDraw = WEIGHT_CHART;
let currChartBtn = weightBtn;


//bind button clicks
//on window load, fetch default data for chart
window.addEventListener('load', async (url) => 
{
    handleData(DAILY_WEIGHTS_PATH, TEST_DATE1, TEST_DATE2);
});

/**
 * Gets data all user entries from the database for the chart
 * @returns 
 */
 async function fetchData(path, startDate, endDate)
 {
    const response = await fetch(`${SERVER_URL}${path}/${startDate}/${endDate}`);
    const jsonResponse = await response.json();
    return jsonResponse;
 }

//Gets information from chart
/*function parseData(jsonResponse)
{
    //Destructure jsonResponse
    let {entries : entries} = jsonResponse;

    //Destructure entries
    let [entriesWOBuffer, _] = entries; 

    return entriesWOBuffer;
}*/


//Change chart type to weight
weightBtn.addEventListener("click", (event) =>
{
    //Prevent page from reloading
    event.preventDefault();

    //Toggle UI elements
    weightBtn.classList.toggle("btn-active");
    bodyFatBtn.classList.toggle("btn-active");

    //Set variables
    currChartBtn = weightBtn;
    chartToDraw = WEIGHT_CHART;
});

//Change chart type to body fat percentage
bodyFatBtn.addEventListener("click", (event) =>
{
    //Prevent page from reloading
    event.preventDefault();
    
    //Toggle UI elements
    bodyFatBtn.classList.toggle("btn-active");
    weightBtn.classList.toggle("btn-active");
    currChartBtn = bodyFatBtn;

    //Set variables
    chartToDraw = BF_CHART;
});

//Draw the chart if form is valid
drawChartBtn.addEventListener("click", (event) =>
{
    event.preventDefault();
    if (isValidForm()) 
    {
        handleData(getURLPath(), startDate.value, endDate.value);
    }
});

function getURLPath()
{
    //Get type of chart to draw
    let path = "weights";
    if (chartToDraw === BF_CHART)
    {
        path = "bfps";
    }

    if (Boolean(dailyValues.checked) && Boolean(runningAverage.checked))
    {
        path += "-both-by-dates-entry";
    }

    else if (Boolean(dailyValues.checked))
    {
        path += "-daily-by-dates-entry";
    }

    else if (Boolean(runningAverage.checked))
    {
        path += "-avg-by-dates-entry";
    }
    return path;
}

async function handleData(path, startDate, endDate)
{
        //Fetch data from server and convert to JSON
        const graphObjects = await fetchData(path, startDate, endDate);
    
        //Arrays for X and Y chart axes
        let datesX = [], valuesY1 = [], valuesY2 = [];
        
        //Destructure graphObjects
        for (let i = 0; i < graphObjects.length; i++)
        {
            //Get date regardless of chart type
            let {historical_date} = graphObjects[i];
    
            //Remove time from date
            historical_date = historical_date.split("T").shift();
    
            //Remove year from all but beginning and ending of year dates
            if (!historical_date.includes("12-31") && !historical_date.includes("01-01"))
            {
                historical_date = historical_date.slice(5);
            }

            //Push dates to array for chart x axis
            datesX.push(historical_date);
    
            //Get Daily Weights if weight chart
            if (chartToDraw === WEIGHT_CHART && Boolean(dailyValues.checked))
            {
                let {weight} = graphObjects[i];
                //push weights to chart axis y
                valuesY1.push(weight);
            }

            //Otherwise get daily BFPs
            else if (chartToDraw === BF_CHART && Boolean(dailyValues.checked))
            {
                let {body_fat_percent} = graphObjects[i];
                //push weights to chart axis y
                valuesY1.push(body_fat_percent);
            }
            
            //Get moving averages if checked
            if (Boolean(runningAverage.checked))
            {
                let {movingAvg} = graphObjects[i];
                //push weights to chart axis y
                valuesY2.push(movingAvg);
            }
        }
        renderChart(datesX, valuesY1, valuesY2);
}

//Render view of chart
function renderChart(valuesX, valuesY1, valuesY2)
{
        if (chart != null)
            chart.deleteChart();
        chart = new CustomChart.CustomChartBuilder()
            .setCTX(ctx)
            .setChartType(chartToDraw)
            .setHasDailyValues(Boolean(dailyValues.checked))
            .sethasRunningAverage(Boolean(runningAverage.checked))
            .setstartDate(startDate.value)
            .setEndDate(endDate.value)
            .setMinY(Number(minY.value))
            .setMaxY(Number(maxY.value))
            .setHasGridLines(Boolean(gridLines.checked))
            .setXValues(valuesX)
            .setYValues(valuesY1, valuesY2)
            .build();
}


/**
 * Fills the form with default values
 */
function populateDefaultFormValues()
{
    weightBtn.classList.toggle("btn-active");
    dailyValues.checked = true;

    startDate.value = "2022-06-15";
    endDate.value = new Date().toISOString().split('T')[0];
    minY.value = DEFAULT_MINY;
    maxY.value = DEFAULT_MAXY;
    
    gridLines.checked = true;
}

/**
 * Checks if the form is valid
 */
function isValidForm()
{
    let isValid = true;

    //get error message elements
    let startError = document.querySelector("#start-date-container .error-text");
    let endError = document.querySelector("#end-date-container .error-text");
    let minYError = document.querySelector("#min-y-value-container .error-text");
    let maxYError = document.querySelector("#max-y-value-container .error-text");

    startError.style.opacity = "0";
    endError.style.opacity = "0";
    minYError.style.opacity = "0";
    maxYError.style.opacity = "0";

    //Make sure weight or body fate percentage is checked
    if (!Boolean(dailyValues.checked) && !Boolean(runningAverage.checked))
    {
        isValid = false;
    }

    //Validate dates
    //get date values from form
    let date1 = new Date(startDate.value), date2 = new Date(endDate.value);

    //start date on or after end date
    if (date1 >= date2)
    {
        startError.style.opacity = "1";
        startError.innerHTML = "Start date must come before end date.";
        isValid = false;
    }

    //start date is in future
    if (date1 >= new Date())
    {
        startError.style.opacity = "1";
        startError.innerHTML = "Date cannot be in the future.";
        isValid = false;
    }

    //end date is in future
    if (date2 >= new Date())
    {
        endError.style.opacity = "1";
        endError.innerHTML = "Date cannot be in the future.";
        isValid = false;
    }

    //Validate minY and maxY
    //minY is null
    if (minY.value === "")
    {
        minYError.style.opacity = "1";
        minYError.innerHTML = "You must enter a minimum Y value";
        isValid = false;
    }

    //maxY is null
    if (maxY.value == null)
    {
        maxYError.style.opacity = "1";
        maxYError.innerHTML = "You must enter a maximum Y value";
        isValid = false;
    }

    //minY is greater than or equal to maxY
    if (Number(minY.value) >= Number(maxY.value))
    {
        minYError.style.opacity = "1";
        minYError.innerHTML = "Minimum Y value must be less than maximum";
        isValid = false;
    }

    //minY is not valid number
    if (isNaN(minY.value))
    {
        minYError.style.opacity = "1";
        minYError.innerHTML = "You must enter a valid number";
        isValid = false;
    }

    //maxY is not valid number
    if (isNaN(maxY.value))
    {
        maxYError.style.opacity = "1";
        maxYError.innerHTML = "You must enter a valid number";
        isValid = false;
    }

    //TODO: Check reasonable values for minY and maxY

    return isValid;
}

populateDefaultFormValues();

let chart = null;


