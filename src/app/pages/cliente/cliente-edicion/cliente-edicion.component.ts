import { Cliente } from '../../../_model/cliente';
import { ClienteService } from '../../../_service/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-edicion',
  templateUrl: './cliente-edicion.component.html',
  styleUrls: ['./cliente-edicion.component.css']
})
export class ClienteEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'idCliente': new FormControl(0),
      'nombre': new FormControl(''),
      'apellido': new FormControl(''),
      'email': new FormControl(''),
      'dni': new FormControl(''),
      'fechacreacion': new FormControl(''),
      'fechanacimiento': new FormControl('')
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });

  }

  get f() { return this.form.controls; }

  initForm() {
    //EDITAR, por lo tanto carga la data a editar
    if (this.edicion) {
      this.clienteService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idCliente': new FormControl(data.idCliente),
          'nombre': new FormControl(data.nombre),
          'apellido': new FormControl(data.apellido),
          'email': new FormControl(data.email),
          'dni': new FormControl(data.dni),
          'fechacreacion': new FormControl(data.fechacreacion),
          'fechanacimiento': new FormControl(data.fechanacimiento)
        });
      });
    }
  }

  operar() {

    if (this.form.invalid) { return; }

    let cliente = new Cliente();
    cliente.idCliente = this.form.value['idCliente'];
    cliente.nombre = this.form.value['nombre'];
    cliente.apellido = this.form.value['apellido'];
    cliente.email = this.form.value['email'];
    cliente.dni = this.form.value['dni'];
    cliente.fechacreacion = this.form.value['fechacreacion'];
    cliente.fechanacimiento = this.form.value['fechanacimiento'];

    if (this.edicion) {
      //MODIFICAR
      this.clienteService.modificar(cliente).subscribe(() => {
        this.clienteService.listar().subscribe(data => {
          this.clienteService.clienteCambio.next(data);
          this.clienteService.mensajeCambio.next('SE MODIFICO');
        });
      });
    } else {
      //INSERTAR
      this.clienteService.registrar(cliente).subscribe(() => {
        this.clienteService.listar().subscribe(data => {
          this.clienteService.clienteCambio.next(data);
          this.clienteService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    this.router.navigate(['cliente']);
  }

}
