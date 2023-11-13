// import React from "react";

// export default class Place extends React.Component {
//     constructor(props) {
//         super();
//         this.state = {
//             name: "",
//         }
//     }

//     componentDidMount= () => {
//         let placeId = window.location.href.split("/").pop() // Get gym ID
//         let selectedPlace = foodData.filter(place => place.id === placeId)[0]
//         this.setState({name: selectedPlace.name})
//     }
//     render() {
//         return (
//             <div>
//                 <h1>
//                     Restaurant: {this.state.Place}
//                 </h1>
//             </div>
//         )
//     }
// }

// let foodData = [
//     {
//         id: '1',
//         name: `Applebee's Grill + Bar`,
//         latitude: 37.79741818814659, 
//         longitude: -121.19676947529638
//     },
//     {
//         id: '2',
//         name: "Wingstop",
//         latitude: 37.797299499695036, 
//         longitude: -121.19492411561603
//     },
//     {
//         id: '3',
//         name: "El Pollo Loco",
//         latitude: 37.79761485306662,  
//         longitude: -121.18906785852958
//     },
//     {
//         id: '4',
//         name: "The Habit Burger Grill",
//         latitude: 37.79834073636466, 
//         longitude: -121.19572795627197
//     },
//     {
//         id: '5',
//         name: "In-N-Out Burger",
//         latitude: 37.79743338116746, 
//         longitude: -121.19256377205288
//     },
//     {
//         id: '6',
//         name: "Plátano Bar & Grill",
//         latitude: 37.82837071374882, 
//         longitude: -121.28813598299254
//     },
//     {
//         id: '7',
//         name: "Charly’s Super Tortas Chilangas",
//         latitude: 37.9693404661187, 
//         longitude: -121.25466076688471
//     }
// ]