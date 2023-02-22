//МАНИПУЛЯЦИИ С ТИПАМИ

//============Условные типы (conditional types)
//Обычно, в программе нам приходится принимать решения на основе некоторых входных данных.
// В TS решения также зависят от типов передаваемых аргументов. Условные типы
//помогают описывать отношения между типами входящих и выходящих данных.
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
// type Example1 = number

type Example2 = RegExp extends Animal ? number : string;
// type Example2 = string

//Условные типы имеют форму, схожую с условными выражениями в JS (условие ? истинноеВыражение : ложноеВыражение).
//SomeType extends OtherType ? TrueType : FalseType
//Когда тип слева от extends может быть присвоен типу справа от extends, мы получаем тип из первой ветки
// (истинной), в противном случае, мы получаем тип из второй ветки (ложной).

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
//Затем мы можем использовать данный тип для избавления от перегрузок:
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "не реализовано";
}

//==========Ограничения условных типов

type MessageOf<T> = T["message"];
// Type '"message"' cannot be used to index type 'T'.
// Тип '"message"' не может быть использован для индексации типа 'T'
//В данном случае возникает ошибка, поскольку TS не знает о существовании у T свойства message. Мы можем ограничить T, и тогда TS перестанет "жаловаться":
type MessageOf1<T extends { message: unknown }> = T["message"];
interface Email {
  message: string;
}

interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOf<Email>;
// type EmailMessageContents = string
//Но что если мы хотим, чтобы MessageOf принимал любой тип, а его "дефолтным"
// значением был тип never? Мы можем "вынести" ограничение и использовать условный тип:
type MessageOf2<T> = T extends { message: unknown } ? T["message"] : never;

//===============Внутренние типы манипуляций со строками (intrisic string manipulation types)
//Uppercase<StringType> — переводит каждый символ строки в верхний регистр
//Lowercase<StringType> — переводит каждый символ в строке в нижний регистр
//Capitilize<StringType> — переводит первый символ строки в верхний регистр
//Uncapitilize<StringType> — переводит первый символ строки в нижний регистр