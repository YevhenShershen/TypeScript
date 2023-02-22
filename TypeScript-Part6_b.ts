//============КЛАССЫ (Part-2)

//========Наследование встроенных типов
//Пример - Error является втсроенным типом
class MsgError extends Error {
  constructor(m: string) {
    super(m);

    // Явно устанавливаем прототип

    Object.setPrototypeOf(this, MsgError.prototype);
  }

  sayHello() {
    return "Привет " + this.message;
  }
}

//=========Видимость членов (member visibility)
//public -По умолчанию видимость членов класса имеет значение public. Публичный член доступен везде:
//protected -Защищенные члены видимы только для подклассов класса, в котором они определены.

//====Раскрытие защищенных членов
class Base {
  protected m = 10;
}
class Derived extends Base {
  // Модификатор отсутствует, поэтому значением по умолчанию является `public`
  m = 15;
}
const d = new Derived();
console.log(d.m); // 15

//private -Частные члены похожи на защищенные, но не доступны даже в подклассах, т.е. они доступны только в том классе, где они определены.
//Поскольку частные члены невидимы для производных классов, производный класс не может изменять их видимость:

//====Доступ к защищенным членам между экземплярами
//Разные языки ООП также по-разному подходят к предоставлению доступа экземплярам одного класса к защищенным членам друг друга.
class A {
  private x = 10;
  public sameAs(other: A) {
    // Ошибки не возникает
    return other.x === this.x;
  }
}

//==========Статические члены (static members)
//В классах могут определеяться статические члены. Такие члены не связаны с конкретными экземплярами класса.
//Они доступны через объект конструктора класса:
class MyClass {
  static x = 0;
  static printX() {
    console.log(MyClass.x);
  }
}
console.log(MyClass.x);
MyClass.printX();
//К статическим членам также могут применяться модификаторы public, protected и private
//  private static x = 0

//================Общие классы (generic classes)

//Классы, подобно интерфейсам, могут быть общими. Когда общий класс инстанцируется с помощью new,
// его параметры типа предполагаются точно также, как и при вызове функции:
class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}
const b = new Box("Привет!");
// const b: Box<string>

//ДОРАЗОБРАТЬ!!!!!!!!!!!!!!!!!
//===============Типы this

//В классах специальный тип this динамически ссылается на тип текущего класса:
class Box3 {
  contents: string = "";
  set(value: string) {
    // (method) Box.set(value: string): this
    this.contents = value;
    return this;
  }
}

//==========Свойства параметров
//TS предоставляет специальный синтаксис для преобразования параметров конструктора
// в свойства класса с аналогичными названиями и значениями. Это называется свойствами
//параметров (или параметризованными свойствами), такие свойства создаются с помощью
//добавления модификаторов public, private, protected или readonly к аргументам конструктора.
//Создаваемые поля получают те же модификаторы:
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // ...
  }
}
const a = new Params(1, 2, 3);
console.log(a.x);
// (property) Params.x: number
console.log(a.z);
// Property 'z' is private and only accessible within class 'Params'.

//======Выражения классов (class expressions)
//Выражения классов похожи на определения классов. Единственным
//отличием между ними является то, что выражения классов не нуждаются
//в названии, мы можем ссылаться на них с помощью любого идентификатора, к которому они привязаны (bound):
const someClass = class<Type> {
  content: Type;
  constructor(value: Type) {
    this.content = value;
  }
};
const m = new someClass("Привет, народ!");
// const m: someClass<string>

//==============Абстрактные классы и члены
//Классы, методы и поля в TS могут быть абстрактными.
//Абстрактным называется метод или поле, которые не имеют реализации.
// Такие методы и поля должны находится внутри абстрактного класса, который не может инстанцироваться напрямую.
//Абстрактные классы выступают в роли базовых классов для подклассов, которые реализуют абстрактных членов.
// При отсутствии абстрактных членов класс считается конкретным (concrete).
abstract class Base123 {
  abstract getName(): string;

  printName() {
    console.log("Привет, " + this.getName());
  }
}

//Отношения между классами

//В большинстве случаев классы в TS сравниваются структурно, подобно другим типам.
class Point1 {
  x = 0;
  y = 0;
}
class Point2 {
  x = 0;
  y = 0;
}
// OK
const p: Point1 = new Point2();
//Также существуют отношения между подтипами, даже при отсутствии явного наследования:
class Person {
  name: string;
  age: number;
}

class Employee {
  name: string;
  age: number;
  salary: number;
}
// OK
const p2: Person = new Employee();
