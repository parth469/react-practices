import { useState } from "react";

const PASSWORD_CHARSETS = {
  capitalLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  smallLetters: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  specialSymbols: "!@#$%^&*()-_=+[]{};:,.<>?/\\|~`",
};

interface Combination {
  capital: boolean;
  small: boolean;
  numbers: boolean;
  specialSymbols: boolean;
  passwordLength: number;
}

const defultCombination = {
  capital: false,
  small: false,
  numbers: false,
  specialSymbols: false,
  passwordLength: 8,
};

export const PasswordGen = () => {
  const [password, setPassword] = useState<string>("");
  const [combination, setCombination] =
    useState<Combination>(defultCombination);

  const generatePassword = () => {
    let passwordChar = "";

    if (combination.capital) passwordChar += PASSWORD_CHARSETS.capitalLetters;
    if (combination.small) passwordChar += PASSWORD_CHARSETS.smallLetters;
    if (combination.specialSymbols)
      passwordChar += PASSWORD_CHARSETS.specialSymbols;
    if (combination.numbers) passwordChar += PASSWORD_CHARSETS.numbers;

    let Passstring = "";

    for (let i = 0; i < combination.passwordLength; i++) {
      Passstring +=
        passwordChar[Math.floor(Math.random() * passwordChar.length)];
    }

    setPassword(Passstring);
  };
  return (
    <div className="bg-white shadow-xl p-8 rounded-2xl flex flex-col gap-6 w-full max-w-xl m-auto mt-20">
      <h2 className="text-2xl font-bold text-center text-blue-600">
        Password Generate
      </h2>
      {password && (
        <div className="flex justify-between">
          <p className="text-sm font-bold">{password}</p>
          <button
            className="bg-green-400 p-2"
            onClick={() => navigator.clipboard.writeText(password)}
          >
            Copy
          </button>
        </div>
      )}
      <div className="flex flex-col">
        <div>
          <div className="flex justify-between">
            <label className="font-medium text-gray-700">Password Length</label>
            {combination.passwordLength}
          </div>
          <input
            type="range"
            name="downPayment"
            min={8}
            max={100}
            defaultValue={8}
            onChange={(v) =>
              setCombination((e) => ({
                ...e,
                passwordLength: parseInt(v.target.value),
              }))
            }
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between">
            <p>8</p>
            <p>100</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="checkbox"
              onClick={() => setCombination((e) => ({ ...e, small: !e.small }))}
            />
            <label>Small Letter</label>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              onClick={() =>
                setCombination((e) => ({ ...e, capital: !e.capital }))
              }
            />
            <label>capital Letter</label>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              onClick={() =>
                setCombination((e) => ({
                  ...e,
                  specialSymbols: !e.specialSymbols,
                }))
              }
            />
            <label>special Symbols Letter</label>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              onClick={() =>
                setCombination((e) => ({ ...e, numbers: !e.numbers }))
              }
            />
            <label>Numbers Letter</label>
          </div>
        </div>
      </div>
      <button
        disabled={
          !combination.capital &&
          !combination.numbers &&
          !combination.small &&
          !combination.specialSymbols
        }
        className="bg-green-500 p-2 disabled:bg-gray-400"
        onClick={() => generatePassword()}
      >
        Generate Password
      </button>
    </div>
  );
};
