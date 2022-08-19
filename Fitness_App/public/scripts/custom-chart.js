//Append chartsJS CDN script to page
let chartsJSScript = document.createElement('script');
chartsJSScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/chart.min.js");
document.head.appendChild(chartsJSScript);

//Declare constants for color hex codes
const CHART_COLOR_RED = "#ee4b2b";
const CHART_COLOR_BLUE = "#0096ff";

export class CustomChart
{
    numDataSets = 0;

    //Default constructor
    constructor(ctx, chartType, hasDailyValues, hasRunningAverage, startDate, endDate, minY, maxY, hasGridLines, xValues, yValues1, yValues2)
    {
        this.ctx = ctx;//Canvas context
        //Chart attributes pertinent to UI
        this.chartType = chartType;
        this.hasDailyValues = hasDailyValues;
        this.hasRunningAverage = hasRunningAverage;
        //TODO: Get rid of dates
        this.startDate = startDate;
        this.endDate = endDate;
        this.minY = minY;
        this.maxY = maxY;
        this.hasGridLines = hasGridLines;

        this.xValues = xValues;
        this.yValues1 = yValues1;
        this.yValues2 = yValues2;


        //Increment number of data sets that may be charted
        if (this.hasDailyValues)
            this.numDataSets++;
        if (this.hasRunningAverage)
            this.numDataSets++;

        this.data = this.getChartData();
        this.drawChart();
    }

    //Implementation of Builder pattern
    static CustomChartBuilder = class
    {
        setCTX(ctx)
        {
            this.ctx = ctx;
            return this;
        }

        setChartType(chartType)
        {
            this.chartType = chartType;
            return this;
        }

        setHasDailyValues(hasDailyValues)
        {
            this.hasDailyValues = hasDailyValues;
            return this;
        }

        sethasRunningAverage(hasRunningAverage)
        {
            this.hasRunningAverage = hasRunningAverage;
            return this;
        }

        setstartDate(startDate)
        {
            this.startDate = startDate;
            return this;
        }

        setEndDate(endDate)
        {
            this.endDate = endDate;
            return this;
        }

        setMinY(minY)
        {
            this.minY = minY;
            return this;
        }

        setMaxY(maxY)
        {
            this.maxY = maxY;
            return this;
        }

        setHasGridLines(gridLines)
        {
            this.gridLines = gridLines;
            return this;
        }

        setXValues(xValues)
        {
            this.xValues = xValues;
            return this;
        }
        
        setYValues(yValues1, yValues2)
        {
            this.yValues1 = yValues1;
            this.yValues2 = yValues2;
            return this;
        }

        build()
        {
            const customChart = new CustomChart(this.ctx, this.chartType, this.hasDailyValues, this.hasRunningAverage, 
                this.startDate, this.endDate, this.minY, this.maxY, this.gridLines, this.xValues, this.yValues1, this.yValues2);
            return customChart;
        }
    }
    
    /**
     * 
     * @param {string} label 
     * @param {array<Number>} yValues 
     * @param {string} borderColor 
     */
    createDataSet(label, yValues, borderColor)
    {
        let dataSet = 
        {
            label: label,
            data: yValues,
            borderColor: borderColor,
            borderWidth: 1,
            pointRadius: 0,
            pointStyle : '',

        };
        return dataSet;
    }

    getChartData()
    {
        //Create dataSets Array
        let dataSetsArray = new Array();
        for (let i = 0; i < 2; i ++)
        {
            if (i === 0)
                dataSetsArray.push(this.createDataSet("Daily Values", this.yValues1, CHART_COLOR_RED));
            else
                dataSetsArray.push(this.createDataSet("7 Day Running Average", this.yValues2, CHART_COLOR_BLUE));
        }

        //Create data object
        let data = 
        {
            type: 'line',
            color : "#fff",
            data: 
            {
                labels: this.xValues
            },
            options: 
            {
                responsive:true,
                scales: 
                {
                    y: {
                        ticks:
                        {
                            color : '#fff'
                        },
                        grid: 
                        {
                            color:'#666',
                            borderColor: '#fff'
                        }
                    },
                    x: {
                        ticks:
                        {
                            color : '#fff'
                        },
                        grid: 
                        {
                            color:'#666',
                            borderColor: '#fff'
                        }
                    }
                }
            }
        }
        data.data.datasets = dataSetsArray;
        data.options.scales.y.suggestedMin = this.minY;
        data.options.scales.y.suggestedMax = this.maxY;
        data.options.scales.y.grid.display = this.hasGridLines;
        data.options.scales.x.grid.display = this.hasGridLines;

        return data;
    } 

    drawChart()
    {
        //Create default chart 
        this.chart = new Chart(this.ctx, this.data);
    }

    deleteChart()
    {
        this.chart.destroy();
    }
}