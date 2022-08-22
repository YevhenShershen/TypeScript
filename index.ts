// import axios from "axios";

// const url = "https://jsonplaceholder.typicode.com/todos/1";

// //внутри  интерфейсов можем игнорировать свойства которые побираем
// interface Todo {
//   id: number;
//   title: string;
//   completed: boolean;
// }
// axios.get(url).then((response) => {
//   const todo = response.data as Todo;
//   const ID = todo.id;
//   const title = todo.title;
//   const completed = todo.completed;

//   logTodo(ID, title, completed)
// });

// // в аргументы функции можем давать типы данных которые хотим принимать
// const logTodo = (ID: number, title: string, completed: boolean)=>{
//   console.log( `The Todo with ID: ${ID}
//     Has a title of : ${title}
//     Is it completed? ${completed}`)
//   }
// //tsc index.ts компилирует и переводет с ts в js
// //node index.js показывает что находиться в JSON
