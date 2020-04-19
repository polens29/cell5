import styled, { css } from 'styled-components';
import { Layout } from 'antd';
import { RedBG, BorderColor, Placeholder, DisabledBtn, BlueBtn } from '/imports/ui/colorPalette'

const fontSize = css`
	font-size: 13px;
`;

export const RedBtn = styled.button`
	background-color: ${RedBG};
	border-radius: 5px;
	color: white;
	width: ${props => props.width ? props.width : 'fit-content'};
	padding: 5px 15px;
	cursor: pointer;
	float: ${props => props.float};
	margin: 0px 0px 0px 10px;
	border: none;
	height: 32px;
	${fontSize}

	&:disabled {
		cursor: not-allowed;
		background-color: ${DisabledBtn};
	}
`;

export const CancelBtn = styled.button`
	color: ${RedBG};
	border: none;
	background-color: white;
	width: fit-content;
	padding: 5px 15px;
	cursor: pointer;
	margin: 0px 10px;
`;

export const ViewWrapper = styled.div`
	display: grid;

	.actions {
    right: 0;
    margin-bottom: 20px;

    button {
    	background-color: transparent;	
    	border: none;
    	color: ${BlueBtn};
    	cursor: pointer;
    	float: right;
    	font-size: 14px;
    	padding-right: 10px;

    	span{
    		cursor: pointer;
    		font-size: 15px;
    		margin-right: 3px;
    	}
    }
	}

	.image {
		width: 100%;
		text-align: center;

		img{
			max-width: 70%;
	    margin: auto;
	    border-radius: 5px;
		}
	}

	.content {
		display: grid;
		padding: 20px;

		span {
			margin-bottom: 10px;
			font-size: 15px;

			label {
				font-weight: 600;
			}
		}

		.ant-tag {
			cursor: pointer;
			padding-top: 5px;

			.anticon {
				vertical-align: sub;
				margin-bottom: 5px;
			}
		}
	}

`;


const blueBorder = css`
	border: 1px solid ${BlueBtn};
	border-radius: 5px;
	height: 32px;
	display: inline-flex;
`;


export const CelebrityWrapper = styled(Layout)`
	display: inline-flex;
	width: 100%;

	.ant-layout-content {
		width: 100%;
	}



	.add-div {
		margin-bottom: 10px;
		display: inline-flex;
		width: 100%;

		label {
			font-size: 22px;
		}

		.right {
			position: absolute;
    	right: 5%;
    	display: inline-flex;

    	.sort {
    		margin-right: 20px;

    		label {
    			${fontSize}
    			margin-right: 10px;
    		}

    		.active {
    			color: ${BlueBtn};
    		}

    		.anticon {
    			font-size: 18px;
    			vertical-align: middle;
    		}

    		.ant-select {
    			width: 150px;
    			margin-right: 10px;

    			.ant-select-selector {
    				${blueBorder}
    				${fontSize}
    			}

    			.ant-select-selection-search {
    				${fontSize}
    			}
    		}
    	}
		}

		.search {
			${blueBorder}
			width: 250px;

			input {
				width: 100%;
				border: none;
				border-radius: 5px;
    		padding-left: 15px;
    		${fontSize}
			}

			span {
				background-color: ${BlueBtn};
		    color: white;
		    width: 40px;
		    font-size: 20px;
		    padding-top: 5px;
		    cursor: pointer;
			}
		}
	}

	.ant-card {
		cursor: pointer;

		.ant-card-body {
			padding: 0px;

			.imgDiv {
				height: 160px;
    		overflow-y: hidden;
				
				img {
					min-height: 160px;
					width: 100%;
					border-top-right-radius: 5px;
					border-top-left-radius: 5px;
				}	
			}

			.content {
				padding: 10px;
				display: grid;
				font-size: 13px;

				.name {
					display: inline-flex;
					cursor: pointer;

					label {
						font-size: 15px;
						font-weight: 600;	
						width: 100%;
						cursor: pointer;
					}
					
				}

				.bio {
				  white-space: nowrap;
				  overflow: hidden;
				  text-overflow: ellipsis;
				
				}
			}
		}
	}
`;

export const AddWrapper = styled.div`
	.upload-div {
		width: fit-content;
		margin: auto;
		margin-bottom: 20px;
	}

	.fields {
		display: block;

		.labels {
			display: inline-flex;
			width: 100%;

			div {
				width: 46%;
				margin-left: 2px;
			}

			div:first-child {
				margin-right: 25px;
			}
		}

		.input-fields{
			margin-bottom: 20px;

			.inpt, .ant-select, .ant-picker {
				width: 47%;
			}

			.inpt, textarea{
				border: 1px solid ${BorderColor};
				padding: 5px 10px;
				border-radius: 5px;

				::placeholder {
					color: ${Placeholder};
				}
			}

			.inpt:first-child, .ant-select {
				margin-right: 25px;
			}

			textarea {
				width: 100%;
				height: 100px;
				resize: none;
			}

			.tags {
				width: 100%;
			}

		}
	}

	.drawer-btns {
		width: fit-content;
		float: right;
	}

`;