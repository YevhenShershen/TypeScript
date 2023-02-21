//============ОБЪЕКТНЫЕ ТИПЫ

//В JS обычным способом группировки и передачи данных являются объекты.
//В TS они представлены объектными типами (object types).

//Как мы видели ранее, они могут быть анонимными:
function greet(person: { name: string; age: number }) {
  return `Привет, ${person.name}!`;
}
//или именоваться с помощью интерфейсов (interfaces):
interface Person {
  name: string;
  age: number;
}

function greet1(person: Person) {
  return `Привет, ${person.name}!`;
}
//или синонимов типа (type aliases):
type Person2 = {
  name: string;
  age: number;
};

function greet2(person: Person2) {
  return `Привет, ${person.name}!`;
}

//============Модификаторы свойств (property modifiers)
//Каждое свойство в объектном типе может определять несколько вещей:
//сам тип, то, является ли свойство опциональным, и может ли оно изменяться.

//========Опциональные свойства (optional properties)
//Свойства могут быть помечены как опциональные (необязательные)
//путем добавления вопросительного знака (?) после их названий:
interface PaintOptions {
  shape: string;
  xPos?: number;
  yPos?: number;
}

function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos;
  // (property) PaintOptions.xPos?: number | undefined
  let yPos = opts.yPos;
  // (property) PaintOptions.yPos?: number | undefined
}
//Мы можем получать значения таких свойств. Однако, при включенной настройке
//strictNullChecks, мы будем получать сообщения о том, что потенциальными
//значениями опциональных свойств является undefined.
//В JS при доступе к несуществующему свойству возвращается undefined. Добавим обработку этого значения
function paintShape1(opts: PaintOptions) {
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;
  // let xPos: number
  let yPos = opts.yPos === undefined ? 0 : opts.yPos;
  // let yPos: number
  // ...
}
//function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) - определения "дефолтных" значений

//========Свойства, доступные только для чтения (readonly properties)
//Свойства могут быть помечены как доступные только для чтения с помощью ключевого слова readonly.
//Такие свойства не могут перезаписываться в процессе проверки типов:
interface SomeType {
  readonly prop: string;
}

//Использование модификатора readonly не делает саму переменную иммутабельной
//(неизменяемой), это лишь запрещает присваивать ей другие значения:
interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let writablePerson: Person = {
  name: "John Smith",
  age: 42,
};

// работает
let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age); // 42
writablePerson.age++;
console.log(readonlyPerson.age); // 43

//=======Расширение типов (extending types)
//нтерфейсы также могут расширяться с помощью нескольких типов одновременно:
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};

//=======Пересечение типов (intersection types)
//interface позволяет создавать новые типы на основе других посредством их расширения.
// TS также предоставляет другую конструкцию, которая называется пересечением типов
//или пересекающимися типами и позволяет комбинировать существующие объектные типы.
//Пересечение типов определяется с помощью оператора &:
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

type ColorfulCircle1 = Colorful & Circle;
//Пересечение типов Colorful и Circle приводит к возникновению типа, включающего все поля Colorful и Circle:
function draw(circle: Colorful & Circle) {
  console.log(`Цвет круга: ${circle.color}`);
  console.log(`Радиус круга: ${circle.radius}`);
}

// OK
draw({ color: "blue", radius: 42 });

//===============Общие объектные типы (generic object types)

//По сути, Box — это шаблон для настоящего типа, в котором Type будет заменен на конкретный тип.
interface Box<Type> {
  contents: Type;
}
interface StringBox {
  contents: string;
}

let boxA: Box<string> = { contents: "привет" };
boxA.contents;
// (property) Box<string>.contents: string

let boxB: StringBox = { contents: "народ" };
boxB.contents;
// (property) StringBox.contents: string

//===общую функцию (generic function
function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents;
}
//Синонимы типов также могут быть общими.
//Вот как мы можем определить общий тип (generic type) Box:
type Box1<Type> = {
  contents: Type;
};
//Поскольку синонимы, в отличие от интерфейсов, могут использоваться для описания любых типов,
// а не только типов объектов, мы можем использовать их следующим образом:
type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
// type OneOrManyOrNull<Type> = OneOrMany<Type> | null

type OneOrManyOrNullStrings = OneOrManyOrNull<string>;
// type OneOrManyOrNullStrings = OneOrMany<string> | null

//============Тип Array

//Синтаксис number[] или string[] — это сокращения для Array<number> и Array<string>, соответственно:
//Современный JS также предоставляет другие общие структуры данных, такие как Map<K, V>, Set<T> и Promise<T>.
// Указанные структуры могут работать с любым набором типов.

//============Тип ReadonlyArray
//ReadonlyArray — это специальный тип, описывающий массив, который не должен изменяться.

//============Кортеж (tuple)

//Кортеж — это еще одна разновидность типа Array с фиксированным количеством элементов определенных типов.

type StrNumPair = [string, number];

//StrNumPair — это кортеж string и number. StrNumPair описывает массив, первый элемент которого
//(элемент под индексом 0) имеет тип string, а второй (элемент под индексом 1) — number

//Кортежи можно деструктурировать:
function doSomething(stringHash: [string, number]) {
  const [inputString, hash] = stringHash;

  console.log(inputString);
  // const inputString: string

  console.log(hash);
  // const hash: number
}

//Элементы кортежа могут быть опциональными (?).
//Такие элементы указываются в самом конце и влияют на тип свойства length:
type Either2dOr3d = [number, number, number?];

function setCoords(coord: Either2dOr3d) {
  const [x, y, z] = coord;
  // const z: number | undefined

  console.log(`
   Переданы координаты в ${coord.length} направлениях
 `);
  // (property) length: 2 | 3
}

type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
//...boolean[] означает любое количество элементов типа boolean.

//Кортежи сами могут использоваться в качестве оставшихся параметров и аргументов. Например, такой код:
function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
  // ...
}
//является эквивалентом следующего:
function readButtonInput2(name: string, version: number, ...input: boolean[]) {
  // ...
}

//Кортежи, доступные только для чтения (readonly tuple types)
//Кортежи, доступные только для чтения, также определяются с помощью модификатора readonly:
