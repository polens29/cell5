import React, { useState } from 'react';
import { List, Card, Modal, Drawer } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CelebrityAdd from './CelebrityAdd';
import { CelebrityView } from './CelebrityView';
import moment from 'moment';
import { PeopleCollection } from '/imports/api/people';


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
  	setShowView(false);
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
  					<label>{item.lastName}, {item.firstName} </label>
  				</div>
  				<label className='age'>{age}</label>
  				<div className='bio'>{item.bio}</div>
  			</div>
  		</Card>
  	)
  }

  let list = props.people;
  list.sort(function (x, y) {
    var n = x.lastName.localeCompare(y.lastName);
    if (n !== 0) {
        return n;
    }

    return x.firstName.localeCompare(y.firstName);
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