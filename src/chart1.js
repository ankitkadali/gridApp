import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';
import Button from "@material-ui/core/Button";
import  classes  from "classnames";
//import scale from 'd3-scale';
class Chart1 extends React.Component {
  constructor(props){
    super(props);
    this.createLineTool =this.createLineTool.bind(this);
  }
  createLineTool(){

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // d3.json("data.json", function(error, data) {
    //     if (error) throw error;
    //
    //     data.forEach(function(d) {
    //       d.year = parseTime(d.year);
    //       d.value = +d.value;
    //     });
var data = [
    {year : 10, value: 25},
    {year : 20, value: 15},
    {year : 30, value: 80},
    {year : 35, value: 60},
    {year : 40, value: 50},
    {year : 50, value: 30},

        ]
        var valueline = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.value); });

  var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

     var removeSvg = d3.select("#svg1");
     removeSvg.select("*").remove();

    var svg = d3.select("#svg1")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
      x.domain(d3.extent(data, function(d) { return d.year; }));
      y.domain([0, d3.max(data, function(d) { return d.value; })]);

      svg.append("path")
     .data([data])
     .attr("class", "line")
     .attr("d", valueline);

     svg.selectAll("dot")
     .data(data)
   .enter().append("circle")
     .attr("r", 5)
     .attr("cx", function(d) { return x(d.year); })
     .attr("cy", function(d) { return y(d.value); })
     .on("mouseover", function(d) {
       div.transition()
         .duration(200)
         .style("opacity", .9);
       div.html("friendAge: "+ d.year + "<br/> age: " + d.value)
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
       })
     .on("mouseout", function(d) {
       div.transition()
         .duration(500)
         .style("opacity", 0);
       });

       svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the Y Axis
      svg.append("g")
      .call(d3.axisLeft(y));

        }

//});




  render() {
    return (
      <div>
        {this.createLineTool()}
      </div>
  );
  }
}

export default Chart1;
