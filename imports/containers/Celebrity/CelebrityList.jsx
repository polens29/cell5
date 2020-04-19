import React, { useState } from 'react';
import { List, Card, Modal, Drawer } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CelebrityAdd from './CelebrityAdd';
import { CelebrityView } from './CelebrityView';
import moment from 'moment';

export const CelebrityList = (props) => {

  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteModal, toggleModal] = useState(false);
  const [item, setItem] = useState(null);

  toggle = (item, action) => {
  	if(action == 'delete'){
  		toggleModal(!showDeleteModal);
  	}
  	else if(action == 'view') {
  		setShowView(!showView);
  	}
  	else if(action == 'edit') {
  		setShowEdit(!showEdit);
  		setShowView(!showView);
  		item = props.getUpdatedDetails(item);
  	}
  	
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
  		<Card onClick={() => toggle(item, 'view')}>
  			<div className='imgDiv'>
  				<img src={imageUrl} />
  			</div>
  			<div className='content'>
  				<div className='name'>
  					<label>{item.firstName} {item.lastName}</label>
  				</div>
  				<label className='age'>{age}</label>
  				<div className='bio'>{item.bio}</div>
  			</div>
  		</Card>
  	)
  }

  let list = props.people;
  list.sort(function(a,b){
  	if(props.orderBy == 'desc') {
  		return(b[props.sortBy].localeCompare(a[props.sortBy]))
  	}

  	return(a[props.sortBy].localeCompare(b[props.sortBy]))
  });

	return (
		<div>
			{
				item && (
					<Modal
						visible={showDeleteModal}
						onCancel={() => toggle(item, 'delete')}
						onOk={deleteCelebrity}
					>
						Are you sure you want to delete {item.firstName} {item.lastName}?
					</Modal>
				)
			}
			{
				item && (
					<Drawer
						title='Celebrity Details'
						visible={showView || showEdit}
						onClose={() => toggle(null, 'view')}
						width={510}
					>
						{
							showView && (
								<CelebrityView
									item={item}
									toggle={toggle}
									{...props}
								/>
							)
						}
					</Drawer>
				)
			}

			{
				showEdit && (
					<CelebrityAdd
						item={item}
						toggle={toggle}
						showModal={showEdit}
						title='Update Celebrity Details'
					/>
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
		    dataSource={props.people}
		    renderItem={item => (
		      <List.Item>
		        {this.renderCard(item)}
		      </List.Item>
		    )}
		  />
		</div>
	)
}