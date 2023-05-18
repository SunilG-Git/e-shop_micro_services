import { ApiResponse } from './../model/api.response';
import { Products } from './../model/product.model';
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
  findAllProductsById(id: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }
  
  public findAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:8001/findAllProducts'); 
  }
  // GetallTarget(): Observable<TargetNode[]> {
  //   return this.http.get<TargetNode[]>(this.apiurl+'/list');
  // }
  createProduct(product : Products):Observable<ApiResponse>{
    return this.http.post<ApiResponse>('http://localhost:8001/addProduct',product);
  }
  deletedProduct(id : string):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>('http://localhost:8001/deleteProduct/' + id);
  }
  updateProduct(id: string, products: Products): Observable<ApiResponse> {
    return this.http.put<ApiResponse>('http://localhost:8001/updateProduct/' + products.id, products);
  }
  findProductById(id: string): Observable<any> {
    return this.http.get('http://localhost:8001/findAllProductsById/ '+ id);
  }
}
