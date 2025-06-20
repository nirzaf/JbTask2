"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info } from "lucide-react"

interface SalaryEntry {
  value: number
  category: string
  metadata: {
    Country: string
    Language: string
    Experience: string
    Salary: string
  }
}

interface LanguageData {
  entries: SalaryEntry[]
  yGroups: string[]
  xRangeGroups: number[][]
  xRange: string[]
}

interface CountryData {
  [language: string]: LanguageData
}

interface SalaryData {
  [country: string]: CountryData
}

interface SalaryStats {
  min: number
  max: number
  median: number
  q1: number
  q3: number
  count: number
}

const experienceLevels = ["<1 year", "1–2 years", "3–5 years", "6–10 years", "11–16 years", "16+ years"]

const experienceLabels: { [key: string]: string } = {
  "<1 year": "L1",
  "1–2 years": "L2",
  "3–5 years": "L3",
  "6–10 years": "L4",
  "11–16 years": "L5",
  "16+ years": "L6",
}

// Add this function before the main component
const CustomDot = (props: any) => {
  const { cx, cy } = props
  return <circle cx={cx} cy={cy} r={4} fill="#8B5CF6" />
}

const CustomLine = (props: any) => {
  const { points } = props
  if (!points || points.length < 2) return null

  const sortedPoints = points.sort((a: any, b: any) => a.x - b.x)
  const startPoint = sortedPoints[0]
  const endPoint = sortedPoints[sortedPoints.length - 1]

  return <line x1={startPoint.x} y1={startPoint.y} x2={endPoint.x} y2={endPoint.y} stroke="#8B5CF6" strokeWidth={2} />
}

export default function SalaryCalculator() {
  const [data, setData] = useState<SalaryData | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")
  const [salaryStats, setSalaryStats] = useState<{ [experience: string]: SalaryStats } | null>(null)

  useEffect(() => {
    fetch("/data/calculatorData.json")
      .then((response) => response.json())
      .then((jsonData: SalaryData) => {
        setData(jsonData)
        // Set default values
        const firstCountry = Object.keys(jsonData)[0]
        const firstLanguage = Object.keys(jsonData[firstCountry])[0]
        setSelectedCountry(firstCountry)
        setSelectedLanguage(firstLanguage)
      })
      .catch((error) => console.error("Error loading data:", error))
  }, [])

  useEffect(() => {
    if (data && selectedCountry && selectedLanguage) {
      calculateSalaryStats()
    }
  }, [data, selectedCountry, selectedLanguage])

  const calculateSalaryStats = () => {
    if (!data || !selectedCountry || !selectedLanguage) return

    const countryData = data[selectedCountry]
    if (!countryData || !countryData[selectedLanguage]) return

    const entries = countryData[selectedLanguage].entries
    const statsByExperience: { [experience: string]: SalaryStats } = {}

    experienceLevels.forEach((level) => {
      const levelEntries = entries.filter((entry) => entry.category === level)
      if (levelEntries.length > 0) {
        const values = levelEntries.map((entry) => entry.value).sort((a, b) => a - b)
        const count = values.length
        const min = values[0]
        const max = values[count - 1]
        const median =
          count % 2 === 0
            ? (values[Math.floor(count / 2) - 1] + values[Math.floor(count / 2)]) / 2
            : values[Math.floor(count / 2)]
        const q1 = values[Math.floor(count * 0.25)]
        const q3 = values[Math.floor(count * 0.75)]

        statsByExperience[level] = { min, max, median, q1, q3, count }
      }
    })

    setSalaryStats(statsByExperience)
  }

  const getCountries = () => {
    return data ? Object.keys(data).sort() : []
  }

  const getLanguages = () => {
    if (!data || !selectedCountry) return []
    return Object.keys(data[selectedCountry]).sort()
  }

  const getMaxSalary = () => {
    if (!salaryStats) return 100
    const maxValues = Object.values(salaryStats).map((stats) => stats.max)
    return Math.max(...maxValues, 100)
  }

  const formatSalary = (value: number) => {
    if (value >= 1000) {
      return `$${Math.round(value)}K`
    }
    return `$${value}K`
  }

  const getDisplayLanguage = (language: string) => {
    return language.replace(" / ", " / ")
  }

  const getFirstExperienceLevel = () => {
    if (!salaryStats) return "<1 year"
    const availableLevels = experienceLevels.filter((level) => salaryStats[level])
    return availableLevels[0] || "<1 year"
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-orange-400 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  const maxSalary = getMaxSalary()
  const firstExperience = getFirstExperienceLevel()

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1a0b2e 0%, #2d1b69 25%, #7c3aed 50%, #a855f7 75%, #f59e0b 90%, #f97316 100%)",
      }}
    >
      {/* Geometric background shapes */}
      <div className="absolute inset-0">
        {/* Large black circle top right */}
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-black rounded-full opacity-80"></div>

        {/* Purple triangular layers */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[400px] border-l-transparent border-b-[300px] border-b-purple-800/40"></div>
          <div className="absolute top-20 right-0 w-0 h-0 border-l-[350px] border-l-transparent border-b-[250px] border-b-purple-700/30"></div>
          <div className="absolute top-40 right-0 w-0 h-0 border-l-[300px] border-l-transparent border-b-[200px] border-b-purple-600/20"></div>
          <div className="absolute top-60 right-0 w-0 h-0 border-l-[250px] border-l-transparent border-b-[150px] border-b-purple-500/15"></div>
        </div>

        {/* Additional gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-transparent to-orange-400/30"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-white mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              IT Salary
              <br />
              Calculator
            </h1>
            <p className="text-lg md:text-xl mb-4 max-w-2xl leading-relaxed">
              Each year, our extensive surveys reach out to over 30,000 developers across over 180 countries,
              representing a diverse range of specialties. With data collected over multiple years, we are able to
              present a comprehensive analysis of tech trends using the methodology described{" "}
              <span className="underline cursor-pointer">here</span>.
            </p>
            <p className="text-lg md:text-xl max-w-2xl leading-relaxed">
              Use our calculator to estimate your income potential based on software developer skills, programming
              language, location, and experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-[30%_70%] gap-8">
            {/* Step 1: Filters */}
            <Card className="bg-purple-600/80 backdrop-blur-sm border-purple-400/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h2 className="text-white font-semibold text-lg">
                      Enter your programming language
                      <br />
                      and country.
                    </h2>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Programming language</label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {getLanguages().map((language) => (
                          <SelectItem key={language} value={language}>
                            {getDisplayLanguage(language)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Country</label>
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCountries().map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Results */}
            <Card className="bg-purple-600/80 backdrop-blur-sm border-purple-400/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h2 className="text-white font-semibold text-lg">
                      Calculate the salary range
                      <br />
                      based on your parameters.
                    </h2>
                  </div>
                </div>

                {salaryStats && (
                  <Card className="bg-white">
                    <CardContent className="p-6">
                      <p className="text-gray-700 mb-6">
                        Most <span className="text-purple-600 font-medium">{getDisplayLanguage(selectedLanguage)}</span>{" "}
                        developers with <span className="text-purple-600 font-medium">{firstExperience}</span> of
                        professional experience in{" "}
                        <span className="text-purple-600 font-medium">{selectedCountry}</span> can expect the following
                        net salary distribution (excluding any bonuses):
                      </p>

                      {/* Custom Dot Plot Chart */}
                      <div className="relative h-64 mb-6 bg-white">
                        <svg width="100%" height="100%" className="overflow-visible" viewBox="0 0 580 280">
                          {/* Chart area */}
                          <g transform="translate(40, 20)">
                            {/* Y-axis labels and chart lines */}
                            {experienceLevels.map((level, index) => {
                              const stats = salaryStats[level]
                              if (!stats) return null

                              const yPos = 220 - index * 35 // Spacing between levels
                              const chartWidth = 480 // Available width for chart

                              // Calculate positions as percentages of chart width
                              const minPos = (stats.min / maxSalary) * chartWidth
                              const q1Pos = (stats.q1 / maxSalary) * chartWidth
                              const medianPos = (stats.median / maxSalary) * chartWidth
                              const q3Pos = (stats.q3 / maxSalary) * chartWidth
                              const maxPos = (stats.max / maxSalary) * chartWidth

                              return (
                                <g key={level}>
                                  {/* Y-axis label */}
                                  <text x={520} y={yPos + 5} textAnchor="start" className="text-sm fill-gray-600">
                                    {experienceLabels[level]}
                                  </text>

                                  {/* Horizontal line connecting min to max */}
                                  <line x1={minPos} y1={yPos} x2={maxPos} y2={yPos} stroke="#A78BFA" strokeWidth={2} />

                                  {/* Data points */}
                                  <circle cx={minPos} cy={yPos} r={4} fill="#8B5CF6" />
                                  <circle cx={q1Pos} cy={yPos} r={4} fill="#8B5CF6" />
                                  <circle cx={medianPos} cy={yPos} r={4} fill="#7C3AED" />
                                  <circle cx={q3Pos} cy={yPos} r={4} fill="#8B5CF6" />
                                  <circle cx={maxPos} cy={yPos} r={4} fill="#8B5CF6" />
                                </g>
                              )
                            })}

                            {/* X-axis */}
                            <line x1={0} y1={240} x2={480} y2={240} stroke="#E5E7EB" strokeWidth={1} />

                            {/* X-axis labels */}
                            {[0, 0.25, 0.5, 0.75, 1].map((percent, index) => {
                              const xPos = percent * 480
                              const value = percent * maxSalary
                              return (
                                <g key={index}>
                                  <line x1={xPos} y1={240} x2={xPos} y2={245} stroke="#E5E7EB" strokeWidth={1} />
                                  <text x={xPos} y={260} textAnchor="middle" className="text-sm fill-gray-500">
                                    {formatSalary(value)}
                                  </text>
                                </g>
                              )
                            })}
                          </g>
                        </svg>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">
                        The graph shows salary distribution among users of the selected technology in the specified
                        region, based on responses from{" "}
                        <span className="underline cursor-pointer">Developer Ecosystem Survey 2024</span>.
                      </p>

                      <div className="flex items-start gap-2 p-3 bg-gray-50 rounded">
                        <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600">
                          <strong>Note:</strong> Experience levels refer to total years of professional coding, not
                          years using the selected technology.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
