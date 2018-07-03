import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../_services/report.service';

import { UserReport } from '../../_models/user';


import {GoogleCharts} from 'google-charts';
 


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less']
})
export class ReportComponent implements OnInit {
  report:UserReport;
  usersdata = [];
  googleLoaded:boolean = false;
  load:boolean;
  private headers = new Headers({
      'Content-Type': 'application/json'}
    );
  constructor(
       private _reportService: ReportService
  ) { }



    public line_ChartData:string[];
    public line_ChartOptions = {
        title: 'The users by the month',
        curveType: 'function',
        legend: {
            position: 'bottom'
        }
    };
   


    public map_ChartOptions = {};
    public org_ChartOptions = {
        allowHtml: true
    };

  ngOnInit() {
    this.getReport();
    this.getGraph();
    this.getLatestUsers(); 
    
  }
 /**
 * Get user report by month 
 */
  getReport():void{
     this._reportService.getReport().then(res=>{
       this.report=res; 
      });
  }

   getGraph():void{
     this._reportService.getGraph().then(res=>{
      this.line_ChartData = res.data;
      console.log(res.data);


      //Load the charts library with a callback
      GoogleCharts.load(drawChart);
      
      function drawChart() {
      
          // Standard google charts functionality is available as GoogleCharts.api after load
          const data = GoogleCharts.api.visualization.arrayToDataTable([
              ['Chart thing', 'Chart amount'],
              ['Lorem ipsum', 60],
              ['Dolor sit', 22],
              ['Sit amet', 18]
          ]);
          const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('lineChart'));
          pie_1_chart.draw(data);
      }

      });
  }

  getLatestUsers():void{
     this._reportService.getLatestUsers().then(res=>{
      this.usersdata = res.users;
      });
  }



  

  
}
