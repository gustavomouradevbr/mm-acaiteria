import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';

function App() {
  return (
    <div className="bg-stone-950 font-sans text-gray-100 flex flex-col items-center">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  )
}

export default App;