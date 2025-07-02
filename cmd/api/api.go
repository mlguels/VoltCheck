package main

import (
	"time"
	"voltcheck/runner"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

		r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:3001", "https://volt-check.vercel.app/"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
		MaxAge: 12 * time.Hour,
	}))

	r.GET("/run-tests", func(c *gin.Context) {
		result := runner.RunAndReturnSummary(30.0, 115.0)
		c.JSON(200, gin.H{
			"result": result,
		})
	})

	r.POST("/run-custom", func(c *gin.Context) {
		var config struct {
			ThermalMax float64 `json:"thermalMax"`
			VoltageMax float64 `json:"voltageMax"`
		}

		if err := c.ShouldBindJSON(&config); err != nil {
			c.JSON(400, gin.H{"error": "invalid JSON config"})
			return
		}

		result := runner.RunAndReturnSummary(config.ThermalMax, config.VoltageMax)
		c.JSON(200, gin.H{"result": result})
	})

	r.Run(":8080")
}