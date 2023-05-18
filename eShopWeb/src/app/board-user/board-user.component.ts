import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService, Product } from '../service/product-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Products } from '../model/product.model';
import { MatTableDataSource } from '@angular/material/table';

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

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
 
  finalProductdata:any;

  
  ngOnInit(): void {
    // this.productService.findAllProducts().subscribe(
    //   response => this.handleSuccessfulResponse(response),
    // );
    // }
    // handleSuccessfulResponse(response: Product[]) {
    //   this.product = response;

    this.productService.findAllProducts().subscribe(response => {
      this.product = response;
      this.finalProductdata=new MatTableDataSource<Products>(this.product);
      this.finalProductdata.paginator=this.paginator;
      this.finalProductdata.sort=this.sort;
    });
    }

    displayColums: string[] = ["name", "description", "price","action"]
  
  
}
