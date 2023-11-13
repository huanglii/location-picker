import MapboxMap from '@/components/MapboxMap'
import LocationPicker from '@/components/LocationPicker'

function App() {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-auto h-full">
        <LocationPicker />
        <div className="flex-1">
          <MapboxMap />
        </div>
      </div>
    </div>
  )
}

export default App
