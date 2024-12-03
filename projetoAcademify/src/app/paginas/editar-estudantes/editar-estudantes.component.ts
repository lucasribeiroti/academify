import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-estudantes',
  templateUrl: './editar-estudantes.component.html',
  styleUrls: ['./editar-estudantes.component.css']
})
export class EditarEstudantesComponent implements OnInit {
  student = { id: 0, name: '', birthDate: '' };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Simulando a recuperação do ID e dados do estudante
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.student = { id, name: 'João Silva', birthDate: '2000-01-01' }; // Dados fictícios
  }

  onSubmit(): void {
    console.log('Student updated:', this.student);
    this.router.navigate(['/estudantes']);
  }

  onCancel(): void {
    this.router.navigate(['/estudantes']);
  }
}
