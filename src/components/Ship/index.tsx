import React from 'react';
import { _TShip } from './types';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import styles from './styles';

export default function Ship({
    name,
    image,
    url,
    type,
    shipRef,
}: _TShip) :JSX.Element {
    return (
        <ListItem sx={styles.listItem}>
            <ListItemAvatar>
                <Avatar variant="rounded">
                    <img src={image} height="200" width="200" ref={shipRef} />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} secondary={type} />
            { 
                url ? <Button variant="outlined" href={url} target="_blank">View Details</Button> : 'No Details Available'
            }
        </ListItem>
    )
}