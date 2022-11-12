import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/modelo/empleado';
import { Horario } from 'src/app/modelo/horario';
import { EmpleadoService } from 'src/app/servicio/empleado.service';
import { faker } from '@faker-js/faker';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import api from 'src/config/config';
import { Row } from 'jspdf-autotable';
import { General } from 'src/app/modelo/general';
import { EmpleadoTarde } from 'src/app/modelo/empleadotarde';
import { Departamento } from 'src/app/modelo/departamento';
declare var jsPDF: any;

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.sass'],
})

export class HistorialComponent implements OnInit {


  empleado: Empleado[] = [];
  horario: Horario[] = [];
  dato: string = '';
  nombredepartamento: string='';
  general: General[]=[];
  generaltarde: EmpleadoTarde[]=[];
  generalSalidaAnticipada: EmpleadoTarde[]=[];
  departamentoTodos: Departamento[]=[];
  generaldepartamento: General[]=[];
 
  datos = [];
  constructor(
    public toastr: ToastrService,
    public postService: EmpleadoService,
    private router: Router) { }

  async ngOnInit() {

    await this.ingreso();
    await this.departamento();
  
  }

  

crearPdfEmpleadoIndividual(){

  var bodyData: string[][] = [];
 
  var dataRow = [];
  dataRow.push("FECHA");
  dataRow.push("HORA");
  dataRow.push("S/E");
  bodyData.push(dataRow);


  this.horario.forEach(function(sourceRow) {
    var dataRow = [];
    dataRow.push(sourceRow.fecha);
    dataRow.push(sourceRow.hora);
    dataRow.push(sourceRow.se);
    bodyData.push(dataRow);
  });
  
  

  const pdfDefinition: any = {
    content: [
      {
        text: this.nombreCompleto,

          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
       
      },
      {
       table:{
        widths: ['*', 200, 'auto'],
        
          body:bodyData,
        }
        
      }
    ]
  }
  
  const pdf = pdfMake.createPdf(pdfDefinition);
  pdf.open();

}

async imprimir(){
  await this.empleadogeneral();
  await this.crearPdfGeneral();
}

async crearPdfGeneral(){

  
  var bodyData: string[][] = [];

  var dataRow = [];
  dataRow.push("NOMBRES");
  dataRow.push("APELLIDOS");
  dataRow.push("E/S");
  dataRow.push("HORA");
  dataRow.push("FECHA");
  bodyData.push(dataRow);

  this.general.forEach(function(sourceRow) {
    var dataRow = [];
    dataRow.push(sourceRow.nombres);
    dataRow.push(sourceRow.apellidos);
    dataRow.push(sourceRow.se);
    dataRow.push(sourceRow.hora);
    dataRow.push(sourceRow.fecha);
    bodyData.push(dataRow);
  });
  
 

  const pdfDefinition: any = {
    content: [
      {
        text:"EMPLEADO GENERAL",

          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
       
      },
      {
       table:{
  
        widths: ['*',100, 75,75,75],
        columns:['Columna', 'Columna','Columna','Columna','Columna'],
          body:bodyData,
        }
        
      }
    ]
  }
  
  const pdf = pdfMake.createPdf(pdfDefinition);
  pdf.open();

}



async imprimirTarde(){
  await this.empleadotardegeneral();
  await this.crearPdfGeneralTarde();
}


async crearPdfGeneralTarde(){

  
  var bodyData: string[][] = [];


  var dataRow = [];
  dataRow.push("NOMBRES");
  dataRow.push("APELLIDOS");
  dataRow.push("ENTRADA TARDE");
  dataRow.push("SALIDA TARDE");

  bodyData.push(dataRow);

  this.generaltarde.forEach(function(sourceRow) {
    var dataRow = [];
    dataRow.push(sourceRow.nombres);
    dataRow.push(sourceRow.apellidos);
    dataRow.push(sourceRow.entrada_tarde);
    dataRow.push(sourceRow.salida_tarde);

    bodyData.push(dataRow);
  });
  
 

  const pdfDefinition: any = {
    content: [
      {
        text:"EMPLEADO FUERA DE HORARIOS",

          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
       
      },
      {
       table:{
  
        widths: ['*',100, 75,75],
          body:bodyData,
        }
        
      }
    ]
  }
  
  const pdf = pdfMake.createPdf(pdfDefinition);
  pdf.open();

}



async imprimirSalidaAnticipada(){
  await this.empleadosalidaanticipada();
  await this.crearPdfGeneralSalidaAnticipada();
}

async imprimirHistorial(id:string,nombre:string){
  this.nombredepartamento=nombre;
  await this.departamentoHistorial(id);
  await this.crearPdfGeneralDepartamento();
}

async crearPdfGeneralDepartamento(){

  
  var bodyData: string[][] = [];


  var dataRow = [];
  dataRow.push("NOMBRES");
  dataRow.push("APELLIDOS");
  dataRow.push("E/S");
  dataRow.push("HORA");
  dataRow.push("FECHA");
  bodyData.push(dataRow);

  this.generaldepartamento.forEach(function(sourceRow) {
    var dataRow = [];
    dataRow.push(sourceRow.nombres);
    dataRow.push(sourceRow.apellidos);
    dataRow.push(sourceRow.se);
    dataRow.push(sourceRow.hora);
    dataRow.push(sourceRow.fecha);
    bodyData.push(dataRow);
  });
  
 

  const pdfDefinition: any = {
    content: [
      {
        text:"Empleado General de "+this.nombredepartamento,

          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
       
      },
      {
       table:{
  
        columns:['Columna', 'Columna','Columna','Columna','Columna'],
        widths: ['*',100, 75,75,75],
          body:bodyData,
        }
        
      }
    ]
  }
  
  const pdf = pdfMake.createPdf(pdfDefinition);
  pdf.open();

}







async crearPdfGeneralSalidaAnticipada(){

  
  var bodyData: string[][] = [];



  var dataRow = [];
  dataRow.push("NOMBRES");
  dataRow.push("APELLIDOS");
  dataRow.push("SALIDA ANTICIPADA");
  bodyData.push(dataRow);

  this.generalSalidaAnticipada.forEach(function(sourceRow) {
    var dataRow = [];
    dataRow.push(sourceRow.nombres);
    dataRow.push(sourceRow.apellidos);
    dataRow.push(sourceRow.salida_tarde);

    bodyData.push(dataRow);
  });
  
 

  const pdfDefinition: any = {
    content: [
      {
        text:"EMPLEADO SALIDA ANTICIPADA",

          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
       
      },
      {
       table:{
  
        widths: ['*',100, 125],
          body:bodyData,
        }
        
      }
    ]
  }
  
  const pdf = pdfMake.createPdf(pdfDefinition);
  pdf.open();

}










  createPDF(){


    var bodyData: string[][] = [];
    this.empleado.forEach(function(sourceRow) {
      var dataRow = [];
      dataRow.push(sourceRow.nombres)
      dataRow.push(sourceRow.apellidos);
      dataRow.push(sourceRow.dpi);
      bodyData.push(dataRow)
    });
    
    
 
    const pdfDefinition: any = {
      content: [
        {
          text: 'Hola mundo',
         
        },
        {
         table:{
          widths: ['*', 200, 'auto'],
            body:bodyData,
          }
          
        }
      ]
    }
    
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
 
  }

  nombreCompleto:string ="";
  horarios: boolean = false;
  personas: boolean = true;
  departamentos: boolean=false;
  mensaje: boolean = true;

  async ingreso() {


    api.get('empleado/todo', {})
    .then((response: any) => {
      if (response.status === 200) {

        console.log(response)

        this.empleado = response.data;
     

      } else {
        this.toastr.error('al sistema', 'Alli te encargo', {
          timeOut: 3000,
        });
      }
    });
  }


  async departamento() {


    api.get('departamento/todo', {})
    .then((response: any) => {
      if (response.status === 200) {

        console.log(response)

        this.departamentoTodos = response.data;
     

      } else {
        this.toastr.error('al sistema', 'Alli te encargo', {
          timeOut: 3000,
        });
      }
    });
  }


  async empleadogeneral() {


   await api.get('historial/general', {})
    .then((response: any) => {
      if (response.status === 200) {

        console.log(response)

        this.general = response.data;
     

      } else {
        this.toastr.error('al sistema', 'Alli te encargo', {
          timeOut: 3000,
        });
      }
    });
  }

  async empleadotardegeneral() {


    await api.get('historial/generaltarde', {})
     .then((response: any) => {
       if (response.status === 200) {
 
         console.log(response)
 
         this.generaltarde = response.data;
      
 
       } else {
         this.toastr.error('al sistema', 'Alli te encargo', {
           timeOut: 3000,
         });
       }
     });
   }



   async empleadosalidaanticipada() {


    await api.get('historial/generalsalidaanticipada', {})
     .then((response: any) => {
       if (response.status === 200) {
 
         console.log(response)
 
         this.generalSalidaAnticipada = response.data;
      
 
       } else {
         this.toastr.error('al sistema', 'Alli te encargo', {
           timeOut: 3000,
         });
       }
     });
   }

  showSuccess() {
    this.toastr.success('everything is broken', 'Major Error', {
      timeOut: 3000,
    });
  }

  async borrar(id: string) {

    console.log(id)
    api.post('empleado/eliminar/'+id, {})
    .then((response: any) => {
      if (response.status === 200) {

        console.log(response)

        this.ingreso()

      
      } else {
        this.toastr.error('al sistema', 'Alli te encargo', {
          timeOut: 3000,
        });
      }
    });
  }

  editar(id: string) {
    console.log(id + "-----aqui");
  }

async  verHorarios(id: string, nombres: string, apellidos: string) {
  this.nombreCompleto=nombres+" "+apellidos;
  console.log(id)
    api.get('historial/historial/'+id, {})
    .then((response: any) => {
      if (response.status === 200) {

        console.log(response)

        this.horario = response.data;

        this.personas=false;
        this.departamentos=false;
        this.horarios=true;
      } else {
        this.toastr.error('al sistema', 'Alli te encargo', {
          timeOut: 3000,
        });
      }
    });

  }




  async  departamentoHistorial(id: string) {
   
      await api.get('historial/historialdepatamento/'+id, {})
      .then((response: any) => {
        if (response.status === 200) {
  
          console.log(response)
  
          this.generaldepartamento = response.data;
  
         
        } else {
          this.toastr.error('al sistema', 'Alli te encargo', {
            timeOut: 3000,
          });
        }
      });
  
    }



  salir() {
    this.router.navigateByUrl('');
  }

  verDepartamento(){

        this.personas=false;
        this.departamentos=true;
        this.horarios=false;

  }


  regresar(){
    this.personas=true;
    this.horarios=false;
    this.departamentos=false;
    this.nombreCompleto="";

  }
}


