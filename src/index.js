
import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';

registerBlockType( 'gurenberg/slider-block', {
	attributes: {
		title: {
			type: 'array',
			default: [],
		},
		description: {
			type: 'array',
			default: [],
		},
		images:{
			type: 'array',
			default: [],
		},
		loop:{
			type: 'boolean',
			default: true
		},
		effect:{
			type: 'string',
			default: 'fade'
		},
		autoplay:{
			type: 'boolean',
			default: true
		},
		delay:{
			type: 'number',
			default: '3'
		},
		titleColor:{
			type: 'string',
			default: 'white'
		},
		descriptionColor:{
			type: 'string',
			default: 'gray'
		},
		backgroundColor:{
			type: 'string',
			default: 'black'
		},
		position:{
			type: 'string',
			default: 'row-reverse'
		},
		
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	save: props => {
		return null;
	},
	
} );
