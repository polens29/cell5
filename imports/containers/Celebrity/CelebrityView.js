import React from 'react';
import { Modal } from 'antd';

export const CelebrityView = (props) => {

	const item = props.item;
	return (

		<div>
			<img src={item.imageUrl} />
			<label> {item.firstName} {item.lastName} </label>
			<span> {item.bio} </span>	
		</div>
	)
}