import React, {useState} from 'react';
import { Modal, Tag, notification, Spin, Skeleton, Empty } from 'antd';
import { ViewWrapper } from './css'
import moment from 'moment';
import { TwitterOutlined, EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { TwitterTweetEmbed } from 'react-twitter-embed'


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

export const TweetsView = (props) => {
	let { tweets, setShowTweets, tag } = props;

	return (
		<ViewWrapper>
			{
				tweets.length > 0 && (
					<div>
						<label>
							<ArrowLeftOutlined
								className='back-btn'
								onClick={() => setShowTweets(false)}
							/>

							Showing 20 Tweets of #{tag}

						</label>
						<div className='tweets'>
							{
								tweets &&
								tweets.map((tweet, index) => {
									return (
										<TwitterTweetEmbed
											tweetId={tweet}
											placeholder={<Skeleton />}
											key={index}
										/>
									)
								})
							}
						</div>
					</div>
				)
			}
			{
				tweets.length == 0 && (
					<div>
						<ArrowLeftOutlined
							className='back-btn'
							onClick={() => setShowTweets(false)}
							style={{textAlign:'left'}}
						/>
						<Empty description='No Tweets Available'/>
					</div>
				)
			}
			
		</ViewWrapper>
	)
}


export const CelebrityView = (props) => {

	const [showTweets, setShowTweets] = useState(false);
	const [tweets, setTweets] = useState([]);
	const [tag, setTag] = useState('');
	const [loading, setLoad] = useState(false);

	requestTweet = (tag) => {
		setLoad(true);
		let url = encodeURI('http://localhost:5000/twitter?query='+tag)
		fetch(url, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(data => {
      	setTweets(data)
      	setShowTweets(!showTweets)
      	setTag(tag)
      	setLoad(false)
      })
      .catch(function() {
	        setLoad(false);
			  	notification.error({
				    message: "Can't connect to Twitter right now"
				  });
	    });
	}

	const item = props.item;
	if(showTweets){
		return (
			<TweetsView
				tweets={tweets}
				tag={tag}
				setShowTweets={setShowTweets}
			/>
		)
	}
	else if(loading){
		return (
			<ViewWrapper>
				<Spin />
			</ViewWrapper>
		)
	}

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
						<Tag
							icon={<TwitterOutlined />}
							color="#55acee"
							key={index}
							onClick={() => requestTweet(tag)}
						>
							{tag}
						</Tag>
						))}
				</span>

			</div>	
		</ViewWrapper>
	)
}