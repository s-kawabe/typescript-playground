function Component(template: string, selector: string) {
  return function<T extends { new(...args: any[]): { name: string } }>(constructor: T) {
    // クラスの定義時ではなくインスタンスの生成時に実行されるデコレータ
    return class extends constructor{
      constructor(...args: any[]) {
        super(...args);
        console.log('Component');
        const mountedElement = document.querySelector(selector);
        const instance = new constructor('huga', 'hoga');
        if(mountedElement) {
        mountedElement.innerHTML = template;
        mountedElement.querySelector('h1')!.textContent = instance.name;
        }
      }
    }
  }
}

function LoggingAct(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}

// (注意)
// class → コンストラクタ関数
// 関数 → オブジェクト

// プロパティデコレータ prop=>(taeget:呼び出し元のクラスのプロトタイプ propertyKey:対象のプロパティの型)
// クラスデコレータより先に実行される！
function PropertyLogging(target: any, propertyKey: string) {
  console.log('propertyLogging!');
  console.log(target);
  console.log(propertyKey);
}

// メソッドデコレータ prop=>(taeget:呼び出し元のクラスのプロトタイプ
//                        propertyKey:対象のプロパティの型
//                        descriptor: ディスクリプタ(オブジェクト))
function MethodLogging(target: any, propertyKey: string, descriptor: PropertyDecorator) {
  console.log('MethodLogging!');
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor)
}

// デコレータの指定方法によってディスクリプタを書き換える
function enumarable(isEnumerable: boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return {
      enumerable: isEnumerable
    }
  }
}

@LoggingAct
@Component('<h1>{{ name }}</h1>', '#app') 
class UserC {
  // プロパティデコレータ
  @PropertyLogging
  name = 'Quill';
  constructor(public age: number) {
    console.log('User was created.')
  }
  @enumarable(false)
  @MethodLogging
  greeting() {
    console.log('Hello!');
  }
}

// User.prototype === user1.__proto__ => true
const foo = new UserC(30);
const bar = new UserC(40);
const baz = new UserC(60);
