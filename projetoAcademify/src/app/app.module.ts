import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PaginaInicialComponent } from './paginas/pagina-inicial/pagina-inicial.component';
import { ListarEstudantesComponent } from './paginas/listar-estudantes/listar-estudantes.component';
import { AdicionarEstudanteComponent } from './paginas/adicionar-estudante/adicionar-estudante.component';
import { EditarEstudantesComponent } from './paginas/editar-estudantes/editar-estudantes.component';
import { VisualizarEstudantesComponent } from './paginas/visualizar-estudantes/visualizar-estudantes.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    ListarEstudantesComponent,
    AdicionarEstudanteComponent,
    EditarEstudantesComponent,
    VisualizarEstudantesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
