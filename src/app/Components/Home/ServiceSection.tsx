import { servicesSectionData } from "@/app/utils/Object";

const ServicesSection = () => {
    return (<>
        <h5 className='text-2xl sm:text-3xl md:text-4xl  text-text_color text-center my-5 font-bold '>Services</h5>
        <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 grid text-center container mx-auto my-5 text-text_color ">
            {servicesSectionData.map((service, i) =>
            (<div className="bg-secondary p-3 rounded-lg h-[280px] gap-1 flex-col flex justify-center" key={i}>
                {service.logo}
                <h6 className="text-xl py-3">{service.header}</h6>
                <p>{service.description}</p>
            </div>))}
        </div>
    </>);
}

export default ServicesSection;