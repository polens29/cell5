import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { PeopleCollection } from '/imports/api/people';
import { List, Card, Modal } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';


export const CelebrityList = () => {

	const people = useTracker(() => {
    return PeopleCollection.find().fetch();
  });

  const [showDeleteModal, toggleModal] = useState(false);
  const [item, setItem] = useState(null);

  toggle = (item) => {
  	toggleModal(!showDeleteModal);
  	setItem(item);
  }

  deleteCelebrity = () => {
  	PeopleCollection.remove(item._id)
  	toggleModal(!showDeleteModal);
  }

  renderCard = (item) => {
  	let imageUrl = 'https://gotrips.lk/site/images/uploads/img.jpg';
  	if(item.imageUrl){
  		imageUrl = item.imageUrl
  	}

  	let age = 'N/A'
  	if(item.dob){
  		diff = moment().diff(moment(item.dob), 'years')
  		age = `${diff} years old`;
  	}

  	return (
  		<Card>
  			<div className='imgDiv'>
  				<img src={imageUrl} />
  			</div>
  			<div className='content'>
  				<div className='name'>
  					<label>{item.firstName} {item.lastName}</label>
  					<div className='actions'>
		  				<button><EditOutlined /></button>
		  				<button onClick={() => toggle(item)}><DeleteOutlined /></button>
		  			</div>
  				</div>
  				<label className='age'>{age}</label>
  				<div className='bio'>{item.bio}</div>
  			</div>
  		</Card>
  	)
  }

	return (
		<div>
			{
				item && (
					<Modal
						visible={showDeleteModal}
						onCancel={() => toggle(null)}
						onOk={deleteCelebrity}
					>
						Are you sure you want to delete {item.firstName} {item.lastName}?
					</Modal>
				)
			}
			
			<List
		    grid={{
		      gutter: [32, 24],
		      xs: 1,
		      sm: 2,
		      md: 2,
		      lg: 4,
		      xl: 6,
		      xxl: 6,
		    }}
		    dataSource={people}
		    renderItem={item => (
		      <List.Item>
		        {this.renderCard(item)}
		      </List.Item>
		    )}
		  />
		</div>
	)
}