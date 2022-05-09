import { Component, VERSION } from "@angular/core";
import { CareerResult, SurveyDataService } from "./survey-data.service";
import RawData = require("./rawData");
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public dynamicResults = [];
  public dynamicResults2 = [];
  fitContainer: boolean = true;
  view: [1000, 1000];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Country";
  showYAxisLabel = true;
  yAxisLabel = "Sales";
  timeline = true;
  doughnut = true;
  selectedDevice: string;
  colorScheme = {
    domain: ["#9370DB", "#87CEFA", "#FA8072", "#FF7F50", "#90EE90", "#9370DB"]
  };
  //pie
  showLabels = true;
  constructor(private surveyDataService: SurveyDataService) {}
  public ngOnInit(): void {
    this.selectedDevice = "age";
  }

  onSelectChange(option: Event) {
    var reasons = {};
    this.dynamicResults = [];

    this.surveyDataService.getData().forEach((row) => {
      row.changeReason.forEach((reason) => {
        if (reason) {
          if (reasons[reason]) {
            if (reasons[reason][row[this.selectedDevice]]) {
              reasons[reason][row[this.selectedDevice]].value++;
            } else {
              reasons[reason][row[this.selectedDevice]] = {
                value: 1
              };
            }
          } else {
            reasons[reason] = {};
            reasons[reason][row[this.selectedDevice]] = {
              value: 1
            };
          }
        }
      });
    });
    console.log(reasons);
    Object.keys(reasons).forEach((key) => {
      var a = [];
      Object.keys(reasons[key]).forEach((f) => {
        a.push({ name: f, value: reasons[key][f].value });
      });
      this.dynamicResults.push({
        name: key.trim(),
        series: a
      });
    });
    console.log(reasons);
    console.log(this.dynamicResults);
  }
}
