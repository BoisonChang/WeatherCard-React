export const availableLocations = [
    {
      cityName: '宜蘭縣',
      locationName: '羅東',
      sunriseCityName: '宜蘭',
    },
    {
      cityName: '嘉義市',
      locationName: '嘉義市東區',
      sunriseCityName: '嘉義',
    },
    {
      cityName: '屏東縣',
      locationName: '屏東',
      sunriseCityName: '屏東縣',
    },
    {
      cityName: '雲林縣',
      locationName: '斗六',
      sunriseCityName: '雲林縣',
    },
    {
      cityName: '臺東縣',
      locationName: '知本',
      sunriseCityName: '臺東縣',
    },
    {
      cityName: '臺北市',
      locationName: '天母',
      sunriseCityName: '臺北市',
    },
    {
      cityName: '金門縣',
      locationName: '金寧',
      sunriseCityName: '金門縣',
    },
    {
      cityName: '桃園市',
      locationName: '桃園',
      sunriseCityName: '桃園市',
    },
    {
      cityName: '彰化縣',
      locationName: '員林',
      sunriseCityName: '彰化縣',
    },
    {
        cityName: '嘉義縣',
        locationName: '	民雄',
        sunriseCityName: '嘉義縣',
    },
    {
      cityName: '高雄市',
      locationName: '苓雅',
      sunriseCityName: '高雄市',
    },
    {
      cityName: '基隆市',
      locationName: '七堵',
      sunriseCityName: '基隆市',
    },
    {
      cityName: '臺南市',
      locationName: '安平',
      sunriseCityName: '臺南市',
    },
    {
      cityName: '南投縣',
      locationName: '鯉潭',
      sunriseCityName: '南投縣',
    },
    {
      cityName: '臺中市',
      locationName: '烏日',
      sunriseCityName: '臺中市',
    },
    {
      cityName: '新竹縣',
      locationName: '竹東',
      sunriseCityName: '新竹縣',
    },
    {
      cityName: '新竹市',
      locationName: '新竹市東區',
      sunriseCityName: '新竹市',
    
    },
    {
      cityName: '花蓮縣',
      locationName: '東華',
      sunriseCityName: '花蓮縣',
    },
    {
      cityName: '連江縣',
      locationName: '東莒',
      sunriseCityName: '連江縣',
    },
    {
      cityName: '澎湖縣',
      locationName: '西嶼',
      sunriseCityName: '澎湖',
    },
    {
      cityName: '新北市',
      locationName: '新莊',
      sunriseCityName: '新北市',
    },
]
export type LocationType = {
  cityName: string,
  locationName: string,
  sunriseCityName: string
}
export const findLocation:(value: string) => LocationType | null = (cityName) => {
    return availableLocations.find(location => location.cityName === cityName ) || null
}