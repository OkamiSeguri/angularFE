import { Ads } from './../models/ads.model';
import { AddAdsRequest } from './../models/add-ads-request.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(
    private http: HttpClient
  ) { }

  creatAds(data: AddAdsRequest){
    return this.http.post<AddAdsRequest>(`${environment.apiBaseUrl}/api/Advertisement?addAuth=true`, data)
  }

  getAllAds() : Observable<Ads[]> {
    return this.http.get<Ads[]>(`${environment.apiBaseUrl}/api/Advertisement`)
  }

  getAdstById(id: string) : Observable<Ads> {
    return this. http.get<Ads>(`${environment.apiBaseUrl}/api/Advertisement/${id}`)
  }

  

  deleteAds(id: string) : Observable<Ads> {
    return this.http.delete<Ads>(`${environment.apiBaseUrl}/api/Advertisement/${id}?addAuth=true`)
  }
}
