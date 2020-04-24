import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { LayoutWrapper } from './globalStyles';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { CelebrityContainer } from '../containers/Celebrity/index.jsx'
import { Info } from './Info'

const { Header, Footer, Content } = Layout;

export const App = () => {

	const navigation = ({item, key, keyPath, selectedKeys, domEvent}) => {
	  window.location.href = key;
	};

	let nav = window.location.pathname;

	return (
		<LayoutWrapper>
	  	<Header>
	  		<img src='https://i.imgur.com/a9Dxo6e.png' />
	  	</Header>
	  	<Content className='main-content'>
	  		<Router>
		  		<Switch>
		        <Route exact path="/" component={CelebrityContainer} />
		        <Route exact path="/twitter" component={Info} />
		      </Switch>
		    </Router>
	  	</Content>
	  </LayoutWrapper>

	)

}
