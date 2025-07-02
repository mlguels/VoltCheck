package main

import (
	"voltcheck/runner"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

		r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET"},
		AllowHeaders:     []string{"Origin"},
		AllowCredentials: true,
	}))

	r.GET("/run-tests", func(c *gin.Context) {
		result := runner.RunAndReturnSummary()
		c.JSON(200, gin.H{
			"result": result,
		})
	})

	r.Run(":8080") // Open http://localhost:8080/run-tests
}