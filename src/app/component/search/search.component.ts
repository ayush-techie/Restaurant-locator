import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeodataService } from 'src/app/services/geodata.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  geoData:FormGroup
  loading;
  restaurants;
  submit()
  {
    this.restaurants = null;
    console.log('loading true');
    this.loading = true;
    try {
      var radius=this.geoData.value.dist
      var center=[this.geoData.value.lat,this.geoData.value.long]
      var geodata={radius,center}
      var result
      this.geo.getRestaurants(geodata).subscribe(datas=>{
        this.loading = false;
        this.restaurants = datas;
        if (!datas) {
          this.restaurants = [];
        }
        });
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  }

  constructor(private geo:GeodataService) { }

  ngOnInit(): void {
    this.geoData=new FormGroup({
      'lat':new FormControl(-73.93,{validators:[Validators.required,Validators.min(-90),Validators.max(90)]}),
      'long':new FormControl(40.82,{validators:[Validators.required,Validators.min(-180),Validators.max(180)]}),
      'dist':new FormControl(5,{validators:[Validators.required]})
    })
  }

}
