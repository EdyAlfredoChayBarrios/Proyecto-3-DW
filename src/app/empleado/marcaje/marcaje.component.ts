import { Component, OnInit, ɵɵstylePropInterpolate3 } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/servicio/empleado.service';
import { Empleado } from 'src/app/modelo/empleado';
import { Calculo } from 'src/app/modelo/calculo';
import api from 'src/config/config';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-marcaje',
  templateUrl: './marcaje.component.html',
  styleUrls: ['./marcaje.component.sass'],
})


export class MarcajeComponent implements OnInit {
  empleado : Empleado[] = [];
  calculo : Calculo[] = [];
  today: Date = new Date();
  constructor(
    public postService: EmpleadoService,
    private router: Router,
    public toastr: ToastrService,
    ) { }


  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Empleado[])=>{
      this.empleado = data;
      
    })
  }

  async marcar(){
    this.today=new Date();
    // console.log(this.today.toTimeString().substring(0,8));

    var idUsuarioLocal=localStorage.getItem('idUsuario');

    var num=this.today.getMonth()+1;
    var fecha=this.today.getFullYear().toString()+'-'+num+'-'+this.today.getDate().toString()+' '+this.today.toTimeString().substring(0,8).toString();


    api.get('Historial/ingreso/'+idUsuarioLocal+'/'+fecha,{})
      .then((response:any) => {
        if (response.status === 200) {

         
          this.toastr.success('Hora ingresa '+fecha, 'Nitido', {
            timeOut: 3000,
          });
        
         
          

        } else {
          this.toastr.error('al sistema', 'Alli te encargo', {
            timeOut: 3000,
          });
    }
      });



  }

  async verCalculos(){

    api.get('Calculo/todo',{})
      .then((response:any) => {
        if (response.status === 200) {

         
         
          this.calculo = response.data;
         
          

        } else {
      
    }
      });

    
  }


  salir(){
    this.router.navigateByUrl('');
  }
  
  element: boolean = true;


}
