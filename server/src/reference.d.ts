interface volumeNumber {
  name: string;
  volumeNumber: number;
}

interface dataStructure {
  [key: string]: volumeNumber[];
}

interface responseResult {
  showData: dataStructure | boolean;
}

interface Analyzer {
  toAnalyzer: (html: string, filePath: string) => string;
}
