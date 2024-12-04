import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaInicialComponent } from './pagina-inicial.component';
import { AlunoService } from '../../services/aluno/aluno.service';
import { of } from 'rxjs';

describe('PaginaInicialComponent', () => {
  let component: PaginaInicialComponent;
  let fixture: ComponentFixture<PaginaInicialComponent>;
  let alunoServiceMock: jasmine.SpyObj<AlunoService>;

  beforeEach(async () => {
    const alunoServiceSpy = jasmine.createSpyObj('AlunoService', ['count']);

    await TestBed.configureTestingModule({
      declarations: [PaginaInicialComponent],
      providers: [{ provide: AlunoService, useValue: alunoServiceSpy }],
    }).compileComponents();

    alunoServiceMock = TestBed.inject(AlunoService) as jasmine.SpyObj<AlunoService>;
    fixture = TestBed.createComponent(PaginaInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load total students on init', () => {
    const totalEstudantes = 10;
    alunoServiceMock.count.and.returnValue(of(totalEstudantes));

    component.carregarTotalEstudantes();

    expect(component.totalEstudantes).toBe(totalEstudantes);
    expect(alunoServiceMock.count).toHaveBeenCalled();
  });
});
