package runner

import (
	"fmt"
	"strings"
	"voltcheck/mocks"
	"voltcheck/tests"
)


func RunAll() {
	fmt.Println("Running VoltCheck Tests (Concurrent)...")

	// Channel to collect results
	results := make(chan string, 2) 
	passCount := 0
	failCount := 0

	// Launch ThermalTest in a goroutine
	go func() {
		thermal := tests.ThermalTest{Sensor: mocks.MockThermalSensor{}}
		results <- "ThermalTest: " + thermal.Run()
	}()

	// Launch VoltageTest in another goroutine
	go func() {
		voltage := tests.VoltageTest{Sensor: mocks.MockVoltageSensor{}}
		results <- "VoltageTest: " + voltage.Run()
	}()

	// Collect and print results from both tests
	for i := 0; i < 2; i++ {
		result := <-results
		fmt.Println("🔎", result)

		// Check for passing / failing tests
		if strings.Contains(result, "PASS") {
			passCount++
		} else {
			failCount++
		}
	}

	fmt.Printf("\n✅ %d Passed | ❌ %d Failed\n", passCount, failCount)
}