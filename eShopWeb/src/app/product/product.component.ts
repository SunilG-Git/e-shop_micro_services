import { Products } from './../model/product.model';
import { ProductServiceService } from './../service/product-service.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../service/product-service.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/api.response';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  //@ts-ignore
  products : Products;

  //@ts-ignore
  product : Product[];

  //@ts-ignore
  Products: Observable<ApiResponse>;
  //@ts-ignore
  Product: Observable<Product[]>;
  
  constructor(
    private productService:ProductServiceService ,
    private router: Router) { 
      
   
  }

  ngOnInit(): void {
    this.productService.findAllProducts().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    }
    handleSuccessfulResponse(response: Product[]) {
      this.product = response;
      }

  deleteProduct(id: string) {
    this.productService.deletedProduct(id)
      .subscribe(
        data => {
          console.log(data);
          this.Product = this.productService.findAllProducts();
        },
        error => console.log(error));
  }

  updateProduct(id: string){
    this.router.navigate(['update', id]);
  }
}





