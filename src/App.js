import React, { Component } from 'react';
import PropTypes from "prop-types";
import logo from './logo.svg';
import './App.css';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import Download from "@material-ui/icons/FileDownload";
import { withStyles } from "@material-ui/core/styles";
import CustomPagination from "./CustomPagination.js";
import { exportTableToCSV } from'./export.js';
import { exportTableToJSON } from './export.js';
import  classes  from "classnames";
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import file from './testing.json';
import checkboxHOC from "react-table/lib/hoc/selectTable";
//import cloneDeep from "lodash.clonedeep";
import testData from "./testing.json";
//import cloneDeep from "lodash.clonedeep";
//import { ReactTableDefaults } from "react-table";
import Typography from "@material-ui/core/Typography";
// array of objects
import { createMuiTheme } from '@material-ui/core/styles';
import BarChart from './BarChart.js';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});
//import Charts from './charts.js';
//import LineGraph from './lineGraph.js';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#757ce8',
//       main: '#3f50b5',
//       dark: '#002884',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#ff7961',
//       main: '#f44336',
//       dark: '#ba000d',
//       contrastText: '#000',
//     },
//   },
// });

const data = [
  {
    name: '0110.0000.0101',
    utilization: '26',
    bandwidth:'9',
    friend: {
      hostname: 'vmx101',
      utilization  : '33'},
    ISISArea: '49011',
    Status:'Up'
  },

  {   name: '0110.0000.0102',
      utilization: '22',
      bandwidth:'0.01',
      friend: {
        hostname: 'vmx102',
        utilization: '19'
              },
      ISISArea: '49011',
      Status:'Down'
    },
    {   name: '0110.0000.0103',
        utilization: '20',
        bandwidth:'2',
        friend: {
          hostname: 'vmx103',
          utilization: '30'
                },
        ISISArea: '49011',
        Status:'Down'

      },
      {   name: '0110.0000.0104',
          utilization: '10',
          bandwidth:'10',
          friend: {
            hostname: 'vmx104',
            utilization: '17'
                  },
          ISISArea: '50029',
          Status:'Up'
        },
        {   name: '0110.0000.0105',
            utilization: '11',
            bandwidth:'5',
            friend: {
              hostname: 'vmx105',
              utilization: '14'
            },
            ISISArea: '50029',
            Status:'Down'

          },
          {   name: '0110.0000.0106',
              utilization: '21',
              bandwidth:'7',
              friend: {
                hostname: 'vmx106',
                utilization: '31'
              },
              ISISArea: '50029',
              Status:'Up'
            },
            {   name: '0110.0000.0107',
                utilization: '16',
                bandwidth:'15',
                friend: {
                  hostname: 'vmx107',
                  utilization: '22'
                },
                ISISArea: '49011',
                Status:'Down'
              }
            ]

data.forEach((row, index) => {row.rowNo = index + 1});//adding a new data in data element
//console.log(data[0].University);

// for (var i=0;i<data_size;i++){
//
// uni_data.push(data[i].University);
//
// }
//console.log(uni_data);
var mostRecentUpdate=[];
var data2=[];
var t=new Date();
var str1 =">=5MB";
var str2 ="<=11MB";
for(var i=0;i<data.length;i++){
data2.push(data[i].Status);
}
console.log(data2);



const columns = [
  {
  Header: '',
  id:'rno',
  accessor: d=>d.rowNo,
  show: true,
},
  {
  width:200,
  Header: 'Name',
  id:'name',
  resizable: false,
  filterMethod: (filter, row) =>
                      row[filter.id].includes(filter.value),
  accessor:d=>d.name // String-based value accessors!
  }, {
  Header: 'utilization',
  id:'utilization',
  accessor: d=>d.utilization,
  show: true,
  filterMethod: (filter, row) =>
                      row[filter.id].includes(filter.value),
  Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
},

{
  Header:'Bandwidth (MB)',
  id:'bw',
  accessor: d => d.bandwidth,
  filterMethod: (filter, row) => {
                      if (filter.value === "all") {
                        return true;
                      }
                      else if (filter.value === "greater than 5MB") {
                        return row[filter.id]>=5;
                      }
                      else{
                      return row[filter.id]<=11;
                    }
                  },
                    Filter: ({ filter, onChange }) =>
                      <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}
                      >
                        <option value="all">Show All</option>
                        <option value="greater than 5MB">{str1}</option>
                        <option value="Less than 11MB">{str2}</option>
                      </select>
},


{
   // Required because our accessor is not a string
  Header: "Network Data",
  id:"networkData",
  show: true,

  columns:[

    {
    Header:'Hostname',
    id: 'hostname',
    accessor: d => d.friend.hostname,
    show: true,
    filterMethod: (filter, row) =>
                        row[filter.id].includes(filter.value)
    }, // Custom value accessors!

   {
    Header: "Utilization",
    id:"utilization_friend", // Custom header components!
    accessor: d => d.friend.utilization,
    show: true,
  }
  ]
},
  {
  height: 200,
  Header: 'Charts',
  id:'charts',
  filterMethod: (filter, row) =>
                      row[filter.id].includes(filter.value),
  accessor: 'chart_data',
  Cell: row => (//console.log(row),
                <BarChart data={[row.original.utilization,row.original.friend.utilization,15,20]} size={[80,40]} />)
  },
{
Header: 'ISISArea',
id:'ISISArea',
show: true,
accessor: d => d.ISISArea, // String-based value accessors!
filterMethod: (filter, row) =>
                    row[filter.id].includes(filter.value)
},
{
Header: 'Status',
id:'status',
show: true,
Cell: row => (
         <span>
           <span style={{
             color: row.value === 'Down' ? '#ff2e00'
               : row.value === 'Up' ? '#57d500'
               : '#57d500',
             transition: 'all .3s ease'
           }}>
             &#x25cf;
           </span>
           {
              row.value === 'Up' ? 'Up'
              : row.value === 'Down' ? `Down`
              : 'Single'
            }
         </span>),
accessor: d => d.Status,// String-based value accessors!
filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                      return true;
                    }
                    else if (filter.value === "Up") {
                      return row[filter.id]=='Up';
                    }
                    else{
                    return row[filter.id]=='Down';
                  }
                },
                  Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "all"}
                    >
                      <option value="all">Show All</option>
                      <option value="Up">Up</option>
                      <option value="Down">Down</option>
                    </select>
}
]

var rowSize;

class App extends Component {

  constructor(props) {
          super(props)
          this.state = {
              row:"",
              filter:true,
              columns:columns,
            //  charts:false
            //  data:data.University,
          }
          this.changeFilter = this.changeFilter.bind(this);
          this.handleRowChange =this.handleRowChange.bind(this);
          this.handleDownload =this.handleDownload.bind(this);
          this.handleDownloadToJson = this.handleDownloadToJson.bind(this);
        //  this.toggleChart =this.toggleChart.bind(this);
      }

  handleRowChange = row => event => {
    if(event.target.value !== 0){
      this.setState({
        row: event.target.value,

      });
      console.log(this.state.data);
    }

    };
    // componentDidUpdate(prevProps, prevState) {
    //       const {data1} = this.state.data.University;
    //       console.log(data1);
    //       if(data1 !== prevState.data.University){
    //           console.log('update data!');
    //       }
    //
    //   }

  handleDownload() {
        const data = this.reactTable.getResolvedState().sortedData;
        exportTableToCSV(data,columns,"data.csv")
        //console.log(data);
  };
   handleDownloadToJson() {
         const data = this.reactTable.getResolvedState().sortedData;
         exportTableToJSON(data,"data.json")
       //console.log(data[0]._original);
   }
   handleRowClick(){
    rowSize=parseInt(this.state.row);

     //console.log(parseInt(rowSize)); console.log(typeof rowSize);
   }
   changeFilter() {
        this.setState({
            filter: !this.state.filter,
        })

      };

  toggleColumnChooser = (index) => {
           this.setState(
              prevState => {
                  const columns1 = [];
                  columns1.push(...columns);
                //  console.log(columns1);
                  columns1[index].show = !columns1[index].show;
                  if (columns1[index].columns) {
                    columns1[index].columns.forEach(item => {
                      item.show = !item.show
                    })
                  }

                  return {
                      columns: columns1,
                  };
              }, () => {
                console.log(this.state.columns)
              }
          );
      };
      // const wrappedInstance = this.reactTable.getWrappedInstance();
            // the 'sortedData' property contains the currently accessible records based on the filter and sort
  // toggleChart(){
  //   this.setState(prevState => ({
  //     charts: !prevState.charts
  //   }));
  // }

  render() {
  //  const showChart = this.state.charts;
    return (

      <div id ='r2' style={{align:'centre'}}>
        <div align="right">
        <form className={classes.container} noValidate autoComplete="off" style={{align:'right'}}>
        <TextField
              id="row"
              label="enter rows value"
              className={classes.textField}
              value={this.state.row}
              onChange={this.handleRowChange('x')}
              margin="normal"
            />
          </form>
          </div>
              <div className="action">
                <ReactTable
                ref={r => this.reactTable = r}
                  data={data}
                  filterable={this.state.filter}
                  changeFilter={this.changeFilter}
                  handleDownloadToJson={this.handleDownloadToJson}
                  handleDownload={this.handleDownload}
                  columns={this.state.columns}
                  onColumnUpdate={this.toggleColumnChooser}
                  showPageSizeOptions={true}
                  defaultPageSize = {data.length > 5 ? 20 : data.length}
                  className="-striped"
                  showPaginationBottom={true}
                  PaginationComponent={CustomPagination}
                  pageSizeOptions={[10,20,this.state.row]}//since this prop is an array of numbers, you have to pass array
                  //getTbodyProps={ (state, rowInfo, column, rtInstance) => { return { style: { overflow: 'scroll',height:'400px' ,} } } }

                  style={{
                          //backgroundColor:'pink',
                          //backgroundImage:'url(image)',

                          bordercollapse:'collapse',
                          border: '1px solid grey',
                          fontFamily:"serif",
                          overflow:"scroll",
                          height: "500px" // This will force the table body to overflow and scroll, since there is not enough room
                        }}
                  getTdProps={(state, rowInfo, column, rtInstance) => {
                      return {
                          style:{
                                //  backgroundColor:'#B3E5FC',

                                	textAlign: 'center',
                                  textOverflow:'inherit',
                                  overflow:'scroll',
                                  // bordercollapse:'collapse',
                                  // border: '1px solid grey',
                                  padding: '3px'
                                }
                        }
                          }
                  }
                  getTrProps={(state, rowInfo, column, rtInstance) => {
                      return {
                          style:{
                            height:'25px',
                            bordercollapse:'collapse'
                          // border: '1px solid grey',
                                }
                        }
                          }
                  }
                  getTableProps={(state, rowInfo, column, rtInstance) => {
                      return {
                          style:{
                            bordercollapse:'collapse',
                            border: '1px solid grey'
                                }
                        }
                          }
                  }
                  getTheadGroupProps={(state, rowInfo, column, rtInstance) => {
                      return {
                          style:{
                            color:'black',
                            bordercollapse:'collapse',
                            border: '1px solid grey',
                            background:'lightgrey'
                                }
                        }
                          }
                  }
                  getThProps={(state, rowInfo, column, rtInstance) => {
                      return {
                          style:{
                            textcolor:'blue',
                            bordercollapse:'collapse',
                            border: '1px solid grey'
                                }
                        }
                          }
                  }
                  getPaginationProps={(state, rowInfo, column, rtInstance) => {
                      return {
                          style:{
                            bordercollapse:'collapse',
                            border: '1px solid grey',
                            background:'lightgrey'
                                }
                        }
                          }
                  }
                  //{...rowProps}
                />
              </div>

            </div>

    );
  // //   <ExpansionPanel>
  //     <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
  //       <Typography className={classes.heading}>Expand to view the grid</Typography>
  //         </ExpansionPanelSummary>
  //       <ExpansionPanelDetails>
  //
  //       </ExpansionPanelDetails>
  //       </ExpansionPanel>
//console.log(rowInfo);
// {showChart ? (
//       <Charts />
//     ) : (
//       <LineGraph />
//     )}

  }
}

export default withStyles(styles)(App);
