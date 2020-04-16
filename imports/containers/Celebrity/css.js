import styled from 'styled-components';
import { Layout } from 'antd';
import { RedBG, BorderColor, Placeholder, DisabledBtn, BlueBtn } from '/imports/ui/colorPalette'

export const RedBtn = styled.button`
	background-color: ${RedBG};
	border-radius: 5px;
	color: white;
	width: ${props => props.width ? props.width : 'fit-content'};
	padding: 5px 15px;
	cursor: pointer;
	float: ${props => props.float};
	margin: 0px 10px;
	border: none;

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

export const CelebrityWrapper = styled(Layout)`
	display: inline-flex;
	width: 100%;

	.ant-layout-content {
		width: 100%;
	}

	.add-div {
		margin-bottom: 10px;

		label {
			font-size: 30px;
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

					label {
						font-size: 15px;
						font-weight: 600;	
						width: 78%;
					}
					
					.actions {
				    right: 0;

				    button {
				    	background-color: transparent;	
				    	border: none;
				    	color: ${BlueBtn};
				    	cursor: pointer;

				    	span{
				    		cursor: pointer;
				    	}
				    }
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