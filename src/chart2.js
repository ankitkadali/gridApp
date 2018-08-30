import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';
import Button from "@material-ui/core/Button";
import  classes  from "classnames";
//import scale from 'd3-scale';
class Chart2 extends React.Component {
  constructor(props){
    super(props);
    this.createLineTool =this.createLineTool.bind(this);
  }
  createLineTool(){

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


    var x = d3.scaleBand().range([0, width]).padding(0.1);
    var y = d3.scaleLinear().range([height, 0]);

    var removeSvg = d3.select("#svg1");
    removeSvg.selectAll("*").remove();

    var svg = d3.select("#svg1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom).append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    // d3.json("data.json", function(error, data) {
    //     if (error) throw error;
    //
    //     data.forEach(function(d) {
    //       d.year = parseTime(d.year);
    //       d.value = +d.value;
    //     });
var data = [
    {name : 45, value: 25},
    {name : 5, value: 15},
    {name : 15, value: 80},
    {name : 25, value: 60},
    {name : 65, value: 50},
    {name : 35, value: 30},

        ]
        x.domain(data.map(function(d) { return d.name; }));
        y.domain([0, d3.max(data, function(d) { return d.value; })]);

        svg.selectAll(".bar")
              .data(data)
            .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d.name); })
              .attr("width", x.bandwidth())
              .attr("y", function(d) { return y(d.value); })
              .attr("height", function(d) { return height - y(d.value); });

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // add the y Axis
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

export default Chart2;
