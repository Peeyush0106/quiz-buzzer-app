import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Br from "./components/Br";
import Constants from 'expo-constants';
import db from './config';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			colorStamps: [],
			teamsData: {},
			rank1: { teamName: "loading.." },
			rank2: { teamName: "loading.." },
			rank3: { teamName: "loading.." },
			rank4: { teamName: "loading.." },
		};
	}
	componentDidMount() {
		this.updateTeamNames(0, this.showTeamRanks);
		setInterval(() => {
			// console.log(this.state)
		}, 1000);
	}
	updateTeamNames(colorNo, func) {
		var colors = ['blue', 'green', 'red', 'yellow'];
		if (colorNo < colors.length) {
			var color = colors[colorNo];
			db.ref("Teams/" + color).update({
				teamName: color
			}).then(() => {
				this.updateTeamNames(colorNo + 1, func);
			});
		}
		else if (func) func();
	}
	showTeamRanks = () => {
		this.getColorRanks(0);
	};
	getColorRanks(colorNo) {
		var colors = ['blue', 'green', 'red', 'yellow'];
		var color = colors[colorNo];
		var { colorStamps } = this.state;
		var temp_colorStamps = colorStamps;
		db.ref('Teams/' + color)
			.get()
			.then((data) => {
				if (data.val() && data.val().isPressed) {
					var timeStamp = data.val().timeStamp;
					if (colorNo < colors.length) {
						temp_colorStamps.push(timeStamp);
						var colorData = {
							timeStamp: temp_colorStamps[colorNo],
							teamName: color
						}
						this.setState({
							colorStamps: temp_colorStamps,
							colorData: colorData,
						});
						console.log(this.state.colorData)
						this.getColorRanks(colorNo + 1);
					}
				}
				else if (colorNo < colors.length) {
					this.setState({
						["rank" + (colorNo + 1)]: { teamName: "Not pressed" },
					});
					this.getColorRanks(colorNo + 1);
				}
				if (colorNo < colors.length) {
					var allColors = this.state.colorData;
					console.log(allColors)
					allColors.sort(function (team1, team2) {
						return team1.timeStamp - team2.timeStamp;
					});
					this.setState({
						colorData: allColors,
						["rank" + (colorNo + 1)]: { teamName: color },
					});
				}
			});
	}
	reset() {
		var colors = ['blue', 'green', 'red', 'yellow'];
		for (var i = 0; i < colors.length; i++) {
			var color = colors[i];
			db.ref('Teams/' + color).update({
				isPressed: false,
				timeStamp: 0,
			}).then(() => {
				location.reload();
			});
		}
	}
	render() {
		// return null
		return (
			<View style={styles.container}>
				<Text style={styles.paragraph}>Quiz Master App - Admin</Text>
				<Br />
				<Br />
				<Br />
				<View style={styles.ranks}>
					<View style={styles.rankTxtView}>
						<Text
							style={[{
								backgroundColor: this.state.rank1.teamName,
								color: this.state.rank1.teamName == "yellow" || this.state.rank3.teamName == "loading.." || this.state.rank3.teamName == "Not pressed" ? "black" : "white"
							}, styles.rankTxt]}
						>
							#1: {this.state.rank1.teamName}
						</Text>
					</View>
					<Br />
					<View style={styles.rankTxtView}>
						<Text
							style={[{
								backgroundColor: this.state.rank2.teamName,
								color: this.state.rank2.teamName == "yellow" || this.state.rank3.teamName == "loading.." || this.state.rank3.teamName == "Not pressed" ? "black" : "white"
							}, styles.rankTxt]}
						>
							#2: {this.state.rank2.teamName}
						</Text>
					</View>
					<Br />
					<View style={styles.rankTxtView}>
						<Text
							style={[{
								backgroundColor: this.state.rank3.teamName,
								color: this.state.rank3.teamName == "yellow" || this.state.rank3.teamName == "loading.." || this.state.rank3.teamName == "Not pressed" ? "black" : "white"
							}, styles.rankTxt]}
						>
							#3: {this.state.rank3.teamName}
						</Text>
					</View>
					<Br />
					<View style={styles.rankTxtView}>
						<Text
							style={[{
								backgroundColor: this.state.rank4.teamName,
								color: this.state.rank4.teamName == "yellow" || this.state.rank3.teamName == "loading.." || this.state.rank3.teamName == "Not pressed" ? "black" : "white"
							}, styles.rankTxt]}
						>
							#4: {this.state.rank4.teamName}
						</Text>
					</View>
				</View>
				<Br />
				<Br />
				<Br />
				<Br />
				<View>
					<TouchableOpacity style={styles.reset} onPress={this.reset}>
						<Text style={styles.resetTxt}>
							Reset
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1',
		padding: 8,
	},
	paragraph: {
		margin: 24,
		fontSize: 40,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	ranks: {
		textAlign: 'center',
		textTransform: "capitalize",
		display: 'inline-block',
		paddingLeft: "40%",
		paddingRight: "40%"
	},
	reset: {
		backgroundColor: "red",
		textAlign: 'center',
		marginLeft: "40%",
		marginRight: "40%"
	},
	resetTxt: {
		color: "white",
		fontSize: "35px",
	},
	rankTxtView: {
		border: "2px solid"
	},
	rankTxt: {
		fontSize: "27.5px"
	}
});
