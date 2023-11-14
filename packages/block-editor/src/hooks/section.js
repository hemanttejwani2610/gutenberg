/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { getBlockSupport } from '@wordpress/blocks';
import {
	TextControl,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useCallback } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import InspectorControls from '../components/inspector-controls';
import useDisplayBlockControls from '../components/use-display-block-controls';
import { useBlockEditingMode } from '..';

export const SECTION_SUPPORT_KEY = 'section';

const SECTION_SUPPORTED_BLOCKS = [ 'core/group' ];

function hasSectionSupport( blockType ) {
	return !! getBlockSupport( blockType, SECTION_SUPPORT_KEY );
}

/**
 * Filters the registered block settings, extending attributes to include section.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
function addAttribute( settings ) {
	if ( ! hasSectionSupport( settings ) ) {
		return settings;
	}

	if ( ! settings.attributes.section ) {
		Object.assign( settings.attributes, { section: { type: 'number' } } );
	}

	return settings;
}

/**
 * Filters registered block settings to extend the block edit wrapper to apply
 * the section class name.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
function addEditProps( settings ) {
	if (
		! hasSectionSupport( settings ) ||
		! SECTION_SUPPORTED_BLOCKS.includes( settings.name )
	) {
		return settings;
	}

	const existingGetEditWrapperProps = settings.getEditWrapperProps;
	settings.getEditWrapperProps = ( attributes ) => {
		let props = {};

		if ( existingGetEditWrapperProps ) {
			props = existingGetEditWrapperProps( attributes );
		}

		// A render hook will handle class application on the PHP side
		if ( attributes.section === undefined ) {
			return props;
		}

		// TODO: Handle fallback logic if the current section index isn't available.
		const sectionClass = `wp-section-${ attributes.section }`;
		const newClassName = classnames( props.className, sectionClass );

		props.className = newClassName ? newClassName : undefined;

		return props;
	};

	return settings;
}

function SectionPanelItem( props ) {
	const { attributes, clientId, setAttributes } = props;

	const resetAllFilter = useCallback( ( previousValue ) => {
		return {
			...previousValue,
			section: undefined,
		};
	}, [] );

	return (
		<ToolsPanelItem
			hasValue={ () => !! attributes.section }
			label={ __( 'Section' ) }
			onDeselect={ () => setAttributes( { section: undefined } ) }
			isShownByDefault={ true }
			resetAllFilter={ resetAllFilter }
			panelId={ clientId }
		>
			<TextControl
				__nextHasNoMarginBottom
				label={ __( 'Index' ) }
				value={ attributes.section ?? '' }
				onChange={ ( nextValue ) => {
					setAttributes( {
						section:
							nextValue !== ''
								? parseInt( nextValue, 10 )
								: undefined,
					} );
				} }
			/>
		</ToolsPanelItem>
	);
}

function SectionPanel( props ) {
	// TODO: Add theme.json setting to disable section styling.

	if ( ! hasSectionSupport( props.name ) ) {
		return null;
	}

	return (
		<InspectorControls group="section">
			<SectionPanelItem { ...props } />
		</InspectorControls>
	);
}

const withSectionControls = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		if ( ! hasSectionSupport( props.name ) ) {
			return <BlockEdit key="edit" { ...props } />;
		}

		const shouldDisplayControls = useDisplayBlockControls();
		const blockEditingMode = useBlockEditingMode();

		return (
			<>
				{ shouldDisplayControls && blockEditingMode === 'default' && (
					<SectionPanel { ...props } />
				) }
				<BlockEdit key="edit" { ...props } />
			</>
		);
	},
	'withSectionControls'
);

addFilter(
	'blocks.registerBlockType',
	'core/section/addAttribute',
	addAttribute
);

addFilter(
	'blocks.registerBlockType',
	'core/section/addEditProps',
	addEditProps
);

addFilter(
	'editor.BlockEdit',
	'core/section/with-section-controls',
	withSectionControls
);
