import { Product, ProductServiceService } from './../service/product-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  //@ts-ignore
  product: Product;

  //@ts-ignore
  creationGroup: FormGroup;
  
  message:any;

  constructor(private productService : ProductServiceService) { }

  ngOnInit() {
    this.creationGroup =new FormGroup({
      id: new FormControl('',[Validators.required]),
      name : new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required])
    });
  }
  
  public addProduct() {
    if(this.creationGroup.valid){
      let resp = this.productService.saveProduct(this.product);
      resp.subscribe((data)=>this.message = data);
    }else{
      console.log('invalid data');
    } 
  }
}
