package mocks

import "math/rand"

type VoltageSensor interface {
	ReadVoltage() float64
}

type MockVoltageSensor struct {}

func (v MockVoltageSensor) ReadVoltage() float64 {
	return 100.0 + rand.Float64()*20.0 // 100V-120V
}