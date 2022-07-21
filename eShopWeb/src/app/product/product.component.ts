import { ProductServiceService } from './../service/product-service.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../service/product-service.service';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  //@ts-ignore
  product : Product[];
  
  constructor(
    private productService:ProductServiceService
  ) { }

  ngOnInit(): void {
    this.productService.findAllProducts().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response: Product[]) {
    this.product = response;
  }
  
}
