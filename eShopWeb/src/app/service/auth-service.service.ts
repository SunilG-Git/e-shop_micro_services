import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  login(data: any):Observable<any> {
    console.log("it is from server");
    return this.http.post('http://localhost:8001/authenticate',data,{responseType:'text' as 'json'});
  }
}
 