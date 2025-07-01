package tests

import (
	"fmt"
	"voltcheck/mocks"
)

type ThermalTest struct {
	Sensor mocks.TemperatureSensor
}

func (t ThermalTest) Run() string {
	temp := t.Sensor.ReadTemperature()
	if temp > 30.0 {
		return fmt.Sprintf("FAIL: %.2f°C exceeds limit", temp)
	}
	return fmt.Sprintf("PASS: %.2f°C within range", temp)
}