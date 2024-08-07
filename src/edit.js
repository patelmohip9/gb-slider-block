import React, { useState } from 'react';

import { __ } from '@wordpress/i18n';

import { InspectorControls, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';

import './editor.scss';

import { PanelBody, PanelRow, Button, ToggleControl, SelectControl, RangeControl, ColorPicker } from '@wordpress/components';

const { useBlockProps } = wp.blockEditor;

const ALLOWED_MEDIA_TYPES = ['image'];

function MyMediaUploader({ mediaIDs, onSelect }) {
	return (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={onSelect}
				allowedTypes={ALLOWED_MEDIA_TYPES}
				value={mediaIDs}
				render={({ open }) => (
					<Button
						onClick={open}
						className="button button-large"
					>{mediaIDs.length < 1 ? 'Upload/Select Images' : 'Add/Remove slides'}</Button>
				)}
				gallery
				multiple
			/>
		</MediaUploadCheck>
	);
}

export default function Edit({ attributes, setAttributes }) {
	const descriptionChangeHandler = (event, index) => {
		var data = attributes.description;
		data[index] = event;
		data.splice(index, 1, event)
		setAttributes({ description: [...data] });
	}
	const TitleChangeHandler = (event, index) => {
		var data = attributes.title;
		data[index] = event;
		data.splice(index, 1, event)
		setAttributes({ title: [...data] });
	}
	const ImageChangeHandler = (event) => {
		setAttributes({ images: event });
	};
	const DescriptionColorChangeHandler = (event) => {
		setAttributes({ descriptionColor: event.hex });
		setDescriptionColor(event.hex);
	};
	const BackgroundColorChangeHandler = (event) => {
		setAttributes({ backgroundColor: event.hex });
		setBackgroundColor(event.hex);
	};
	const TitleColorChangeHandler = (event) => {
		setAttributes({ titleColor: event.hex });
		setTitleColor(event.hex);
	};
	const positionChanegHandler = (event) => {
		setAttributes({ position: event });
		setPosition(event);
	};
	const blockProps = useBlockProps();
	const [hasDescriptionColor, setDescriptionColor] = useState(attributes.descriptionColor);
	const [hasBackgroundColor, setBackgroundColor] = useState(attributes.backgroundColor);
	const [hasTitleColor, setTitleColor] = useState(attributes.titleColor);
	const [hasPosition, setPosition] = useState(attributes.position);

	return (
		<div {...blockProps}>
			<InspectorControls style={{ marginBottom: '40px' }} >
				<PanelBody title="Slider Settings" initialOpen={true} >
						<p><strong>  Slider loop </strong></p>
					<PanelRow>
						<ToggleControl
							label="Infinite loop"
							help={
								attributes.loop
									? 'Infinite loop.'
									: ''
							}
							checked={attributes.loop}
							onChange={(state) => {
								setAttributes({loop: state});
							}}
						/>
					</PanelRow>

						<p><strong> Select slider effect </strong></p>
					<PanelRow>
						<SelectControl
							label="Effect"
							value={attributes.effect}
							options={[
								{ label: 'Fade', value: 'fade' },
								{ label: 'Flip', value: 'flip' },
								{ label: 'Cube', value: 'cube' },
							]}
							onChange={(newEffect) => setAttributes({effect: newEffect})}
						/>
					</PanelRow>
						<p><strong> Autoplay </strong></p>
					<PanelRow>
						<ToggleControl
							label="Autoplay"
							checked={attributes.autoplay}
							onChange={(state) => {
								setAttributes({autoplay: state });
							}}
						/>
						</PanelRow>
						<PanelRow>
						{attributes.autoplay ?
							<RangeControl
								label="Delay"
								value={attributes.delay}
								onChange={(value) => setAttributes({delay: value })}
								min={2}
								max={10}
							/> : ''
						}
					</PanelRow>
					<p><strong> Select image position </strong></p>
					<PanelRow>
						<SelectControl
							label="Position"
							value={attributes.position}
							options={[
								{ label: 'Left', value: 'initial' },
								{ label: 'Right', value: 'row-reverse' },
							]}
							onChange={(newValue) => positionChanegHandler(newValue)}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<InspectorControls style={{ marginBottom: '40px' }} >
				<PanelBody title="Color Settings" initialOpen={true} >
						<p><strong> Select background color </strong></p>
					<PanelRow>
						<ColorPicker
							color={attributes.backgroundColor}
							onChangeComplete={(event) =>  BackgroundColorChangeHandler(event)}
							enableAlpha
						/>
					</PanelRow>

						<p><strong>Select title text color</strong></p>
					<PanelRow>
						<ColorPicker
							color={attributes.titleColor}
							onChangeComplete={(event) =>  TitleColorChangeHandler(event)}
							enableAlpha
						/>
					</PanelRow>

						<p><strong>  Select description text color </strong></p>
					<PanelRow>
						<ColorPicker
							color={attributes.descriptionColor}
							onChangeComplete={(event) => DescriptionColorChangeHandler(event)}
							enableAlpha
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			{
				attributes.images.length >= 1 ?
					attributes.images.map((item, index) =>
					(
						<div className='block' style={{  flexDirection: hasPosition, backgroundColor: hasBackgroundColor }} >
							<div className='block-image-cover'>
								<p><img className='block-image' src={item.url} width={item.width}/></p>
							</div>
							<div className='block-text'>
								<RichText key="editable" style={{ color: hasTitleColor }} tagName="h2" placeholder="Title" value={attributes.title[index]} onChange={(event) => TitleChangeHandler(event, index)} />
								<RichText key="editable" style={{ color: hasDescriptionColor }} tagName="p" placeholder="Description" value={attributes.description[index]} onChange={(event) => descriptionChangeHandler(event, index)} />
							</div>
						</div>
					)) : <p>Click the button and add some images to your slider</p>
			}
			<MyMediaUploader
				mediaIDs={attributes.images.map(item => item.id)}
				onSelect={ImageChangeHandler}
			/>
		</div >
	);
}
