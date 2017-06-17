import React, { Component } from "react";
import { Panel, Label, Media, Button, ButtonToolbar } from "react-bootstrap";
import "./Task.css";
import AddForm from "./AddForm";
import clickOutsideWrapper from "react-click-outside";

class Task extends Component {
	constructor(props) {
		super(props);

		this.allFields = [
			"title",
			"content",
			"labels",
			"importantLabels",
			"image",
			"imageType"
		];
		this.usedFields = this.allFields.filter(field => this.props[field]);
		this.data = {};
		for (let i = 0; i < this.usedFields.length; i++) {
			this.data[this.usedFields[i]] = this.props[this.usedFields[i]];
		}

		this.state = {
			isEdit: false,
			data: this.data
		};
	}
	updateTaskData(newTaskData) {
		const newData = {
			...this.state.data,
			...newTaskData
		}
		this.setState({
			...this.state,
			data: newData
		});
	}
	onEditMode() {

		this.setState({
			...this.state,
			isEdit: true
		});
	}
	offEditMode() {
		this.setState({
			...this.state,
			isEdit: false
		});
	}
	handleCloseClick() {
		this.offEditMode();
	}
	handleClickOnTask(event) {
		if (this.state.isEdit) {
			event.stopPropagation();
			return;
		}
		this.onEditMode();
	}
	handleClickOutside() { // react-click-outside's method
		this.offEditMode();
	}
	render() {

		const contentPart = (
			<div>
				<div className="Task__content">
					<Media>
						{this.props.image &&
							<Media.Left>
								<img
									src={this.state.data.image || this.props.image}
									alt={this.state.data.title || this.props.title}
									height={100}
								/>
							</Media.Left>}
						<Media.Body>
							{this.state.data.content || this.props.content}
						</Media.Body>
					</Media>
				</div>
				{(this.props.labels || this.props.importantLabels) &&
					<div className="Task__labels">
						{this.props.labels &&
							(this.state.data.labels || this.props.labels).map((label, ind) => {
								return (
									<span key={ind} className="Task__label">
										<Label bsStyle="info">
											{label}
										</Label>
										{"\u00A0"}
									</span>
								);
							})}
						{this.props.importantLabels &&
							(this.state.data.importantLabels || this.props.importantLabels).map((label, ind) => {
								return (
									<span key={ind} className="Task__label">
										<Label bsStyle="primary">
											{label}
										</Label>
										{"\u00A0"}
									</span>
								);
							})}
					</div>}
			</div>
		);

		const editFormPart = (
			<div className="Task__editForm">
				<AddForm
					fields={this.usedFields}
					data={this.state.data}
					onChange={this.updateTaskData.bind(this)}
				/>
				<hr />
				<ButtonToolbar className="Task__editForm-buttons pull-right">
					<Button onClick={this.handleCloseClick.bind(this)}>
						Cancel
					</Button>
					<Button bsStyle="primary">Save</Button>
				</ButtonToolbar>
			</div>
		);

		return (
			<div className="Task" onClick={this.handleClickOnTask.bind(this)}>
				<Panel header={this.state.data.title || this.props.title}>
					{!this.state.isEdit && contentPart}
					{this.state.isEdit && editFormPart}
				</Panel>
			</div>
		);
	}
}

export default clickOutsideWrapper(Task);
