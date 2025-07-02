package runner

import (
	"fmt"
	"voltcheck/mocks"
	"voltcheck/tests"
)


func RunAll() {
	thermal := tests.ThermalTest{Sensor: mocks.MockThermalSensor{}}
	result := thermal.Run()
	fmt.Println(result)
}