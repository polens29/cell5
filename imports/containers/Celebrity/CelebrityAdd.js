import React from 'react';
import { Upload, message, DatePicker, Select, notification } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { AddWrapper, RedBtn, CancelBtn } from './css'
import moment from 'moment';
import { PeopleCollection } from '/imports/api/people';

const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default class CelebrityAdd extends React.Component {
  state = {
    loading: false,
    firstName: '',
    lastName: '',
    gender: 'N/A',
    bio: ''
  };

  constructor(props){
  	super(props);
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  handleInputChange = (field, value) => {
  	if(field === 'dob'){
  		value = value.format('YYYY-MM-DD');
  	}
  	this.setState({
  		[field]: value
  	})
  }

  disabledDate = (current) => {
  	return current && current.valueOf() > Date.now();
  }

  handleSubmit = () => {
  	let payload = this.state;
  	delete payload['loading'];
  	try {
  		let person = PeopleCollection.insert({
	  		...payload, 
	  		createdAt: new Date()
	  	});	
	  	notification.success({
		    message: 'Successfully added person.',
		  });
		  this.props.toggle();

  	} catch(error) {
  		notification.error({
  			message: 'Something went wrong. Please try again.'
  		})
  	}
  }

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload Profile Picture</div>
      </div>
    );
    const { imageUrl, firstName, lastName } = this.state;
    let disableBtn = false;
    if(firstName == '' || lastName == ''){
    	disableBtn = true;
    }

    return (
    	<AddWrapper>
	    	<div className='upload-div'>
		      <Upload
		        name="avatar"
		        listType="picture-card"
		        className="avatar-uploader"
		        showUploadList={false}
		        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
		        beforeUpload={beforeUpload}
		        onChange={this.handleChange}
		      >
		        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
		      </Upload>
		    </div>
		    <div className='fields'>
		    	<div className='labels'>
		    		<div>First Name</div>
		    		<div>Last Name</div>
		    	</div>
		    	<div className='input-fields'>
		    		<input
		    			type='text'
		    			placeholder='First Name'
		    			className='inpt'
		    			onChange={(e) => this.handleInputChange('firstName', e.target.value)}
		    		/>
		    		<input
		    			type='text'
		    			placeholder='Last Name'
		    			className='inpt'
		    			onChange={(e) => this.handleInputChange('lastName', e.target.value)}
		    		/>
		    	</div>

		    	<div className='labels'>
		    		<div>Gender</div>
		    		<div>Date of Birth</div>
		    	</div>
		    	<div className='input-fields'>
		    		<Select
		    			placeholder='Gender'
		    			onChange={(e) => this.handleInputChange('gender', e)}
		    		>
				      <Option value="female">Female</Option>
				      <Option value="male">Male</Option>
				      <Option value="other">Other</Option>
		    		</Select>

		    		<DatePicker
		    			placeholder='Date of Birth'
		    			format='MMM D, YYYY'
		    			onChange={(e) => this.handleInputChange('dob', e)}
		    			disabledDate={this.disabledDate}
		    		/>
		    	</div>

		    	<div className='labels'>
		    		<div>Biography</div>
		    	</div>
		    	<div className='input-fields'>
		    		<textarea
		    			placeholder='Biography'
		    			onChange={(e) => this.handleInputChange('bio', e.target.value)}
		    		/>
		    	</div>

		    	<div className='labels'>
		    		<div>Twitter Hashtags</div>
		    	</div>
		    	<div className='input-fields'>
		    		<Select
		    		 	mode="tags"
		    		 	placeholder="Twitter Hashtags"
		    		 	notFoundContent='Type to add tag'
		    		 	className='tags'
		    		 	onChange={(e) => this.handleInputChange('tags', e)}
		    		/>
		    	</div>
		    	<div className='drawer-btns'>
		    		<RedBtn
		    			float='none'
		    			width='100px'
		    			onClick={this.handleSubmit}
		    			disabled={disableBtn}
		    		>
		    			Add
		    		</RedBtn>
		    		<CancelBtn
		    			onClick={this.props.toggle}
		    		>
		    			Cancel
		    		</CancelBtn>
		    	</div>
		    </div>
		  </AddWrapper>
    );
  }
}