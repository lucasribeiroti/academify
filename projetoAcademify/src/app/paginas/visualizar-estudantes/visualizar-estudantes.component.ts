import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visualizar-estudantes',
  templateUrl: './visualizar-estudantes.component.html',
  styleUrls: ['./visualizar-estudantes.component.css']
})
export class VisualizarEstudantesComponent implements OnInit {
  student: { id: number; name: string; birthDate: string } | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Simulando a recuperação do ID e dados do estudante
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.student = { id, name: 'João Silva', birthDate: '2000-01-01' }; // Dados fictícios
  }
}
