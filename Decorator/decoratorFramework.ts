function Component(template: string, selector: string) {
  return function(constructor: { new(...args: any[]): {name: string} }) {
    const mountedElement = document.querySelector(selector);
    const instance = new constructor('huga', 'hoga');
    if(mountedElement) {
      mountedElement.innerHTML = template;
      mountedElement.querySelector('h1')!.textContent = instance.name;
    }
  }
}

function LoggingAct(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}

@LoggingAct
@Component('<h1>{{ name }}</h1>', '#app') 
class UserC {
  name = 'Quill';
  constructor() {
    console.log('User was created.')
  }
}

const foo = new UserC();
const bar = new UserC();
const baz = new UserC();
