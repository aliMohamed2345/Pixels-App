
const Loading = ({ numberOfLoadingItems }: { numberOfLoadingItems: number }) => {
    return (
        <div className="w-full max-w-7xl mx-auto p-4 bg-primary">
            <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-2 place-items-center'>
                {Array.from({ length: numberOfLoadingItems }).map((_, i) =>
                (
                    <div key={i} className="bg-secondary animate-pulse h-[300px] w-60 mb-2 duration-300"></div>
                ))}
            </div>
        </div>
    );
}

export default Loading;