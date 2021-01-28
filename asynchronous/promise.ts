export default function promiseSample() {
  const url = 'https://api.github.com/users/s-kawabe/orgs';

  type Profile = {
    login: string;
    id: number;
  }

  type FetchProfile = () => Promise<Profile | null>

  const fetchProfile: FetchProfile = () => {
    // Promiseではresolveとrejectを使う
    return new Promise((resolve, reject) => {
       // fetchメソッドは非同期処理になる
      fetch(url)
      .then((res) => {
        // jsonメソッドも非同期処理
        res.json()
          .then((json) => {
            console.log('Asynchronous Promise Sample 1:', json)
            resolve(json)
          })
          .catch((error) => {
            console.error(error)
            reject(null)
          })
      })
      .catch((error) => {
        console.error(error)
      })
    })
  }

  // Promiseを返すことがわかっている場合then,catchを使える
  fetchProfile()
    .then((profile: Profile | null) => {
      if(profile) {
        console.log('Asynchronous Promise Sample 2:', profile)
      }
    })
    .catch((error) => {

    })
}