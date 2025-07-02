package tests

import (
	"fmt"
	"voltcheck/mocks"
)

type ThermalTest struct {
	Sensor mocks.TemperatureSensor
	MaxAllowed float64
}

func (t ThermalTest) Run() string {
	temp := t.Sensor.ReadTemperature()
	if temp > t.MaxAllowed {
		return fmt.Sprintf("FAIL: %.2f°C exceeds %.2f°C", temp, t.MaxAllowed)
	}
	return fmt.Sprintf("PASS: %.2f°C within limit %.2f°C", temp, t.MaxAllowed)
}