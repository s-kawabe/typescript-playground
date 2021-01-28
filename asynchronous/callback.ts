// コールバックでの非同期通信の記述 (※非推奨)
export default function callbackSample() {
  const url = 'https://api.github.com/users/s-kawabe/orgs';

  // コールバックで呼び出す非同期処理
  const fetchProfile = () => {
    // fetchメソッドは非同期処理になる
    fetch(url)
      .then((res) => {
        // jsonメソッドも非同期処理
        res.json()
          .then((json) => {
            console.log('Asynchronous Callback Sample 1:', json)
            return json
          })
          .catch((error) => {
            console.error(error)
          })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const profile = fetchProfile();
  console.log('Asynchronous Callback Sample 2:', profile)
}