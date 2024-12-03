import { Component } from '@angular/core';
import { AlunoService } from '../../services/aluno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adicionar-estudante',
  templateUrl: './adicionar-estudante.component.html',
  styleUrls: ['./adicionar-estudante.component.css']
})
export class AdicionarEstudanteComponent {
  aluno = { nome: '', nascimento: '' };

  constructor(private alunoService: AlunoService, private router: Router) {}

  onSubmit(): void {
    this.alunoService.save(this.aluno).subscribe(() => {
      this.router.navigate(['/estudantes']);
    });
  }
}
