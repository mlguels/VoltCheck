'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [summary, setSummary] = useState<string | null>(null);

  const runTests = async () => {
    setLoading(true);
    setResults([]);
    setSummary(null);

    try {
      const res = await fetch('http://localhost:8080/run-tests');
      const data = await res.json();

      const lines = data.result.split('\n');
      const testLines = lines.filter((line: string) => line.includes('Test:'));
      const summaryLine = lines.find((line: string) => line.includes('Passed'));

      setResults(testLines);
      setSummary(summaryLine || null);
    } catch (err) {
      setResults(['⚠️ Failed to fetch test results']);
    }

    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 space-y-6 bg-gray-50">
      <h1 className="text-3xl font-bold">⚡ VoltCheck Dashboard</h1>

      <button
        onClick={runTests}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Running...' : 'Run Tests'}
      </button>

      {results.length > 0 && (
        <div className="w-full max-w-xl mt-4 space-y-4">
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

      {summary && (
        <div className="mt-4 font-semibold text-gray-800 text-xl">
          {summary}
        </div>
      )}
    </main>
  );
}
