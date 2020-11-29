// interfaceはclassへ実装する際、新しいメンバーを追加できるが
// オブジェクトに適用する際は同じメンバー(プロパティ)しか定義できない。

interface Job {
  name: string;
  isOuter: boolean;
}

class Designer implements Job{
  constructor(public name: string, 
              public isOuter: boolean,
              public age: number) { }
}

const Designer2: Job = {
  name: 'Jhon',
  isOuter: true,
  //age: 30 //エラー！！ 
}

