import React from 'react';
import { Modal, Tag } from 'antd';
import { ViewWrapper } from './css'
import moment from 'moment';
import { TwitterOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';


export const ActionButtons = (props) => {
	return (
		<div className='actions'>
			<button onClick={() => props.toggle(props.item, 'delete')}>
				<DeleteOutlined />
				Delete
			</button>
			<button onClick={() => props.toggle(props.item, 'edit')}>
				<EditOutlined />
				Edit
			</button>
		</div>
	)
}

export const CelebrityView = (props) => {

	const item = props.item;
	return (

		<ViewWrapper>
			<ActionButtons {...props} />
			<div className='image'>
				<img src={item.imageUrl} />
			</div>
			<div className='content'>
				<span>
					<label>Name : </label>
					{item.firstName} {item.lastName}
				</span>
				<span>
					<label>Born : </label>
					{moment(item.dob).format('MMM D, YYYY')}
				</span>
				<span>
					<label>Gender : </label>
					{item.gender}
				</span>
				<span>
					<label>Biography : </label>
					{item.bio}
				</span>
				<span>
					<label>Twitter Tags : </label>
					{item.tags.map((tag, index) => (
						<Tag icon={<TwitterOutlined />} color="#55acee" key={index}>{tag}</Tag>
						))}
				</span>

			</div>	
		</ViewWrapper>
	)
}