import {NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarComponent } from './empleado/registrar/registrar.component';
import { LoginComponent } from './empleado/login/login.component';
import {HistorialComponent} from './empleado/historialempleados/historial.component';
import {MarcajeComponent} from './empleado/marcaje/marcaje.component';

const routes: Routes = [
    {
    path: 'home',
    loadChildren: () =>
      import('./empleado/login/login.component').then((m) => m.LoginComponent),
    },
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    },
    {path: 'registrar', component: RegistrarComponent, pathMatch: 'full'},
    {path: 'login', component: LoginComponent, pathMatch: 'full'},
    {path: 'historial', component: HistorialComponent, pathMatch: 'full'},
    {path: 'marcaje', component: MarcajeComponent, pathMatch: 'full'},
    
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

