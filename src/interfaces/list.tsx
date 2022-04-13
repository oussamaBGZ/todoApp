import  Todo  from "./todo"

export default interface List {
    handelDelete: (id:string)=> void
    todos: Todo[]
}