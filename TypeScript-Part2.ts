// СУЖЕНИЕ ТИПОВ

//============Сужение типов
function padLeft(padding: number | string, input: string) {
  return new Array(padding + 1).join(" ") + input;
  //Получаем ошибку о том, что добавление number к number| string
  //может привести к неожиданному результату, и он прав. Другими словами, мы должны проверить тип padding
  //перед выполнением каких-либо операций с ним:
}

function padLeft2(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return new Array(padding + 1).join(" ") + input;
  }
  return padding + input;
}
//выражение typeof padding ==='number' называется защитником или предохранителем типа (type guard)
//А процесс приведения определенного типа к более конкретной версии с помощтб защитников
//типа и присвоений называется сужением типа (narrowing)

//============Защитник типа typeof

// * string
// * number
// * bigint
// * boolean
// * symbol
// * undefined
// * object
// * function

function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (const key of strs) {
      //Oject is possibly 'null'
      //Потенциальнымс значением объекта является 'null'
      console.log(key);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    console.log("End");
  }
}
//Переписываем с использованием оператора равенства
function printAll1(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === "object") {
      for (const key of strs) {
        //Oject is possibly 'null'
        //Потенциальнымс значением объекта является 'null'
        console.log(key);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    } else {
      console.log("End");
    }
  }
}
//В JS конструкции if преобразуют условия в логические значения. Значения:
//0, Nan,"", 0n(bigint-версия нуля), null, undefined все преобразуется в false

function printAll2(strs: string | string[] | null) {
  //Теперь ошибки не возникает , поскольку мы проверяем, что strs является истинным. Это защищает нас.
  //if(true && typeof strs === "object"), а если было бы ull то
  //if(false && typeof strs === "object") и выражение уже бы не прошло
  if (strs && typeof strs === "object") {
    for (const key of strs) {
      console.log(key);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    console.log("End");
  }
}

//Рассмотрим пример использования логического оператора "НЕ"
function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((x) => x * factor);
  }
}

//По историческим причинам typeof(null) возращает Объект
//Таким образом, в приведенном примере мы выполнили сужение к string[] | null вместо желаемого string[]

//============Проверка на истинность (truthiness narrowing)
function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `В сети находится ${numUsersOnline} человек!`;
  }
  return "Здесь никого нету:(";
}

//ДВОЙНОЕ ОТРИЦАНИЕ !!
//Допустим у вас есть функция, которая возвращает какой-то результат: строку,
// число, объект и т.д. А вам необходимо получить от этой функции true или false.
// Вот два записанных подряд оператора ! и делают именно это.
//Если функция вернёт строку, отличное от 0 число, объект, массив — в общем любое правдивое значение,
// то выражение !! превратит его в true, в противном случае вы получите false.
function getText(el: string): boolean {
  return !!el;
}
getText("some text");
//return true

//============Проверка на равенство (equality narrowing)
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    //Теперь вы можите вызвать любой тсроковый метод
    x.toUpperCase();
  } else {
    //....
  }
}
//когда сравниваем 'x'=== 'y' TS знает что их единственный общий тип string

//Выражения с ==null проверяет на равенство не тольско с null, но и с undefined.
//Аналогично выражение ==undefined проверяет на равенство не только с undefined, но и с null
interface Container {
  value: number | null | undefined;
}
function miltiplyValue(container: Container, factor: number) {
  //удаляем 'null', 'undefined' из типа
  if (container.value != null) {
    //(property) container.value:number
    console.log(container.value);
    //теперь спокойно можем умнажать
    container.value *= factor;
  }
}

//============Сужение типов с помощью оператора in
//В JS существует оператор для определения наличия указанного свойства в объекте — оператор in.
//TS позволяет использовать данный оператор для сужения потенциальных типов.
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal;
    //(parameter) animal: Fish | Human
  } else {
    animal;
    //(parameter) animal: Bird | Human
  }
}

//============Сужение типов с помощью оператора instanceof

//Оператор instanceof используется для определения того, является ли одна сущность "экземпляром" другой.
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
    // (parameter) x: Date
  } else {
    console.log(x.toUpperCase());
    // (parameter) x: string
  }
}

//============Анализ потока управления (control flow analysis)
//При анализе переменной поток управления может разделяться
// и объединяться снова и снова, поэтому переменная может иметь разные типы в разных участках кода.
function exemple() {
  let x: number | string | boolean;
  x = Math.random() < 0.5;
  //x:boolean
  if (Math.random() < 0.5) {
    x = "hello";
    //x:string
  } else {
    x = 100;
    //x:number
  }
}


//============Использование предикатов типа (type predicates)
//Для определения пользовательского защитника типа необходимо определить функцию, возвращаемым значением которой является предикат типа:
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
 }
 //pet is Fish — это наш предикат. Предикат имеет форму parameterName is Type,
 // где parameterName — это название параметра из сигнатуры текущей функции.
 const pet = getSmallPet()
const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()]
const underWater1: Fish[] = zoo.filter(isFish)
// или
const underWater2: Fish[] = zoo.filter(isFish) as Fish[]
//Мы можем использовать защитника isFish для фильтрации массива Fish | Bird и получения массива Fish:
// В более сложных случаях, может потребоваться повторное использование предиката
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
 if (pet.name === 'sharkey') return false
 return isFish(pet)
})

//============Тип never

//Для представления состояния, которого не должно существовать, в TS используется тип never