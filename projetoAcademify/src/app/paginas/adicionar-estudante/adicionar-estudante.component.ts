import { Component } from '@angular/core';
import { AlunoService } from '../../services/aluno/aluno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adicionar-estudante',
  templateUrl: './adicionar-estudante.component.html',
  styleUrls: ['./adicionar-estudante.component.scss'],
})
export class AdicionarEstudanteComponent {
  aluno = { matricula: '', nome: '', nascimento: '' };
  validationErrors: { nome?: string; nascimento?: string } = {};

  constructor(private alunoService: AlunoService, private router: Router) {}

  onSubmit(): void {
    console.log('Formulário enviado:', this.aluno);
    this.validationErrors = {};
    this.alunoService.save(this.aluno).subscribe({
      next: () => {
        console.log('Aluno salvo com sucesso:', this.aluno);
        this.router.navigate(['/estudantes']);
      },
      error: (err) => {
        if (err.error) {
          this.validationErrors = err.error;
        } else {
          console.error('Erro desconhecido:', err);
        }
      },
    });
  }
}
