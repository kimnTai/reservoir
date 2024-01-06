interface volumeNumber {
  name: string;
  volumeNumber: number;
}

interface dataStructure {
  [key: string]: volumeNumber[];
}

declare namespace responseResult {
  type isLogin = boolean;
  type login = boolean;
  type logout = boolean;
  type getData = boolean;
  type showData = dataStructure | boolean;
}
