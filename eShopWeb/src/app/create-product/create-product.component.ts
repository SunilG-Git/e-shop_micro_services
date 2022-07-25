import { ApiResponse } from './../model/api.response';
import { ProductServiceService } from './../service/product-service.service';
import { Products } from './../model/product.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  numberRegEx = /\-?\d*\.?\d{1,2}/;

  creationGroup= new FormGroup ({
    name : new FormControl('',Validators.minLength(4)),
    description : new FormControl('',Validators.minLength(8)),
    price : new FormControl('',Validators.pattern(this.numberRegEx))
  })
  get name(){
    return this.creationGroup.get('name')
  }
  get description(){
    return this.creationGroup.get('description')
  }
  get price(){
    return this.creationGroup.get('price')
  }
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
