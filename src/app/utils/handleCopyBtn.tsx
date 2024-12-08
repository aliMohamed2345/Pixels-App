export const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
        .then(() => {
            console.log("Text copied to clipboard");
        })
        .catch((err) => {
            console.error("Error copying text: ", err);
        });
};