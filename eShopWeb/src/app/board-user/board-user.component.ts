import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService, Product } from '../service/product-service.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {


  popoverTitle = 'Please Confirm!!';
  popoverMessage = 'Are You sure?';
  confirmClicked = false;
  cancelClicked = false;

  //@ts-ignore
  products : Products;

  //@ts-ignore
  product : Product[];

  //@ts-ignore
  products: Observable<ApiResponse>;

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

  
  
}
