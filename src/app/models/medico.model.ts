import { Hospital } from './hospital.models';
import { Usuario } from './usuario.model';
interface _MedicoUser {
  id: string;
  nombre: string;
  img: string;
}

interface _HospitalUser {
  _id: string;
  nombre: string;
  img: string;
}


export class Medico {
  constructor(
    public nombre: string = '',
    public id: string = '',
    public img?: string,
    public usuario: _MedicoUser = { id: '', nombre: '', img: '' }, 
    public hospital: Hospital = { id: '', nombre: '', img: '', usuario:{_id:'', nombre:'', img:''}  }, 
  ) {}
}
