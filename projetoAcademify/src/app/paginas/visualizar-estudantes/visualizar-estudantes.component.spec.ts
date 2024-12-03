import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { VisualizarEstudantesComponent } from './visualizar-estudantes.component';

describe('VisualizarEstudantesComponent', () => {
  let component: VisualizarEstudantesComponent;
  let fixture: ComponentFixture<VisualizarEstudantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizarEstudantesComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarEstudantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate student data on init', () => {
    expect(component.student).toEqual({ id: 1, name: 'João Silva', birthDate: '2000-01-01' });
  });
});
