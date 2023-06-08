import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shop } from './shop';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${this.apiServerUrl}/shop/all`);
  }

  public addShop(Shop: Shop): Observable<Shop> {
    return this.http.post<Shop>(`${this.apiServerUrl}/shop/add`, Shop);
  }

  public updateShop(Shop: Shop): Observable<Shop> {
    return this.http.put<Shop>(`${this.apiServerUrl}/shop/update`, Shop);
  }

  public deleteShop(ShopId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/shop/delete/${ShopId}`);
  }
}
