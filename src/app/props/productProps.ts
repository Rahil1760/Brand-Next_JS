export interface productProps{
  _id:string,
  name: string,
  category: string,
  type?: string,
  price:number,
  size: Array<string>, // <-- FIX: Array of strings
  color: string,
  image: string,
  inStock:boolean,
}