import React from 'react';
import { Modal } from 'antd';

export default class CelebrityModal extends React.Component {
	
	render() {
		console.log()
		return (
			 <Modal
        title="Add Celebrity"
        visible={this.props.visible}
        onCancel={this.props.onCancel}
      >
      	test

			</Modal>

		)
	}
}