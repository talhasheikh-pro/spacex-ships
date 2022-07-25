import { PLACEHOLDER_IMG } from "./constants";

/**
 * Return a placeholder image URL, if image is falsy
 * @param image 
 * @returns string
 */
export function getPlaceholderImageIfEmpty(image: string){
    if (!image)
        return PLACEHOLDER_IMG;

    return image;
}