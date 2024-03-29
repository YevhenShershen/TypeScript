//МАНИПУЛЯЦИИ С ТИПАМИ

//Дженерики
function identity(arg: number): number {
  return arg
 }
//Нам нужен какой-то способ перехватывать тип аргумента для обозначения с его помощью типа возвращаемого значения.
// Для этого мы можем воспользоваться переменной типа, специальным видом переменных,
//которые работают с типами, а не со значениями:
 function identity2<Type>(arg: Type): Type {
  return arg
 }

//Мы используем переменную Type как для типа передаваемого функции аргумента, так и для типа возвращаемого функцией значения.
//Такие функции называют общими (дженериками), поскольку они могут работать с любыми типами.
//Мы можем вызывать такие функции двумя способами. Первый способ заключается в передаче всех аргументов, включая аргумент типа:


//========Работа с переменными типа в дженериках
//Что если мы захотим выводить в консоль длину аргумента arg перед его возвращением?
//Изменим сигнатуру функции таким образом, чтобы она работала с массивом Type:
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length)
  return arg
 }
 //Мы можем сделать тоже самое с помощью такого синтаксиса:
function loggingIdentity1<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length)
  return arg
 }

 //========Общие типы

 function identitY<Type>(arg: Type): Type {
  return arg
 }

 const myIdentity: <Input>(arg: Input) => Input = identitY
 //Объектный литерал – это список разделенных запятыми свойств (пар «имя: значение»), заключенный в фигурные скобки {} .
 // Имя свойства отделяется от значения двоеточием. Именем свойства может быть идентификатор или строковый литерал (допускается использовать пустую строку).

 //Мы также можем создавать общие типы в виде сигнатуры вызова типа объектного литерала:
 function identity1<Type>(arg: Type): Type {
  return arg
 }

 const myIdentity1: { <Type>(arg: Type): Type } = identity1
//Для того, чтобы сделать общий параметр видимым для всех членов интерфейса,
// его необходимо указать после названия интерфейса:
 interface GenericIdentityFn<Type> {
  (arg: Type): Type
 }

 function identity3<Type>(arg: Type): Type {
  return arg
 }

 const myIdentity3: GenericIdentityFn<number> = identity3
 //Обратите внимание, что общие перечисления (enums) и пространства имен (namespaces) создавать нельзя.

 //======Общие классы
 //Общий класс имеет такую же форму, что и общий интерфейс:
 class GenericNumber<NumType> {
  zeroValue: NumType
  add: (x: NumType, y: NumType) => NumType
 }

 const myGenericNum = new GenericNumber<number>()
 myGenericNum.zeroValue = 0
 myGenericNum.add = (x, y) => x + y

 //==============Ограничения дженериков

 //Иногда возникает необходимость в создании дженерика, работающего с набором типов,
 // когда мы имеем некоторую информацию о возможностях, которыми будет обладать этот набор.

 //Мы хотим, чтобы функция работала с любым типом, у которого имеется свойство length.
 //Для этого мы должны создать ограничение типа.
//Нам необходимо создать интерфейс, описывающий ограничение.
// В следующем примере мы создаем интерфейс с единственным
// свойством length и используем его с помощью ключевого слова extends для применения органичения:

interface Lengthwise {
  length: number
 }

 function loggingIdentity3<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length)
  // Теперь мы можем быть увереными в существовании свойства `length`
  return arg
 }
 //Поскольку дженерик был ограничен, он больше не может работать с любым типом:

 //============Использование типов параметров в ограничениях дженериков
 //Мы можем определять типы параметров, ограниченные другими типами параметров.
 // В следующем примере мы хотим получать свойства объекта по их названиям. При этом, мы хотим быть уверенными в том,
 // что не извлекаем несуществующих свойств. Поэтому мы помещаем ограничение между двумя типами:
 function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
 }


 //====Использование типов класса в дженериках
 //При создании фабричных функций с помощью дженериков, необходимо ссылаться на типы классов через их функции-конструкторы.
 //Данный подход часто используется в миксинах или примесях.

 //=========Оператор типа keyof
 //Оператор keyof "берет" объектный тип и возвращает строковое или числовое литеральное объединение его ключей:
 type Arrayish = { [n: number]: unknown }
type A = keyof Arrayish
 // type A = number

type Mapish = { [k: string]: boolean }
type M = keyof Mapish
 // type M = string | number

//Обратите внимание, что типом M является string | number.
//Это объясняется тем, что ключи объекта в JS всегда преобразуются в строку, поэтому obj[0] — это всегда тоже самое, что obj['0'].

//==========Оператор типа typeof
//В TS оператор typeof используется в контексте типа для ссылки на тип переменной или свойства:

//=========Типы доступа по индексу (indexed access types)
//Индексированный тип — это обычный тип, так что мы можем использовать объединения, keyof и другие типы:

type Person33 = { age: number, name: string, alive: boolean }

type I1 = Person33['age' | 'name']
 // type I1 = string | number

type I2 = Person33[keyof Person]
 // type I2 = string | number | boolean

type AliveOrName = 'alive' | 'name'
type I3 = Person33[AliveOrName]
 // type I3 = string | boolean