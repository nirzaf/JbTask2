export interface SalaryData {
  value: number;
  category: string;
  metadata: {
    Country: string;
    Language: string;
    Experience: string;
    Salary: string;
  };
}

export interface LanguageData {
  entries: SalaryData[];
  yGroups: string[];
  xRangeGroups: number[][];
  xRange: string[];
}

export interface CountryData {
  [language: string]: LanguageData;
}

export interface CalculatorData {
  [country: string]: CountryData;
}