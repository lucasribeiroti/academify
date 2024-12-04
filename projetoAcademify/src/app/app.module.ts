import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Ajustado para uso do fetch
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Componentes
import { PaginaInicialComponent } from './paginas/pagina-inicial/pagina-inicial.component';
import { ListarEstudantesComponent } from './paginas/listar-estudantes/listar-estudantes.component';
import { AdicionarEstudanteComponent } from './paginas/adicionar-estudante/adicionar-estudante.component';
import { EditarEstudantesComponent } from './paginas/editar-estudantes/editar-estudantes.component';
import { VisualizarEstudantesComponent } from './paginas/visualizar-estudantes/visualizar-estudantes.component';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    ListarEstudantesComponent,
    AdicionarEstudanteComponent,
    EditarEstudantesComponent,
    VisualizarEstudantesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
  ],
  providers: [
    provideHttpClient(withFetch()), // Habilita o uso do fetch no HttpClient
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
