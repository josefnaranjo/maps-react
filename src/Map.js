import React from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GoogleMapReact from 'google-map-react';
export default class Map extends React.Component {

    constructor(props) {
        super();
        this.state = {
            lat: 37.640712250708106,
            lng: -120.99829913201295,
            foodPlaces: [],
            selectedPlaceId: null,
            markerClicked: false,
            searchText: "",
            distance: 40,
        } 
    }

    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("Location : ", position.coords);
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                foodPlaces: foodData
            })
        }, (error) => {console.log("Couldn't get location: ", error.message)});
    };

    header = () => {
        const getDistanceFromLocation = (lat1, lon1, lat2, lon2) => {
            const deg2rad = (deg) => deg * (Math.PI / 180);
        
            const R = 6371 / 1.609344; // Radius of Earth in miles
            const dLat = deg2rad(lat2 - lat1);
            const dLon = deg2rad(lon2 - lon1);
        
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c; // Distance in miles
        
            return distance;
        };        

        const handleSearch = () => {
            let filteredPlaces;
    
            if (this.state.searchText.trim() === "") {
                // If the search text is empty, show all places within the selected distance
                filteredPlaces = foodData.filter(
                    place =>
                        getDistanceFromLocation(this.state.lat, this.state.lng, place.latitude, place.longitude) < this.state.distance
                );
            } else {
                // If there is a search text, filter places based on the text and distance
                filteredPlaces = foodData.filter(
                    place =>
                        place.name.toLowerCase().includes(this.state.searchText.toLowerCase()) &&
                        getDistanceFromLocation(this.state.lat, this.state.lng, place.latitude, place.longitude) < this.state.distance
                );
            }
    
            this.setState({
                foodPlaces: filteredPlaces
            });
        };

        const resetAll = () => {
            this.setState({
                foodPlaces: foodData,
                distance: 25,
                searchText: ""
            })
        }

        return (
            <div style={{ marginBottom: 10}}>
                <Typography variant='h4' style={ {textAlign: "center"}}>
                    F O O D  R A D A R
                </Typography>
                <TextField 
                    label="Search for a restaurant: " 
                    variant="outlined" 
                    style={{ width:"100%" }}
                    onChange={(event) => {this.setState( {searchText: event.target.value})}}
                />
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                    <Typography>Distance:</Typography>
                    <Slider style={{ width: "75%" }} 
                        value={this.state.distance}
                        aria-label="Temperature"
                        valueLabelDisplay="auto"
                        step={5}
                        marks
                        min={0}
                        max={50}
                        onChange={(event, value) => {this.setState({distance: value})}}
                      />
                </div>
                <div>
                    <Button variant="outlined" 
                    onClick= {resetAll} 
                    style={{ width:"50%" }} >
                    <RestartAltIcon />
                        Reset
                    </Button>
                    <Button variant="contained"
                    style={{ width:"50%" }}
                    onClick={handleSearch}
                    >
                        <SearchIcon />
                        Search
                    </Button>
                </div>
            </div>
        )
    }

    map = () => {
        const handlePlaceClick = (place) => {
            // window.location.replace("/Place/" + place.id)
        }

        const clickedOutside = (x, y, lat, lng, event) => {
            if (this.state.markerClicked == true) {
                this.setState({ 
                    selectedPlaceId: null, 
                    markerClicked: false 
                })
            } else {
                console.log("Clicked on map");
            }
        };

        return (
            <div style={{ backgroundColor: "pink", height: "80vh"}}>
                <GoogleMapReact
                onClick={clickedOutside}
                bootstrapURLKeys={{ key: "AIzaSyAOMi2PRizR-Bs35SfraCpKWQ_2wcAduIY" }}
                defaultCenter={{ lat: 37.640712250708106, lng: -120.99829913201295 }}
                defaultZoom={15}
                center={{ lat: this.state.latitude, lng: this.state.longitude }}
            >
                    {
                        this.state.foodPlaces.map((place) => {
                            return (
                                <LocationOnIcon color="secondary"
                                    lat={ place.latitude }
                                    lng= { place.longitude }
                                    onClick={clickedOutside}
                                />
                            )
                        })
                    }
                    {
                        this.state.foodPlaces.map((place) => {
                            return (
                                <LocationOnIcon color="secondary"
                                    lat={ place.latitude }
                                    lng= { place.longitude }
                                    onClick={() => {this.setState({ selectedPlaceId: place.id })}}
                                />
                            )
                        })
                    }
                    { 
                        this.state.foodPlaces.map((place) => {
                            if (this.state.selectedPlaceId === place.id) {
                                return(
                                    <div
                                        key={place.id}
                                        lat={ place.latitude }
                                        lng= { place.longitude } 
                                        onClick = {() => {handlePlaceClick(place)}}
                                        style={{ backgroundColor: "white", padding: 10, borderRadius: 15, width: 100 }}>
                                        <Typography textAlign= "center">
                                            { place.name }
                                        </Typography>
                                    </div>
                                )
                            } else {
                                return null;
                            }
                        })
                    }

                    <LocationSearchingIcon color="primary"
                        lat={ this.state.latitude }
                        lng= { this.state.longitude }
                    />
                </GoogleMapReact>
            </div>
        )
    }

    render() {
        return (
            <div style={{ backgroundColor: "beige" }}>
                {this.header()}
                {this.map()}
            </div>
        )
    }
}


let foodData = [
    {
        id: '1',
        name: `Applebee's Grill + Bar`,
        latitude: 37.79741818814659, 
        longitude: -121.19676947529638
    },
    {
        id: '2',
        name: "Wingstop",
        latitude: 37.797299499695036, 
        longitude: -121.19492411561603
    },
    {
        id: '3',
        name: "El Pollo Loco",
        latitude: 37.79761485306662,  
        longitude: -121.18906785852958
    },
    {
        id: '4',
        name: "The Habit Burger Grill",
        latitude: 37.79834073636466, 
        longitude: -121.19572795627197
    },
    {
        id: '5',
        name: "In-N-Out Burger",
        latitude: 37.79743338116746, 
        longitude: -121.19256377205288
    },
    {
        id: '6',
        name: "Plátano Bar & Grill",
        latitude: 37.82837071374882, 
        longitude: -121.28813598299254
    },
    {
        id: '7',
        name: "Charly’s Super Tortas Chilangas",
        latitude: 37.9693404661187, 
        longitude: -121.25466076688471
    }
]