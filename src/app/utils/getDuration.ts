export function getDuration(duration: number) {
    if (duration < 60) return `0:${duration > 10 ? duration : `0${duration}`}`
    else if (duration > 60) return `${Math.floor(duration / 60)} : ${duration % 60}`
}