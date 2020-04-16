import styled from 'styled-components';
import { Layout } from 'antd';
import { RedBG } from './colorPalette'

export const LayoutWrapper = styled(Layout)`
	background-color: white;

	.ant-layout {
		background-color: white;
	}

	.ant-layout-header {
		background-color: ${RedBG};
		color: white;
		display: inline-flex;
		width: 100%;

		.ant-menu {
			background-color: ${RedBG};
			font-size: 18px;

			.ant-menu-item-selected {
				background-color: ${RedBG};
    		font-weight: 600;
			}
		}

		.nav {
			margin: 6px 20px 0px 20px;
			cursor: pointer;
	    width: 100px;
	    text-align: center;
		}

		.active {
			border-bottom: 2px solid white;
			font-weight: bold;
		}

		img {
			width: 60px;
			margin: 10px 50px 10px 20px;
		}
	}

	.main-content {
		width: 90%;
		margin: auto;
		margin-top: 30px;
	}

`;