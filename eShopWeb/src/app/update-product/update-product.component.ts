import { ProductServiceService } from './../service/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from './../model/api.response';
import { Component, OnInit } from '@angular/core';
import { Products } from '../model/product.model';
import { data } from 'jquery';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  //@ts-ignored
  id: string;
  //@ts-ignored
  products: Products
  //@ts-ignored
  apiResponse: ApiResponse;

  submitted = false;
  
  constructor(private router:Router,private productService:ProductServiceService,
    private route:ActivatedRoute) { }

  ngOnInit(){
    this.products = new Products();
    
    this.id = this.route.snapshot.params['id'];
    this.productService.findProductById(this.id)
    .subscribe((data: any) => {
      console.log(data)
      this.products = data;
    }, (error: any) => console.log(error));
  }

  onSubmit(){
    this.productService.updateProduct(this.id,this.products)
    .subscribe(data => console.log(data), error => console.log(error));
    this.products = new Products();
    this.router.navigate(['product']);
  }

  list(){
    this.router.navigate(['product']);
  }
}
