//==========МОДУЛИ

//====Определение модуля
//В TS, как и в ECMAScript2015, любой файл, содержащий import или export
// верхнего уровня (глобальный), считается модулем.

//Модули в TS
//Существует 3 вещи, на которые следует обращать внимание при работе с модулями в TS:
//1Синтаксис: какой синтаксис я хочу использовать для импорта и экспорта сущностей?
//2Разрешение модулей: каковы отношения между названиями модулей (или их путями) и файлами на диске?
//3Результат: на что должен быть похож код модуля?

//========Синтаксис
//Основной экспорт в файле определяется с помощью export default:
// @filename: hello.ts
export default function helloWorld() {
  console.log("Привет, народ!");
}
//Затем данная функция импортируется следующим образом:
import hello from "./hello.js";
hello();
//В дополнению к экспорту по умолчанию, из файла может экспортироваться
// несколько переменных и функций с помощью export (без default):
export var pi = 3.14;
export let squareTwo = 1.41;
export const phi = 1.61;

export class RandomNumberGenerator {}

export function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
//Указанные сущности импортируются так:
import { pi, phi, absolute } from "./maths.js";

console.log(pi);
const absPhi = absolute(phi);
// const absPhi: number

//=======Дополнительный синтаксис импорта
//Название импортируемой сущности можно менять с помощью import { old as new }
import { pi as π } from "./maths.js";

console.log(π);

//Все экспортированные объекты при импорте можно поместить в одно пространство имен с помощью * as name
// @filename: app.ts
import * as math from "./maths.js";

console.log(math.pi);
const positivePhi = math.absolute(math.phi);
// const positivePhi: number

//=========Специфичный для TS синтаксис модулей
//Типы могут экспортироваться и импортироваться с помощью такого же синтаксиса, что и значения в JS:
// @filename: animal.ts
export type Cat = { breed: string, yearOfBirth: number }

export interface Dog {
  breeds: string[]
  yearOfBirth: number
}

// @filename: app.ts
import { Cat, Dog } from './animal.js'
type Animals = Cat | Dog

//TS расширяет синтаксис import с помощью import type, что позволяет импортировать только типы.
// @filename: animal.ts
export type Cat = { breed: string, yearOfBirth: number }
// 'createCatName' cannot be used as a value because it was imported using 'import type'.
// 'createCatName' не может использоваться в качестве значения, поскольку импортируется с помощью 'import type'
export type Dog = { breeds: string[], yearOfBirth: number }
export const createCatName = () => 'fluffy'

// @filename: valid.ts
import type { Cat, Dog } from './animal.js'
export type Animals = Cat | Dog

// @filename: app.ts
import type { createCatName } from './animal.js'
const name = createCatName()