import Feature from "/src/components/Feature";
import Footer from "/src/components/Footer";

function Home() {
  return (
    <div className="min-w-[480px]">
      <div className="flex flex-col m-10 text-center items-center justify-top">
        <img className="h-25 md:h-35 lg:h-40 mb-6" alt="Logo" src="\src\assets\logo.svg" />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Traffic Sign Detection</h1>
        <p className="text-lg md:text-xl lg:text-2xl text-center text-gray-700">
          Capture and identify traffic signs using your device's camera with our easy-to-use application.
        </p>
      </div>
      <Feature />
      <Footer />
    </div>
  );
}

export default Home;
