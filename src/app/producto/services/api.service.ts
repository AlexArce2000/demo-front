import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:8080/demo-web/api/producto';

  constructor(private http: HttpClient) {}

  get(endpoint: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${endpoint}`);
  }

  post(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  put(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}