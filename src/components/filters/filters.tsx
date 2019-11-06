import React, { Component } from 'react';
import classes from './filters.module.css';
import FilterData from './filterData/filterData';
import Results from './res/res';
import Facility from './options/facility/facility';
import Level from './options/level/level';
import SearchBar from './options/searchBar/searchBar';
import { Values } from '../../App';
import _ from 'lodash';

interface MyState {
	facilityValue: string;
	LevelValue: string;
	SearchValue: string;
}


interface MyProps {
	results: Array<Values>;
	uniqueFacilities: Array<string>;
	uniqueLevels: Array<string>;

}

export default class Filters extends Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			facilityValue: '',
			LevelValue: '',
			SearchValue: '',
		};
	}

	private filterFacilitiesHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value: string = (e.target as HTMLSelectElement).value;


		this.setState({
			facilityValue: value
		});
	};


	private filterLevelHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value: string = (e.target as HTMLSelectElement).value;


		this.setState({
			LevelValue: value
		});
	};

	private FacilityLevelFilter = () => {
		if (this.state.facilityValue.length > 0) {


			return this.props.results.filter(
				(fac: Values): boolean => fac.facility === this.state.facilityValue
			);
		}
		if (this.state.LevelValue.length > 0) {


			return this.props.results.filter(
				(lev: Values): boolean => lev.level === this.state.LevelValue
			);
		}
	};


	private filterSearchHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const value: string = (e.target as HTMLInputElement).value;

		this.setState({
			SearchValue: value
		});
	};

	// Search Filter

	private SearchFilter = () => {

		let searchable: object = [{}];

		// filter the messages based on user inputs

		if (this.state.SearchValue.length > 0 && this.state.facilityValue.length > 0) {
			searchable = this.props.results
				.filter((facilities: Values) => {
					return facilities.facility === this.state.facilityValue;
				})
				.filter(
					(search: Values): boolean =>
						search.message
							.toLocaleLowerCase()
							.indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
						search.level
							.toLocaleLowerCase()
							.indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
						search.facility
							.toLocaleLowerCase()
							.indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0
				);
			return searchable;
		}
		if (this.state.SearchValue.length > 0 && this.state.LevelValue.length > 0) {
			searchable = this.props.results
				.filter((levels: Values) => levels.level === this.state.LevelValue)
				.filter((searched: Values): boolean => {
					return (
						searched.message
							.toLocaleLowerCase()
							.indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
						searched.level
							.toLocaleLowerCase()
							.indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
						searched.facility
							.toLocaleLowerCase()
							.indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0
					);
				});
			return searchable;
		}
		searchable = this.props.results.filter(
			(search: Values): boolean =>
				search.message
					.toLocaleLowerCase()
					.indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
				search.level
					.toLocaleLowerCase()
					.indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
				search.facility
					.toLocaleLowerCase()
					.indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0
		);
		return searchable;

	};

	// Mapping the entire array for displaying on the UI

	private ShowingResults = () => {
		if (
			this.state.facilityValue.length > 0 ||
			this.state.LevelValue.length > 0 ||
			this.state.SearchValue.length > 0
		) {
			return (
				<FilterData
					FacilityLevelFilter={this.FacilityLevelFilter}
					SearchValue={this.state.SearchValue}
					SearchFilter={this.SearchFilter}
				/>
			);
		}
		if (
			this.state.facilityValue === '' ||
			this.state.LevelValue === '' ||
			this.state.SearchValue === ''
		) {
			return <Results results={this.props.results} />;
		}
	};


	private disablingOption = (): number => {
		return _.indexOf(this.props.uniqueFacilities, this.state.facilityValue);
	};



	private disablingFacility = (): number => {
		return _.indexOf(this.props.uniqueLevels, this.state.LevelValue);
	};


	public render(): JSX.Element {
		return (
			<>
				<div className={classes.box}>
					<h1> Error-LOG SEARCH !</h1>
					<div>
						<Facility
							uniqueFacilities={this.props.uniqueFacilities}
							FacilitiesHandler={this.filterFacilitiesHandler}
							disablingFacility={this.disablingFacility}
							levelValue={this.state.LevelValue}
						/>
						<Level
							uniqueLevels={this.props.uniqueLevels}
							levelHandler={this.filterLevelHandler}
							disablingLevel={this.disablingOption}
							facilityValue={this.state.facilityValue}
						/> <br />
						<SearchBar searchHandler={this.filterSearchHandler} />
					</div>
				</div>

				<div className={classes.results}>{this.ShowingResults()}</div>
			</>
		);
	}
}
