import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GeodataService {

  constructor(private http:HttpClient) { }
  getRestaurants(data)
  {
    return this.http.post<any>('http://localhost:3000/geodata',data)
  }
}

