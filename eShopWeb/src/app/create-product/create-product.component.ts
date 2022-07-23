import { ApiResponse } from './../model/api.response';
import { ProductServiceService } from './../service/product-service.service';
import { Products } from './../model/product.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  products: Products = new Products();
  submitted = false;

  constructor(private productService:ProductServiceService,
    private router: Router) { }

  ngOnInit() {
  }


  onSubmit() {
    this.submitted = true;
    this. productService.createProduct(this.products)
    .subscribe(data => console.log(data), error => console.log(error));
    this.products = new Products();
    this.router.navigate(['/addProduct']);
  }
}
