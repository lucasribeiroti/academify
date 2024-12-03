import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicialComponent } from './paginas/pagina-inicial/pagina-inicial.component';
import { ListarEstudantesComponent } from './paginas/listar-estudantes/listar-estudantes.component';
import { AdicionarEstudanteComponent } from './paginas/adicionar-estudante/adicionar-estudante.component';
import { EditarEstudantesComponent } from './paginas/editar-estudantes/editar-estudantes.component';
import { VisualizarEstudantesComponent } from './paginas/visualizar-estudantes/visualizar-estudantes.component';

const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'estudantes', component: ListarEstudantesComponent },
  { path: 'estudantes/adicionar', component: AdicionarEstudanteComponent },
  { path: 'estudantes/editar/:id', component: EditarEstudantesComponent },
  { path: 'estudantes/visualizar/:id', component: VisualizarEstudantesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
