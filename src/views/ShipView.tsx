import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { SHIPS_QUERY } from '../api/constants';
import { _TShip } from '../components/Ship/types';
import Loading from '../components/Loading';
import Container from '@mui/material/Container';
import ShipsList from '../components/ShipList';
import Gallery from '../components/Gallery';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormGroup } from '@mui/material';
const SHIPS_PER_VIEW = 15;
const SELECT_ALL_TYPES = 'All';

export default function ShipView() :JSX.Element {

    const [limit, setLimit] = useState<number>(0);
    const [ships, setShips] = useState<Array<_TShip>>([]);
    const [view, setView] = useState<boolean>(false);
    const [type, setType] = useState<string>(SELECT_ALL_TYPES);
    const [ref, inView] = useInView({
        /* Optional options */
        triggerOnce: true,
        rootMargin: '0px 0px',
    });
    const availableTypes :Array<string> = [];
    
    // Fetch Data from API
    const { loading, data } = useQuery(SHIPS_QUERY, {
        variables: {
            limit
        }
    });

    const loadShips = () :void => {
        setLimit(limit + SHIPS_PER_VIEW);
    };

    // load initial shipment on mount
    useEffect(() :void => {
        loadShips();
    }, []);

    // load more shipment based on scroll
    useEffect(() :void => {
        if (inView && data.ships.length === limit)
            loadShips();
    }, [inView]);

    // update ships, if data has changed
    useEffect(() :void => {
        if (data && data.ships.length)
            setShips(data.ships);
    }, [data]);
    
    const filterByType = (type: string) :Array<_TShip> => {
        if (type === SELECT_ALL_TYPES) return ships;

        return ships.filter((ship: _TShip) => ship.type == type);
    };

    return (
        <Container  maxWidth="xl">

            {loading && ( <Loading isLoading={loading} /> )}
            <h1>Available Ships <FormControlLabel control={<Switch />} onClick={() => setView(!view)} label="Gallery View" /></h1>

            <FormGroup>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="type-select-label"
                        id="type-select"
                        value={type}
                        label="Type"
                        onChange={(event: SelectChangeEvent) => setType(event.target.value)}
                    >
                        <MenuItem key={SELECT_ALL_TYPES} value={SELECT_ALL_TYPES}>All</MenuItem>
                    {
                        ships.map((ship: _TShip) => {
                            if (availableTypes.includes(ship.type))
                                return null;
                            
                            availableTypes.push(ship.type);
                            return <MenuItem key={ship.type} value={ship.type}>{ship.type}</MenuItem>;
                        })
                    }
                    </Select>
                </FormControl>
            </FormGroup>

            {
                // Switching View b/w gallery and list based on value
                !view ? (
                    <ShipsList 
                        ships={filterByType(type)}
                        shipRef={ref}
                    />
                ) : (
                    <Gallery 
                        images={filterByType(type)} 
                        imageRef={ref}
                    />
                )
            }
        </Container>
    );
}  