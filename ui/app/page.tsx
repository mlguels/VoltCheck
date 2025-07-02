'use client';

import { useState } from 'react';

export default function Home() {
  const [thermalMax, setThermalMax] = useState(30);
  const [voltageMax, setVoltageMax] = useState(115);
  const [results, setResults] = useState<string[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[][]>([]);

  const parseResult = (raw: string) => {
    const lines = raw.split('\n');
    const testLines = lines.filter((line) => line.includes('Test:'));
    const summaryLine = lines.find((line) => line.includes('Passed'));
    setResults(testLines);
    setSummary(summaryLine || null);
    setHistory((prev) => [...prev, testLines]);
  };

  const runDefaultTests = async () => {
    setLoading(true);
    setResults([]);
    setSummary(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/run-tests`);
      const data = await res.json();
      parseResult(data.result);
    } catch (err) {
      setResults(['⚠️ Failed to fetch default test results']);
    }

    setLoading(false);
  };

  const runCustomTests = async () => {
    setLoading(true);
    setResults([]);
    setSummary(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/run-custom`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thermalMax, voltageMax }),
      });

      const data = await res.json();
      parseResult(data.result);
    } catch (err) {
      setResults(['⚠️ Failed to fetch custom test results']);
    }

    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 space-y-6 bg-gray-50">
      <h1 className="text-3xl font-bold">⚡ VoltCheck Dashboard</h1>

      <div className="flex space-x-4">
        <button
          onClick={runDefaultTests}
          disabled={loading}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? 'Running...' : 'Run Default Tests'}
        </button>

        <button
          onClick={runCustomTests}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Running...' : 'Run Custom Tests'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Thermal Limit (°C)
          </label>
          <input
            type="number"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={thermalMax}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setThermalMax(isNaN(value) ? 0 : value);
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Voltage Limit (V)
          </label>
          <input
            type="number"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={voltageMax}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setVoltageMax(isNaN(value) ? 0 : value);
            }}
          />
        </div>
      </div>

      {results.length > 0 && (
        <div className="w-full max-w-xl mt-6 space-y-4">
          {results.map((line, i) => {
            const isPass = line.includes('PASS');
            return (
              <div
                key={i}
                className={`flex items-center justify-between p-4 rounded border ${
                  isPass
                    ? 'bg-green-50 border-green-400'
                    : 'bg-red-50 border-red-400'
                }`}
              >
                <span className="font-mono">{line.split(':')[0]}</span>
                <span className="text-lg">
                  {isPass ? '✅' : '❌'}{' '}
                  {line.split(':').slice(1).join(':').trim()}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {history.length > 0 && (
        <div className="w-full max-w-xl mt-10">
          <h2 className="text-lg font-semibold mb-2">Previous Results</h2>
          {history.map((resultBlock, i) => (
            <div key={i} className="mb-4 border rounded p-4 bg-white shadow-sm">
              <p className="text-sm text-gray-500 mb-2">Run #{i + 1}</p>
              {resultBlock.map((line, j) => {
                const isPass = line.includes('PASS');
                return (
                  <div
                    key={j}
                    className={`flex justify-between border-b py-1 ${
                      isPass ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    <span className="font-mono">{line.split(':')[0]}</span>
                    <span>{line.split(':').slice(1).join(':').trim()}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {summary && (
        <div className="mt-4 font-semibold text-gray-800 text-xl">
          {summary}
        </div>
      )}
    </main>
  );
}
