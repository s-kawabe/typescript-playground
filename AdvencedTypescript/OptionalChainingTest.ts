interface DownloadedData {
  id: number;
  // Optional property
  user?: {
    name?: {
      first: string;
      last: string;
    }
  };
}

const downloadedData: DownloadedData = {
  id: 1
  // user: {
  //   name: {
  //     first: 'taro',
  //     last: 'tanaka'
  //   }
  // }
}

// Optional chaining★  
console.log(downloadedData.user?.name); // => undifined

// Non-null assertion operator (!)
// console.log(downloadedData.user!.name);


