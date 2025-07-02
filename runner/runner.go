package runner

import (
	"fmt"
	"voltcheck/mocks"
	"voltcheck/tests"
)


func RunAll() {
	fmt.Println("Running VoltCheck Tests (Concurrent)...")

	// Channel to collect results
	results := make(chan string, 2) 

	// Launch ThermalTest inm a goroutine
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
		fmt.Println(<-results)
	}
}