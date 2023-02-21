// ПОДРОБНЕЕ О ФУНКЦИЯХ

//============Тип функции в форме выраждения(function type expressions)
function greeter(fn: (a: string) => void) {
  fn("Hello world!");
}
//Выражение (a:string)=>void означает Эфункция с одним параметром "а" типа string,
//которая ничего не возращает
//Если тип возврата в функции не устанавливать то она будет иметь тип 'any'

//Разумеется для типа функции можно использовать синоним:
type GreetFn = (a: string) => void;
function greeter1(fn: GreetFn) {}

//РАЗОБРАТЬСЯ НИЧЕГО НЕ ПОНЯТНО!!!!!!!!!!!!!!!!!!!!!
//Сигнатуры вызова (call signatures)
type DescFn = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescFn) {
  console.log(`Значением возвращаемым ${fn.description} является ${fn(6)}`);
}
//Сигнатуры конструктора(construct signatures)
//Как известно, функции могут вызываться с ключевым словом new. TS считает такие функции конструкторами,
// поскольку они, как правило, используются для создания объектов.
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("Hello!");
}
//Некоторые объекты, такие, например, как объект Date, могут вызываться как с, так и без new. Сигнатуры вызова и конструктора можно использовать совместно:
interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): number;
}

//============Общие функции или функции-дженерики (generic functions)
function firstElement<Type>(arr: Type[]): Type {
  return arr[0];
}
//В TS общие типы или дженерики (generics) используются для описания связи между двумя значениями.
//Это делается с помощью определения параметра Type в сигнатуре функции.

//============Предположение типа (inference)
//Мы можем использовать несколько параметров типа.
//Например, самописная версия функции map может выглядеть так:
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}

// Типом `n` является `string`,
// а типом `parsed` - `number[]`
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

//============Ограничения  (constraints)
//Реализуем функцию, возвращающую самое длинное из двух значений.
//Для этого нам потребуется свойство length, которое будет числом.
//Мы ограничим параметр типа типом number с помощью ключевого слова extends:
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a
  } else {
    return b
  }
 }

 // Типом `longerArr` является `number[]`
 const longerArr = longest([1, 2], [1, 2, 3])
 // Типом `longerStr` является `string`
 const longerStr = longest('alice', 'bob')
 // Ошибка! У чисел нет свойства `length`
 const notOK = longest(10, 100)
 // Argument of type 'number' is not assignable to parameter of type '{ length: number }'.
 // Аргумент типа 'number' не может быть присвоен параметру типа '{ length: number; }'

 //============Определение типа аргументов
 function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2)
 }
 //мы можем вручную определить Type, и тогда все будет в порядке:
 const arr123 = combine<string | number>([1, 2, 3], ['привет'])

 //============Опциональные параметры (optional parameters) ?
 //Функции в JS могут принимать произвольное количество аргументов.
 // Например, метод toFixed принимает опциональное количество цифр после запятой:
 function f(x?: number) {
  // ...
}
f(); // OK
f(10);
//Несмотря на то, что тип параметра определен как number,
// параметр x на самом деле имеет тип number | undefined,
//поскольку неопределенные параметры в JS получают значение undefined.

//Другие типы, о которых следует знать

//===void
//void представляет значение, возвращаемое функцией, которая ничего не возвращает.
//===object
//Специальный тип object представляет значение, которое не является примитивом
//(string, number, boolean, symbol, null, undefined).
//object отличается от типа пустого объекта ({}),
//а также от глобального типа Object.
//Скорее всего, вам никогда не потребуется использовать Object.
//Правило: object - это не Object. Всегда используйте object!
//В JS функции - это объекты: они имеют свойства,
//Object.prototype в цепочке прототипов, являются instanceof Object,
//мы можем вызывать на них Object.keys и т.д.
//По этой причине в TS типом функций является object.
//===unknown
//Тип unknown представляет любое значение. Он похож на тип any, но является более
//безопасным, поскольку не позволяет ничего делать с неизвестным значением
function f2(a: unknown) {
  a.b();
  // Object is of type 'unknown'.
  // Типом объекта является 'unknown'
}
//===never
//Некоторые функции никогда не возвращают значений:
function fail(msg: string): never {
  throw new Error(msg);
}
//===Function
//Глобальный тип Function описывает такие свойства как bind, call,
//apply и другие, характерные для функций в JS.
//Он также имеет специальное свойство,
//позволяющее вызывать значения типа Function - такие вызовы возвращают any:
function doSomethinG(f: Function) {
  f(1, 2, 3);
}

//============Оставшиеся параметры и аргументы

//Оставшиеся параметры (rest parameters)
//Оставшиеся параметры указываются после других параметров с помощью ...:
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// `a1` получает значение [10, 20, 30, 40]
const a1 = multiply(10, 1, 2, 3, 4);
//В TS неявным типом таких параметров является any[], а не any.
//Любая аннотация типа для них должна иметь вид Array<T> или T[],
//или являться кортежем.

//Оставшиеся аргументы (rest arguments)
const arr12 = [1, 2, 3];
const arr21 = [4, 5, 6];
arr12.push(...arr21);

// Предполагаемым типом является кортеж, состоящий из 2 элементов
const args = [8, 5] as const;
// OK
const angle = Math.atan2(...args);

//============Деструктуризация параметров (parameter destructuring)
//Деструктуризация параметров используется для распаковки объекта,
// переданного в качестве аргумента, в одну или более локальную переменную в теле функции. В `JS` это выглядит так:

function sum({ a, b, c }) {
  console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });
//Аннотация типа для объекта указывается после деструктуризации:
function sum1({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
//Для краткости можно использовать именованный тип:
type ABC = { a: number; b: number; c: number };
function sum2({ a, b, c }: ABC) {
  console.log(a + b + c);
}