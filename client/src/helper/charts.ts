// import * as d3 from 'd3';

// import { responsivefy } from './d3Responsify';
// //"d3": "^5.1.0",
// export function columnChart(selector,data) {
//     let  margin, width, height, fullWidth, fullHeight, yScale, xScale, yAxis, xAxis, svg,arrDays = [],today,arrDayNames = [],
//     maxSale;

//     margin = { top: 10, right: 10, bottom: 60, left: 40 };
//     width = 500 - margin.left - margin.right;
//     height = 280 - margin.top - margin.bottom;

//     fullWidth = width + margin.left + margin.right;
//     fullHeight = height + margin.top + margin.bottom;

//     today = new Date();
//     arrDayNames= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     arrDays.push(today.toLocaleDateString());
//     for(let i = 0; i < 6; i++){
//         today.setDate(today.getDate() - 1);
//         arrDays.push(today.toLocaleDateString());
//     }

//     maxSale = 95000;   

//     d3.select(selector).selectAll('svg').remove();

//     svg = d3.select(selector)
//         .append('svg')
//         .attr('width', fullWidth)
//         .attr('height', fullHeight)
//         .call(responsivefy)
//         .append('g')
//         .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//     // data = [
//     //     { score: 66000, subject: '4/25/2018' },
//     //     { score: 80000, subject: '4/24/2018' },
//     //     { score: 72000, subject: '4/23/2018' },
//     //     { score: 82000, subject: '4/22/2018' },
//     //     { score: 45000, subject: '4/21/2018' },
//     //     { score: 95000, subject: '4/20/2018' },
//     //     { score: 90000, subject: '4/19/2018' },        
//     // ];

//     yScale = d3.scaleLinear()
//         .domain([0, maxSale])
//         .range([height, 0]);

//     yAxis = d3.axisLeft(yScale);

//     //.domain(data.map(d => d.subject))
//     xScale = d3.scaleBand()
//         .padding(0.2)
//         .domain(arrDays)
//         .range([0, width]);

//     //ticks are the no. of items or headings on the yscale
//     xAxis = d3.axisBottom(xScale).ticks(5);

//     svg.call(yAxis);
//     svg.append('g')
//         .attr('transform', 'translate(0,' + height + ')')
//         .call(xAxis)
//         .selectAll('text')
//         .style('text-anchor', 'end')
//         .attr('transform', 'rotate(-45)');

//     svg.selectAll('rect')
//         .data(data)
//         .enter()
//         .append('rect')
//         .attr('x', d => xScale(d.date))
//         .attr('y', d => yScale(d.sale))
//         .attr('width', d => xScale.bandwidth())
//         .attr('height', d => height - yScale(d.sale));
// }