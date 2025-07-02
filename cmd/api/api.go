package main

import (
	"voltcheck/runner"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/run-tests", func(c *gin.Context) {
		result := runner.RunAndReturnSummary()
		c.JSON(200, gin.H{
			"result": result,
		})
	})

	r.Run(":8080") // Open http://localhost:8080/run-tests
}