export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public role?: string,
    public google?: boolean,
    public img?: string,
    public password?: string,
    public uid?: string
  ) {}
}   
