import sunriseAndSunsetData from '@/sunrise-sunset.json'

const useMoment = () => {
    const getMoment = (locationName:string) => {
        const location = sunriseAndSunsetData.find((data) => data.locationName === locationName )
        if (!location) return null
        const now = new Date()
        const nowDate = Intl.DateTimeFormat('zh-TW', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
          .format(now)
          .replace(/\//g, '-')
        const locationDate = location.time && location.time.find((time) => time.dataTime === nowDate)
        const sunriseTimestamp = new Date(`${locationDate?.dataTime} ${locationDate?.sunrise}`).getTime();
        const sunsetTimestamp = new Date(`${locationDate?.dataTime} ${locationDate?.sunset}`).getTime();
        const nowTimeStamp = now.getTime()
        return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp ? 'day' : 'night'
    }   
  return {getMoment}
}

export default useMoment