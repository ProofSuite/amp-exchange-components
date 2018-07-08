
import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";


export function boundDecimal(number, range) {
    number = parseFloat(number);
    range = parseInt(range);
    return Math.floor(number * Math.pow(10, range)) / Math.pow(10, range);
}

export function getObjectFromProperty(array, prop, value) {
    let foundObject;
    array.map(function(obj) {
        if(obj[prop] === value){
            foundObject = obj;
        }
    })
    if (foundObject){
        return foundObject;
    }
    else {
        return false;
    }
}
export function getArrayOfProps(arr, prop) {
    let temp=[];
    arr.map((item) => {
        if(item[prop]) {
            temp.push(item[prop]);
        }
    })
    return temp;
}

export function filterer (filter, coin, wrt, filterValue) {
    if(filter) {
        return coin[wrt] === filterValue;
    }
    return true;
}

export function sorter(a, b, order, wrt) {
    let first, second;
    if(typeof a[wrt] === "string") {
        first = a[wrt].toUpperCase(); // ignore upper and lowercase
        second = b[wrt].toUpperCase(); // ignore upper and lowercase
    }
    else {
        first = a[wrt];
        second= b[wrt];
    }
    if(order === "asc") {
        if (first < second) {
            return -1;
        }
        if (first > second) {
            return 1;
        }
    }
    else {
        if (first > second) {
            return -1;
        }
        if (first < second) {
            return 1;
        }
    }
    return 0;
}



export function parseData(parse) {
    return function(d) {
        d.date = parse(d.date);
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        d.volume = +d.volume;
        // console.log(d, 'd');
        return d;
    };
}

export const parseDate = timeParse("%Y-%m-%d");

export async function getData() {
    const promiseMSFT = await fetch("http://rrag.github.io/react-stockcharts/data/MSFT_full.tsv")
        .then(response => response.text())
        .then(data => {
            // console.log(tsvParse(data, parseData(parseDate)), 'api data')
            return tsvParse(data, parseData(parseDate));
        })
    return promiseMSFT;
}
