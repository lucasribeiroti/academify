import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../../services/aluno/aluno.service';

@Component({
  selector: 'app-editar-estudantes',
  templateUrl: './editar-estudantes.component.html',
  styleUrls: ['./editar-estudantes.component.scss'],
})
export class EditarEstudantesComponent implements OnInit {
  student = { matricula: '', nome: '', nascimento: '' };
  validationErrors: { nome?: string; nascimento?: string } = {};

  constructor(
    private route: ActivatedRoute,
    private alunoService: AlunoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.alunoService.findById(id).subscribe({
        next: (data) => {
          this.student = data;
        },
        error: (err) => {
          console.error('Erro ao carregar os dados do estudante:', err);
        },
      });
    }
  }

  onSubmit(): void {
    this.validationErrors = {};
    this.alunoService.update(this.student).subscribe({
      next: () => {
        console.log('Estudante atualizado:', this.student);
        this.router.navigate(['/estudantes']);
      },
      error: (err) => {
        if (err.error) {
          this.validationErrors = err.error;
        } else {
          console.error('Erro desconhecido ao atualizar estudante:', err);
        }
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/estudantes']);
  }
}
