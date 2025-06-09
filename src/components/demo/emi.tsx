import { useState } from "react";

interface EMI {
  asset: number;
  interestRate: number;
  ProcessFee: number;
  downPayment: number;
  loanPerMonth: number;
  emiDuration: number;
}

const defaultEMI: EMI = {
  asset: 1000000,
  interestRate: 10,
  ProcessFee: 2000,
  downPayment: 200000,
  loanPerMonth: 0,
  emiDuration: 12,
};

function calculateEMI({
  asset,
  interestRate,
  downPayment,
  emiDuration,
}: EMI): number {
  const loanAmount = asset - downPayment;
  const monthlyInterestRate = interestRate / 12 / 100;
  const emi =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, emiDuration)) /
    (Math.pow(1 + monthlyInterestRate, emiDuration) - 1);

  return isFinite(emi) ? Math.round(emi) : 0;
}

export const EMICalcuLator = () => {
  const [form, setForm] = useState<EMI>({
    ...defaultEMI,
    loanPerMonth: calculateEMI(defaultEMI),
  });

  const updateForm = (field: keyof EMI, value: number) => {
    const newForm = { ...form, [field]: value };
    newForm.loanPerMonth = calculateEMI(newForm);
    setForm(newForm);
  };

  return (
    <div className="bg-white shadow-xl p-8 rounded-2xl flex flex-col gap-6 w-full max-w-xl m-auto mt-20">
      <h2 className="text-2xl font-bold text-center text-blue-600">
        💰 EMI Calculator
      </h2>

      {/* Asset */}
      <div className="flex flex-col gap-1">
        <label htmlFor="asset" className="font-medium text-gray-700">
          Total Cost of Asset
        </label>
        <input
          type="number"
          name="asset"
          value={form.asset}
          onChange={(e) => updateForm("asset", Number(e.target.value))}
          className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Interest Rate */}
      <div className="flex flex-col gap-1">
        <label htmlFor="interestRate" className="font-medium text-gray-700">
          Interest Rate (%)
        </label>
        <input
          type="number"
          name="interestRate"
          value={form.interestRate}
          onChange={(e) => updateForm("interestRate", Number(e.target.value))}
          className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Processing Fee */}
      <div className="flex flex-col gap-1">
        <label htmlFor="ProcessFee" className="font-medium text-gray-700">
          Processing Fee
        </label>
        <input
          type="number"
          name="ProcessFee"
          value={form.ProcessFee}
          onChange={(e) => updateForm("ProcessFee", Number(e.target.value))}
          className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Down Payment */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Down Payment</label>
        <p className="text-sm text-gray-500">Current: ₹{form.downPayment}</p>
        <input
          type="range"
          name="downPayment"
          min={0}
          max={form.asset}
          value={form.downPayment}
          onChange={(e) => updateForm("downPayment", Number(e.target.value))}
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-sm">
          <span>₹0</span>
          <span>₹{form.downPayment}</span>
          <span>₹{form.asset}</span>
        </div>
      </div>

      {/* Loan Per Month (Output Only) */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">
          Loan Per Month (EMI)
        </label>
        <p className="text-lg font-semibold text-blue-700">
          ₹{form.loanPerMonth}
        </p>
      </div>

      {/* EMI Duration */}
      <div className="flex justify-between gap-2 mt-4">
        {[12, 24, 36, 48].map((months) => (
          <button
            key={months}
            type="button"
            className={`px-4 py-2 rounded-lg ${
              form.emiDuration === months
                ? "bg-blue-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white transition`}
            onClick={() => updateForm("emiDuration", months)}
          >
            {months} mo
          </button>
        ))}
      </div>
    </div>
  );
};
