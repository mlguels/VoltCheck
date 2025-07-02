package tests

import (
	"fmt"
	"voltcheck/mocks"
)

type VoltageTest struct {
	Sensor mocks.VoltageSensor
}

func (v VoltageTest) Run() string {
	voltage := v.Sensor.ReadVoltage()
	if voltage > 115.0 {
		return fmt.Sprintf("FAIL: %.2fV too high", voltage)
	}
	return fmt.Sprintf("PASS: %2fV within range", voltage)
}