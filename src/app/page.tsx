'use client'
import Link from 'next/link';
import waterfall from '../../public/avenue-815297_1920.jpg'
export default function Home() {

  function fetchData(link: string) {
    fetch(link).then(res => res.json()).then(data => console.log(data.hits));
  }
  fetchData(`${process.env.NEXT_PUBLIC_PHOTOS_API}?key=${process.env.NEXT_PUBLIC_PHOTOS_API_KEY}&id=9226515`);
  return (<>
    <div
      className={`relative w-full h-screen flex items-center justify-center text-center bg-gray-800 text-white bg-cover bg-center`} style={{ backgroundImage: `url(${waterfall.src})` }}>
      <div className="absolute inset-0 bg-black/70 w-full h-50"></div> {/* Dark overlay */}
      <div className="relative z-4 bg-secondary p-5 rounded-2xl min-h-[250px] ">
        <h1 className=" md:text-5xl  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent">
          Welcome to Pixels World
        </h1>
        <p className="mt-6 text-lg md:text-2xl max-w-xl mx-auto text-text_color">
          Explore stunning visuals and make your ideas come alive.
        </p>
        <Link href="/photos" className="mt-3 px-6 py-3 block bg-teal-500 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-600 transition-all">
          Get Started
        </Link>
      </div>
    </div >
  </>);
}
