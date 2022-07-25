import React, { Fragment } from 'react';
import Ship from '../Ship';
import { _TShip } from '../Ship/types';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { _TShipList } from './types';

export default function ShipsList({
    ships,
    shipRef,
}: _TShipList) :JSX.Element {
    return (
        <List>
            {
                ships && ships.map((ship :_TShip, index) => 
                    <Fragment
                        key={ship.id} 
                    >
                        <Ship 
                            {...ship}
                            shipRef={(index+1) === ships.length ? shipRef : null}
                        />
                        <Divider key={`${ship.id}_d_${index}`} variant="inset" component="li" />
                    </Fragment>  
                )
            }
        </List>
    );
}