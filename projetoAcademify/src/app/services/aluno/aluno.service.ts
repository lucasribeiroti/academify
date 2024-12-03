import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = 'http://localhost:8080/api/aluno';

  constructor(private http: HttpClient) {}

  findAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  findById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  save(aluno: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, aluno);
  }

  update(aluno: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, aluno);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  count(): Observable<any> {
    return this.http.get(`${this.apiUrl}/total`);
  }
}
