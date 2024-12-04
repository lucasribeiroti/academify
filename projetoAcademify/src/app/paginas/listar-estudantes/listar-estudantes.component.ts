import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AlunoService } from '../../services/aluno/aluno.service';

@Component({
  selector: 'app-listar-estudantes',
  templateUrl: './listar-estudantes.component.html',
  styleUrls: ['./listar-estudantes.component.scss'],
})
export class ListarEstudantesComponent implements OnInit {
  displayedColumns: string[] = ['matricula', 'nome', 'acoes'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private alunoService: AlunoService, private router: Router) {}

  ngOnInit(): void {
    this.carregarEstudantes();
  }

  carregarEstudantes(): void {
    this.alunoService.findAll().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  visualizar(matricula: string): void {
    this.router.navigate([`/estudantes/visualizar/${matricula}`]);
  }

  editar(matricula: string): void {
    this.router.navigate([`/estudantes/editar/${matricula}`]);
  }

  excluir(matricula: string): void {
    this.alunoService.delete(matricula).subscribe(() => {
      this.carregarEstudantes();
    });
  }
}
