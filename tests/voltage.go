package tests

import (
	"fmt"
	"voltcheck/mocks"
)

type VoltageTest struct {
	Sensor mocks.VoltageSensor
	MaxAllowed float64
}

func (v VoltageTest) Run() string {
	voltage := v.Sensor.ReadVoltage()
	if voltage > v.MaxAllowed {
		return fmt.Sprintf("FAIL: %.2fV exceeds %.2fV", voltage, v.MaxAllowed)
	}
	return fmt.Sprintf("PASS: %.2fV within limit %.2fV", voltage, v.MaxAllowed)
}