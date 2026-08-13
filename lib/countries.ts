export interface CountryConfig {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  minLength: number;
  maxLength: number;
  placeholder: string;
}

export const COUNTRIES: CountryConfig[] = [
  {
    code: "IN",
    name: "India",
    dialCode: "+91",
    flag: "🇮🇳",
    minLength: 10,
    maxLength: 10,
    placeholder: "XXXXX XXXXX",
  },
  {
    code: "GB",
    name: "United Kingdom",
    dialCode: "+44",
    flag: "🇬🇧",
    minLength: 10,
    maxLength: 10,
    placeholder: "7911 123456",
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    dialCode: "+971",
    flag: "🇦🇪",
    minLength: 9,
    maxLength: 9,
    placeholder: "50 123 4567",
  },
  {
    code: "US",
    name: "United States",
    dialCode: "+1",
    flag: "🇺🇸",
    minLength: 10,
    maxLength: 10,
    placeholder: "202 555 0123",
  },
  {
    code: "SG",
    name: "Singapore",
    dialCode: "+65",
    flag: "🇸🇬",
    minLength: 8,
    maxLength: 8,
    placeholder: "8123 4567",
  },
  {
    code: "AU",
    name: "Australia",
    dialCode: "+61",
    flag: "🇦🇺",
    minLength: 9,
    maxLength: 9,
    placeholder: "412 345 678",
  },
  {
    code: "MY",
    name: "Malaysia",
    dialCode: "+60",
    flag: "🇲🇾",
    minLength: 9,
    maxLength: 10,
    placeholder: "12 345 6789",
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    dialCode: "+966",
    flag: "🇸🇦",
    minLength: 9,
    maxLength: 9,
    placeholder: "50 123 4567",
  },
  {
    code: "DE",
    name: "Germany",
    dialCode: "+49",
    flag: "🇩🇪",
    minLength: 10,
    maxLength: 11,
    placeholder: "151 23456789",
  },
  {
    code: "QA",
    name: "Qatar",
    dialCode: "+974",
    flag: "🇶🇦",
    minLength: 8,
    maxLength: 8,
    placeholder: "3312 3456",
  },
  {
    code: "KW",
    name: "Kuwait",
    dialCode: "+965",
    flag: "🇰🇼",
    minLength: 8,
    maxLength: 8,
    placeholder: "9123 4567",
  },
  {
    code: "OM",
    name: "Oman",
    dialCode: "+968",
    flag: "🇴🇲",
    minLength: 8,
    maxLength: 8,
    placeholder: "9123 4567",
  },
  {
    code: "BH",
    name: "Bahrain",
    dialCode: "+973",
    flag: "🇧🇭",
    minLength: 8,
    maxLength: 8,
    placeholder: "3912 3456",
  },
  {
    code: "LK",
    name: "Sri Lanka",
    dialCode: "+94",
    flag: "🇱🇰",
    minLength: 9,
    maxLength: 9,
    placeholder: "71 234 5678",
  },
  {
    code: "CA",
    name: "Canada",
    dialCode: "+1",
    flag: "🇨🇦",
    minLength: 10,
    maxLength: 10,
    placeholder: "416 555 0123",
  },
  {
    code: "NZ",
    name: "New Zealand",
    dialCode: "+64",
    flag: "🇳🇿",
    minLength: 9,
    maxLength: 9,
    placeholder: "21 123 4567",
  },
  {
    code: "FR",
    name: "France",
    dialCode: "+33",
    flag: "🇫🇷",
    minLength: 9,
    maxLength: 9,
    placeholder: "6 12 34 56 78",
  },
];

export const DEFAULT_COUNTRY = COUNTRIES[0]; // India (+91)

export function getCountryByCode(code: string): CountryConfig {
  return COUNTRIES.find((c) => c.code === code) || DEFAULT_COUNTRY;
}

export function getCountryByDialCode(dialCode: string): CountryConfig {
  return COUNTRIES.find((c) => c.dialCode === dialCode) || DEFAULT_COUNTRY;
}
