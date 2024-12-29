export const handleDownload = async (src: string, fileName: string = "image.jpg") => {
    try {
        const response = await fetch(src);
        const blob = await response.blob(); // Convert response to Blob
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob); // Create object URL
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up DOM
    } catch (error) {
        console.error("Error downloading image:", error);
    }
};
export const handleDownloadVideo = async (src: string, fileName: string = "Video.mp4") => {
    try {
        const response = await fetch(src);
        const blob = await response.blob(); // Convert response to Blob
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob); // Create object URL
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up DOM
    } catch (error) {
        console.error("Error downloading image:", error);
    }
};