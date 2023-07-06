import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productList : any;
  public filterCategory : any;
  public searchKey: string ='';
  constructor(
    private api: ApiService,
    private cartService: CartService
    ) { }

  ngOnInit(): void {
    this.api.getAllProducts().subscribe(
      res => {
        this.productList = res;
        this.filterCategory = res;
        //need to add quantity and price to UI table (from API we are not agetting these 2 values)
        this.productList.forEach((a:any) => {
          //men's clothing
          //jewelery
          //electronics

          if(a.category === "men's clothing" || a.category === "women's clothing"){
            a.category = "fashion";
          }
          Object.assign(a, {quantity:1, total:a.price});
          console.log(this.productList)
        });
      }
    )
    this.cartService.search.subscribe(value =>{
      this.searchKey = value;
    })
  }

  addTocart(item : any){
    //need to add to cart
    this.cartService.addToCart(item);
  }
filter(category: string){
this.filterCategory = this.productList.filter((a:any) =>{
  if(a.category == category || category == '')
    return a;
})
}

}
