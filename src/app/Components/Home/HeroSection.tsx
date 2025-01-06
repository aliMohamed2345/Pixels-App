import waterfall from '../../../../public/avenue-815297_1920.jpg'
const HeroSection = () => {
    return (
        <div
            className={`relative w-full h-screen flex items-center justify-center text-center bg-gray-800 text-white bg-cover bg-center`} style={{ backgroundImage: `url(${waterfall.src})` }}>
            <div className="absolute inset-0 bg-black/70 w-full h-50"></div> {/* Dark overlay */}
            <div className="relative z-4 bg-secondary p-5 rounded-2xl  ">
                <h1 className=" md:text-5xl  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent">
                    Welcome to Pixels World
                </h1>
                <p className="mt-6 text-lg md:text-2xl max-w-xl mx-auto text-text_color">
                    Explore stunning visuals and make your ideas come alive.
                </p>
            </div>
        </div >
    );
}

export default HeroSection;