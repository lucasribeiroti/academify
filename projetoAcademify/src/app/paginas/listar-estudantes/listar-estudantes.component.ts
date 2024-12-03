import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../../services/aluno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-estudantes',
  templateUrl: './listar-estudantes.component.html',
  styleUrls: ['./listar-estudantes.component.css']
})
export class ListarEstudantesComponent implements OnInit {
  alunos: any[] = []; // Lista de alunos
  displayedColumns: string[] = ['id', 'nome', 'acoes']; // Colunas exibidas na tabela

  constructor(private alunoService: AlunoService, private router: Router) {}

  ngOnInit(): void {
    this.carregarAlunos();
  }

  // Método para carregar a lista de alunos
  carregarAlunos(): void {
    this.alunoService.findAll().subscribe((data) => {
      this.alunos = data;
    });
  }

  // Navegar para a tela de visualizar aluno
  visualizar(id: number): void {
    this.router.navigate([`/estudantes/visualizar/${id}`]);
  }

  // Navegar para a tela de editar aluno
  editar(id: number): void {
    this.router.navigate([`/estudantes/editar/${id}`]);
  }

  // Excluir um aluno e recarregar a lista
  excluir(id: number): void {
    this.alunoService.delete(id).subscribe(() => {
      this.carregarAlunos();
    });
  }
}
