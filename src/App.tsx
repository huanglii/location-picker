import LocationPicker from '@/components/LocationPicker'
import MapboxMap from '@/components/MapboxMap'
import Tip from './components/Tip'

function App() {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-auto h-full">
        <LocationPicker />
        <div className="flex-1 relative">
          <MapboxMap />
          <Tip />
        </div>
      </div>
    </div>
  )
}

export default App
