import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../../services/aluno/aluno.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss'],
})
export class PaginaInicialComponent implements OnInit {
  totalEstudantes = 0;

  constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
    this.carregarTotalEstudantes();
  }

  carregarTotalEstudantes(): void {
    this.alunoService.count().subscribe((total) => {
      this.totalEstudantes = total;
    });
  }
}
