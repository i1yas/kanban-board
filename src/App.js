import React, { Component } from "react";
import "./App.css";
import { Grid, Row, Navbar, Button, ButtonToolbar, Glyphicon } from "react-bootstrap";
import BoardsContainer from "./components/BoardsContainer";
import AddWindow from './components/AddWindow';

import initialData from './initialData.json';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			boardsList: initialData,
			isShowAddWindow: false
		}
	}
	toggleAddWindow(act) {
		let isShow;
		if(act === 'show') isShow = true
		else if (act === 'hide') isShow = false
		else isShow = !this.state.isShowAddWindow

		this.setState({...this.state, isShowAddWindow: isShow})
	}
	updateData(dataLevel, dataUnit, boardName) {
		const dataLevelsDict = {
			boardsList: handleBoardsList,
			board: handleBoard,
			task: handleTask
		};

		function handleBoardsList() {
			this.setState({
				...this.state,
				boardsList: dataUnit
			});
		}
		function handleBoard() {
			const filteredOldBoardsList = this.state.boardsList.filter(board => board.name.toLowerCase() !== boardName.toLowerCase());
			const newBoardsList = [...filteredOldBoardsList, dataUnit];

			this.updateData('boardsList', newBoardsList);
		}
		function handleTask() {
			const currentBoard = this.state.boardsList.find(board => board.name.toLowerCase() === boardName.toLowerCase());
			const filteredOldTaskList = currentBoard.tasks.filter(task => task.title !== dataUnit.title);
			const newBoard = {
				...currentBoard,
				tasks: [
					...filteredOldTaskList,
					dataUnit
				]
			};
			
			this.updateData('board', newBoard, boardName);
		}

		dataLevelsDict[dataLevel].call(this);
	}
	render() {
		return (
			<div className="App">
				<Grid fluid>
					<BoardsContainer boards={this.state.boardsList} />

					<Row />
				</Grid>

				<AddWindow
					show={this.state.isShowAddWindow}
					actions={{
						toggleWindow: this.toggleAddWindow.bind(this),
						updateData: this.updateData.bind(this)
					}}
				/>

				<Navbar
					className="App__footer"
					fixedBottom
					fluid
				>
					<Navbar.Brand className="App__footer-title">Kanban board</Navbar.Brand>

					<ButtonToolbar className="App__buttons-toolbar pull-right">
						<Button bsSize="large" >
							<Glyphicon glyph="refresh" /> Reset data
						</Button>
						<Button
							bsStyle="primary"
							bsSize="large"
							onClick={() => this.toggleAddWindow.call(this, 'show')}
						>
							<Glyphicon glyph="plus" /> Add Task
						</Button>
					</ButtonToolbar>
				</Navbar>
			</div>
		);
	}
}
export default App;
