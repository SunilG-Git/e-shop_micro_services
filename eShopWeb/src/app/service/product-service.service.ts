import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export class Product {
  constructor(
    public id:string,
    public name:string,
    public description:string,
    public price: string
  ){}
}
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http:HttpClient) { }
  

  public saveProduct(product: Product){
    console.log('adding a Product...');
    return this.http.post ('http://localhost:8001/addProduct',product);
  }
  public findAllProducts(){
    console.log('finding all products...')
    return this.http.get<Product[]>('http://localhost:8001/findAllProducts'); 
  }
}
