import React, { Component } from 'react';
import { Table, Button } from 'antd';
import GoogleMap from './GoogleMap';
import "antd/dist/antd.css";

export default class LocationList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [], 
			loading: false,
			dataSource:[],
		};

		this.columns = [
			{
				key: 'key',
				dataIndex: 'key',
			},
			{
				name: 'name',
				dataIndex: 'name',
			},
			{
				lat: 'lat',
				dataIndex: 'lat',
			},
			{
				lng: 'lng',
				dataIndex: 'lng',
			},
		];
	}

	handleRemoveLocation = handleSaveRef => {
		this.setState({
			handleRemoveClick: handleSaveRef
		});
	};
	
	addLocationtoList = dataSource => {	
		this.setState({ dataSource });
	}
	
	deleteSelecetedLocation = () => {
		this.setState({ loading: true });

		for (let [k, selectedData] of this.state.selectedRowKeys.entries()) {
			for (let [i, data] of this.state.dataSource.entries()) {
				if (data.key == selectedData) {
					const dataSource = [...this.state.dataSource];
					dataSource.splice(i, 1);
					this.setState({ dataSource, loading: false });
					this.state.dataSource = dataSource;
				}
			}
		}
		this.state.handleRemoveClick(this.state.dataSource)
	};

	onSelectChange = selectedRowKeys => {
		console.log('selectedRowKeys changed: ', selectedRowKeys);
		this.setState({ selectedRowKeys });
	};

	render() {
		const { loading, selectedRowKeys } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};
		const hasSelected = selectedRowKeys.length > 0;
		return (
			<div>
				<div style={{ marginBottom: 16 }}>
					<Button type="primary" onClick={this.deleteSelecetedLocation}>
						Remove
          			</Button>
					<span style={{ marginLeft: 8 }}>
						{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
					</span>
				</div>
				<div id="locationList"><Table rowSelection={rowSelection} columns={this.columns} dataSource={this.state.dataSource} /></div>
				<div id="map">	<GoogleMap dataSourceGMap={this.state.dataSource} removeLocationData={this.handleRemoveLocation} addLocationtoList={this.addLocationtoList} /></div>
			
			</div>
		);
	}
}
