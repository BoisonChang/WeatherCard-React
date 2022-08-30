export type WeatherElementType = {
    observationTime: Date,
    locationName: string,
    temperature: number,
    windSpeed: number,
    description: string,
    weatherCode: number,
    rainPossibility: number,
    comfortability: string,
    isLoading: boolean
}

export type WeatherCardElement = {
    moment: string,
    cityName: string,
    weatherElement:WeatherElementType,
    fetchData: Function,
}

export type WeatherType = {
    elementName: string,
    time:{
      startTime:string,
      endTime:string,
      parameter:{
        parameterName:string,
        parameterValue:string
      }
    } []
}


