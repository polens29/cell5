import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Layout, Modal, Drawer, Select } from 'antd';
import {
	UserAddOutlined,
	SearchOutlined,
	SortAscendingOutlined,
	SortDescendingOutlined
} from '@ant-design/icons';
import { CelebrityWrapper, RedBtn } from './css';
import CelebrityAdd from './CelebrityAdd';
import { CelebrityList } from './CelebrityList';
import { PeopleCollection } from '/imports/api/people';

const { Content } = Layout;

const usePeople = (searchKey) => useTracker(() => {
		return PeopleCollection.find(
		{$or: [
			{firstName: { $regex : searchKey, $options:"i" }},
			{lastName: { $regex : searchKey, $options:"i" }}
		]}).fetch()
  }, [searchKey]);

export const CelebrityContainer = () => {

	const [showModal, toggleModal] = useState(false);
	const [searchKey, setSearchKey] = useState('');
	const [sortBy, setSortBy] = useState('lastName');
	const [orderBy, setOrderBy] = useState('asc');
	const Option = Select.Option;

	toggle = () => {
		toggleModal(!showModal);
	}

	const people = usePeople(searchKey);
	
  getUpdatedDetails = (item) => {
  	return PeopleCollection.findOne(item._id)
  }

	return (
		<CelebrityWrapper>
			{
				showModal && (
      		<CelebrityAdd
      			toggle={toggle}
      			showModal={showModal}
      			title='Add Celebrity'
      		/>
				)
			}
			<Content>
				<div className='add-div'>
					<label>List of Famous People</label>
					<div className='right'>
						<div className='sort'>
							<label>Sort By:</label>
							<Select defaultValue={sortBy} onChange={(value) => setSortBy(value)}>
								<Option value='lastName'>Last Name</Option>
								<Option value='firstName'>First Name</Option>
							</Select>
							<SortDescendingOutlined
								onClick={() => setOrderBy('desc')}
								className={orderBy=='desc'?'active order':'order'}
							/>
							<SortAscendingOutlined
								onClick={() => setOrderBy('asc')}
								className={orderBy=='asc'?'active order':'order'}
							/>
						</div>
						<div className='search borderBlue'>
							<input
								type='text'
								placeholder='Search people'
								onChange={(e) => setSearchKey(e.target.value)}
							/>
							<SearchOutlined />
						</div>
						<RedBtn 
							float='right'
							onClick={toggle}
						>
							<UserAddOutlined/> Add Person
						</RedBtn>
					</div>
				</div>
				<CelebrityList
					people={people}
					getUpdatedDetails={getUpdatedDetails}
					sortBy={sortBy}
					orderBy={orderBy}
				/>
			</Content>
		</CelebrityWrapper>
	)
}