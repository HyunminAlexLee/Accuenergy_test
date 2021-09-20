import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng
} from 'react-places-autocomplete';


export class MapContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			address: '', 
			showingInfoWindow: false,
			activeMarker: {},
			selectedPlace: {},			
			dataSource: []}
	};

	changeValue = dataSource => {	
		this.setState({ dataSource});
	}
	componentDidMount() { 
 		this.props.removeLocationData(this.handleRemoveClick);
 	} 

	handleRemoveClick = data => { 			
		this.setState({ dataSource:data});	
	 };

	handleChange = address => {
		this.setState({ address });
		
	};

	handleSelect = address => {
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng => {
					var addLocation = { key: Date.now(),
    								name: address,
    								lat: latLng.lat, 
									lng: latLng.lng 
  									};
					this.state.dataSource.push(addLocation);
					const dataSource = [...this.state.dataSource];	
					this.setState({ dataSource});
					this.props.addLocationtoList(this.state.dataSource);
				})
			.catch(error => console.error('Error', error));
	};

 	handleActiveMarker = (marker) => {
   	 	if (marker === activeMarker) {
      		return;
    	}
    	setActiveMarker(marker);
  	};

	render() {
		return (			
			<div id="googleMap" >			
				<PlacesAutocomplete
					value={this.state.address}
					onChange={this.handleChange}
					onSelect={this.handleSelect}					
				>
					{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
						<div>
							<input
								{...getInputProps({
									placeholder: 'Search Places ...',
									className: 'location-search-input',
								})}
							/>						
							<div className="autocomplete-dropdown-container">
								{loading && <div>Loading...</div>}
								{suggestions.map(suggestion => {
									const className = suggestion.active
										? 'suggestion-item--active'
										: 'suggestion-item';
									// inline style for demonstration purpose
									const style = suggestion.active
										? { backgroundColor: '#fafafa', cursor: 'pointer' }
										: { backgroundColor: '#ffffff', cursor: 'pointer' };
									return (
										<div
											{...getSuggestionItemProps(suggestion, {
												className,
												style,
											})}
										>
											<span>{suggestion.description}</span>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</PlacesAutocomplete>

				<Map google={this.props.google}  
					initialCenter={{
					lat: 43.653226, lng: -79.3831843
					}}
					//Center={{ lat: this.state.mapCenter.lat, lng: this.state.mapCenter.lng }}
				>
 					{this.state.dataSource.map(({ key, lat , lng  }) => (
						<Marker
            				key={key}           
            				position={{lat: lat, lng : lng }}
          				/>
					))}
				</Map>
			</div>			
		)
	}
}

export default GoogleApiWrapper({
	apiKey: ('')
})(MapContainer)
