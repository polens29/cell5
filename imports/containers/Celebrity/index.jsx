import React, { useState } from 'react';
import { Layout, Modal, Drawer } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { CelebrityWrapper, RedBtn } from './css';
import CelebrityModal from './CelebrityModal';
import CelebrityAdd from './CelebrityAdd';
import { CelebrityList } from './CelebrityList';

const { Content } = Layout;

export const CelebrityContainer = () => {

	const [showModal, toggleModal] = useState(false);

	toggle = () => {
		toggleModal(!showModal);
	}

	return (
		<CelebrityWrapper>
			<Drawer
        title="Add Famous Person"
        visible={showModal}
        onClose={toggle}
        width={510}
        placement='right'
      >
      	<CelebrityAdd toggle={toggle}/>
			</Drawer>
			<Content>
				<div className='add-div'>
					<label>List of Famous People</label>
					<RedBtn 
						float='right'
						onClick={toggle}
					>
						<UserAddOutlined/> Add Person
					</RedBtn>
				</div>
				<CelebrityList />
			</Content>
		</CelebrityWrapper>
	)
}