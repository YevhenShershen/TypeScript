//============Примитивы: string, number и boolean
let num: number = 10;
let str: string = "10";
let bool: boolean = true;
//============Массивы
let arr: number[] = [1, 2, 3]; //массив чисел
let arr2: Array<number> = [1, 2, 3]; //означает то же самое что и запись выше (массив чисел)

//============Кортежи (Tuples) также, как и массивы, представляют набор элементов, для которых уже заранее известен тип.
//В отличие от массивов кортежи могут хранить значения разных типов.
let arr3: [number, string] = [1, "some text"]; //это другой тип это тип кортеж

//============Тип any
//any используется при неявном тип значения
let variable1: any = 1;
//Аннотация типа для переменных (TS автоматически определяет тип переменной на основе ее инициализатора)
let personName = "John";

//============Функции
function getName(name: string): string {
  return name;
}
//void в TypeScript является подходящим типом, сообщающим разработчикам о том, что функция возвращает undefined
function getPerson(person: { name: string; surname: string }): void {
  console.log(person.name);
  console.log(person.surname);
}

//============Опциональные свойства
//Для определения свойства в качестве опционального используется символ ? после названия свойства:

function printName(obj: { first: string; last?: string }) {}
//Обе функции сработают
printName({ first: "John" });
printName({ first: "John", last: "Air" });
//В JS при доступе к несуществующему свойству возвращается undefined.
//По этой примине, при чтении опционального свойства неоьходимо выполнять проверку на undefined
function printName2(obj: { first: string; last?: string }) {
  if (obj.last !== undefined) {
    console.log(obj.last.toUpperCase());
  }
  //то же самое что и выше ток новый ситаксис JS -
  //console.log(obj.last?.toUpperCase())
}

//============Определение объединения
//Объединение - это тип, сформированный из 2 и более типов, представляющий значения,
//которое может иметь один из этих типов.
function printId1(id: number | string) {
  console.log(id);
}
printId1(101);
printId1("202");

//============Работа с объединениями - Например, если у нас имеется объединение string | number,
//мы не сможем использовать методы, которые доступны только для string
function printId2(id: number | string) {
  //Property 'toUpperCase' does not exist on type 'string | number'.
  console.log(id.toUpperCase());
}
//Решение данной проблемы заключается в сужении(narrowing) объединения.
function printId3(id: number | string) {
  //в этой ветке 'id' имеет тип 'string'
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  }
  //А здесь 'id' имеет тип 'number'
  console.log(id);
}
//Дпугой способ заключается в использовании функции, такой как Array.isArray:
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    //Здесь 'x' - это 'string[]'
    console.log("Привет " + x.join(" и"));
  } else {
    //Здесь 'x' - 'string'
    console.log("Добро пожаловать " + x);
  }
}
//Если каждый член объединения иммет общее свойство, необходимость в сужении отсутствует:
function getFirstTree(x: string[] | string) {
  return x.slice(0, 3);
}

//============Синонимы типов (type aliases)
type Point = {
  x: number;
  y: number;
};
function getFirstTree2(pt: Point) {}
//Синонимы можно использовать не только для объектных типов,
//но и для любых других типов, нарпимер, для объединений:
type ID = number | string;

//============Интерфейся (interfaces)
interface Point2 {
  x: number;
  y: number;
}
function getFirstTree3(pt: Point2) {}
//============Разница между синонимами типов и интерфейсами
//Ключевым отличием мужду ними является то, что type не может быть повторно открыт для добавления новых свойств,
// то время как interface всегда может быть раснирен.

//Пример расширения интерфейся:
interface Animal {
  name: string;
}
interface Bear extends Animal {
  honey: boolean;
}

//Пример расширения типа с помощью пересечения (intersection)
type Animal2 = {
  name: string;
};
type Bear2 = Animal & {
  honey: boolean;
};
let bear: Bear2;

//Пример добавления новых полей в существующий интерфейс
interface Window {
  title: string;
}
interface Window {
  title2: number;
}
//Тип не может быть изменен после создания
type Window2 = {
  title: string;
};
type Window2 = {
  title2: number;
};
//ОБЩЕЕ ПРАВИЛО: ИСПОЛЬЗУЙТЕ INTERFACE ДО ТЕХ ПОР,
//ПОКА ВАМ НЕ ПОНАДОБИТЬСЯ ВОЗМОЖНОСТИ TYPE

// /!!!!!!!РАЗОБРАТЬ ДОПОЛНИТЕЛЬНО
//============Утверждение типа(type assertion)
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
//для утверждения можно использовать другой синтаксис(е в TSX-файлах)
const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");
const a = expr as any as T;

//============Литеральные типы(literal types)
//в дополнении к общим типам, мы можем ссылаться на конкретные строки и числа,
// находящиеся на определенных пощициях
let x: "hello" = "hello";
x = "someText";
//Комбинация литералов с объединениями позволяет создавать более полезные вещи,
//например, функцию, принимабщую только набор известных значений:
function printText(s: string, alignment: "left" | "right" | "center") {}
printText("Hello world", "left");
printText("G day", "center");
//
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
//
interface Options {
  width: number;
}
function configure(x: Options | "auto") {}
configure({ width: 100 });

//============Предположения типов литералов
//При инициализации переменной с помощью объекта, TS будет исходить из предположения о том,
//что значения свойств объекта в будущем могут измениться.
//Например, если мы напишем такой код:
const obj = { counter: 0 };
if (true) {
  obj.counter = 1;
}
//TS не будет считать присвоение значения 1 полю, которое раньше имело значение 0, ошибкой.
//Это объясняется тем, что TS считает, что типов obj.counter является umber, а не 0.

//Существует 2 способа решить эту проблему:
//1)Можно утвердить тип на каждой позиции:
const objName = { name: "Jackson" as "Jackson" };
if (true) {
  objName.name = "Jackson";
}
// /!!!!!!!РАЗОБРАТЬ ДОПОЛНИТЕЛЬНО https://habr.com/ru/company/ruvds/blog/493716/
//2)Для образования объекта в литерал можно использовать 'as const':
//onst assertions (константное утверждение) и предусматривает применение конструкции as const. Вот как выглядит её использование:
let fruit = "Banana" as const;
//Теперь fruit — это строковой литерал. Конструкция as const оказывается удобной ещё и тогда, когда некую сущность нужно сделать иммутабельной.

//Для того чтобы система воспринимала бы этот объект как иммутабельный, можно воспользоваться конструкцией as const:
const user = {
  name: "John",
  role: "admin",
} as const;
//Теперь типы изменились. Строки стали строковыми литералами, а не обычными строками.
// Но изменилось не только это. Теперь свойства предназначены только для чтения:

//============Оператор утверждения ненулевого значения(non-null assertion operator)

//TS предоставляет специальный синтаксис для удаления null и undefined из типа без необходимости выполнения явной проверки.
// Указание ! после выражения означает, что данное выражение не может быть нулевым, т.е. иметь значение null или undefined:
function liveDangerously(x?: number | undefined) {
  // Ошибки не возникает
  console.log(x!.toFixed());
}

//============Перечисления (enums)

//Перечисления позволяют описывать значение, которое может быть одной из набора
//именованных констант. Использовать перечисления не рекомендуется.
enum Season {
  Winter = "Зима",
  Spring = "Весна",
  Summer = "Лето",
  Autumn = "Осень"
};

//============Редко используемые примитивы

//Данный примитив используется для представления очень больших целых чисел BigInt:
const oneHundred: bigint = BigInt(100)

//symbol Данный примитив используется для создания глобально уникальных ссылок с помощью функции Symbol():
const firstName = Symbol('name')

