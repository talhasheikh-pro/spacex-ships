import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { _TImage, _TImages } from './types';
import { getPlaceholderImageIfEmpty } from '../utils';
import IconButton from '@mui/material/IconButton';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import DirectionsBoat from '@mui/icons-material/DirectionsBoat';
import styles from './styles';

export default function Gallery({
    images,
    imageRef
} : _TImages) {
  return (
    <ImageList rowHeight={164} variant="woven" cols={3} gap={8}>
      {images.map((item :_TImage, index) => (
        <ImageListItem key={item.id}>
          <img
            src={`${getPlaceholderImageIfEmpty(item.image)}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${getPlaceholderImageIfEmpty(item.image)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
            ref={(index+1) === images.length ? imageRef : null}
          />

           <ImageListItemBar
              sx={styles.imageListItemBar}
              title={item.name + ' | ' + item.type}
              position="top"
              actionIcon={
                <IconButton
                  sx={styles.iconButton}
                  aria-label={`DirectionsBoat ${item.name}`}
                >
                  <DirectionsBoat />
                </IconButton>
              }
              actionPosition="left"
            />
        </ImageListItem>
      ))}
    </ImageList>
  );
}