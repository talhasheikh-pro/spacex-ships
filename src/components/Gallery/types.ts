import { _TRef } from "../types";

export type _TImage = {
    id: string
    name: string
    image: string
    url: string
    type: string
};

export type _TImages = {
    images: Array<_TImage>
    imageRef: _TRef
}