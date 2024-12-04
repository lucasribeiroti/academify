import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  private apiUrl = 'http://localhost:8080/api/aluno';

  constructor(private http: HttpClient) {}

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar alunos:', error);
        alert('Não foi possível carregar a lista de alunos. Tente novamente mais tarde.');
        return throwError(() => error);
      })
    );
  }

  findById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Erro ao buscar aluno com ID ${id}:`, error);
        alert('Não foi possível buscar os dados do aluno. Tente novamente mais tarde.');
        return throwError(() => error);
      })
    );
  }

  save(aluno: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, aluno).pipe(
      catchError((error) => {
        console.error('Erro ao salvar aluno:', error);
        alert('Não foi possível salvar os dados do aluno. Verifique os campos e tente novamente.');
        return throwError(() => error);
      })
    );
  }

  update(aluno: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, aluno).pipe(
      catchError((error) => {
        console.error('Erro ao atualizar aluno:', error);
        alert('Não foi possível atualizar os dados do aluno. Tente novamente mais tarde.');
        return throwError(() => error);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Erro ao excluir aluno com ID ${id}:`, error);
        alert('Não foi possível excluir o aluno. Tente novamente mais tarde.');
        return throwError(() => error);
      })
    );
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`).pipe(
      catchError((error) => {
        console.error('Erro ao contar os alunos:', error);
        alert('Não foi possível contar os alunos cadastrados. Tente novamente mais tarde.');
        return throwError(() => error);
      })
    );
  }
}
