import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

 
  constructor(public http: HttpClient) { }

  getFiles() {
    const url = environment.url + 'files'  ;
    return this.http.get(url);
  }
  
}
