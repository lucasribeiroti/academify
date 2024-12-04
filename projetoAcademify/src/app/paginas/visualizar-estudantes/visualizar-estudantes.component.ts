import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunoService } from '../../services/aluno/aluno.service';

@Component({
  selector: 'app-visualizar-estudantes',
  templateUrl: './visualizar-estudantes.component.html',
  styleUrls: ['./visualizar-estudantes.component.scss'],
})
export class VisualizarEstudantesComponent implements OnInit {
  student: { matricula: string; nome: string; nascimento: string } | null = null;

  constructor(
    private route: ActivatedRoute,
    private alunoService: AlunoService
  ) {}

  ngOnInit(): void {
    const matricula = this.route.snapshot.paramMap.get('id');
    if (matricula) {
      this.alunoService.findById(matricula).subscribe((data) => {
        this.student = data;
      });
    }
  }
}
