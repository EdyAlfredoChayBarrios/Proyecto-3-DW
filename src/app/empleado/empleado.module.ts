import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoRoutingModule } from './empleado-routing.module';
import { AppComponent } from '../app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MarcajeComponent } from './marcaje/marcaje.component';
import { HistorialComponent } from './historialempleados/historial.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MarcajeComponent,
    HistorialComponent
  ],
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmpleadoModule { }
