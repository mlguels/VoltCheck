package mocks

import "math/rand"

type TemperatureSensor interface {
	ReadTemperature() float64
}

type MockThermalSensor struct{}

func (m MockThermalSensor) ReadTemperature() float64 {
	return 20.0 + rand.Float64()*10.0
}