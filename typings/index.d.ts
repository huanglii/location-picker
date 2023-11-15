declare global {
  interface POI {
    id: string
    name: string
    lon: number
    lat: number
    location: string
    address?: string
    pname?: string
    cityname?: string
    type?: string
    typecode?: string
    adname?: string
  }
}

export {}
