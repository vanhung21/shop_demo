import { Component, OnInit } from '@angular/core';
import { Shop } from './shop';
import { ShopService } from './shop.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public shops: Shop[] | undefined;
  public editShop: Shop | null = null;
  public deleteShop: Shop | null = null;


  constructor(private shopService: ShopService){}

  ngOnInit() {
    this.getShops()
  }


  public getShops(): void {
    this.shopService.getShops().subscribe(
      (response: Shop[]) => {
        this.shops = response;
        console.log(this.shops);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddShop(addForm: NgForm): void {
    this.shopService.addShop(addForm.value).subscribe(
      (response: Shop) => {
        console.log(response);
        this.getShops();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateShop(shop: Shop): void {
    this.shopService.updateShop(shop).subscribe(
      (response: Shop) => {
        console.log(response);
        this.getShops();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteShop(shopId: number): void {
    this.shopService.deleteShop(shopId).subscribe(
      (response: void) => {
        console.log(response);
        this.getShops();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(shop: Shop |null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addShopModal');
    }
    if (mode === 'edit') {
      this.editShop = shop;
      button.setAttribute('data-target', '#updateShopModal');
    }
    if (mode === 'delete') {
      this.deleteShop = shop;
      button.setAttribute('data-target', '#deleteShopModal');
    }
    container?.appendChild(button);
    button.click();
  }




}
