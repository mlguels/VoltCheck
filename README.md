# ⚡ VoltCheck

VoltCheck is a hardware test framework built in Go, with a web-based dashboard built in Next.js + Tailwind CSS.

Originally inspired by real-world test automation systems like those used in power electronics and manufacturing environments (e.g. Amperesand), VoltCheck simulates test modules such as thermal and voltage sensors, executes them concurrently, and provides results via both CLI and a web API.

---

## 📦 Tech Stack

- **Go** – backend test engine
- **Gin** – REST API for running tests remotely
- **Next.js (TypeScript)** – frontend dashboard
- **Tailwind CSS** – responsive styling
- **Goroutines & Channels** – concurrency in Go

---

## 🧪 Features

- 🧩 Pluggable test modules (e.g., ThermalTest, VoltageTest)
- 🧪 Sensor simulation using interfaces + mocking
- ⚙️ CLI mode: run tests from terminal
- 🌐 REST API: `GET /run-tests`
- 🎨 Web dashboard: displays results with pass/fail badges
- ✅ Summary statistics (e.g. `1 Passed | 1 Failed`)
- 🧵 Concurrent test execution using Go routines

---

🧠 Learnings

- Go interfaces and dependency injection
- Goroutines & channels for concurrency
- CORS handling between Go and Next.js
- Monorepo-style structure for full-stack apps

🌱 Future Ideas

- Add more test types (e.g., humidity, power loss)
- Store historical test results
- Test against real hardware using GPIO or microcontroller input
- Add authentication to restrict who can run tests
- Auto-run tests on a schedule or based on device triggers
