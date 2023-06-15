/**
 * External dependencies
 */
import styled from '@emotion/styled';

/**
 * WordPress dependencies
 */
import {
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalUseCustomUnits as useCustomUnits,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';

const SingleColumnToolsPanelItem = styled( ToolsPanelItem )`
	grid-column: span 1;
`;

/**
 * @typedef {import('@wordpress/components/build-types/unit-control/types').WPUnitControlUnit} WPUnitControlUnit
 */

/**
 * @typedef {Object} WidthHeightToolValue
 * @property {string} [width]
 * @property {string} [height]
 */

/**
 * @callback WidthHeightToolOnChange
 * @param {WidthHeightToolValue} nextValue
 * @return {void}
 */

/**
 * @typedef {Object} WidthHeightToolProps
 * @property {string}                   [panelId]          ID of the panel that contains the controls.
 * @property {WidthHeightToolValue}     [value]            Current dimensions values.
 * @property {WidthHeightToolOnChange}  [onChange]         Callback to update the dimensions values.
 * @property {WPUnitControlUnit[]}      [units]            Units options.
 * @property {boolean}                  [isShownByDefault] Whether the panel is shown by default.
 */

/**
 * Component that renders controls to edit the dimensions of an image or container.
 * @param {WidthHeightToolProps} props The component props.
 * @return {import('@wordpress/element').WPElement} The dimensions controls.
 */
export default function WidthHeightTool( {
	panelId,
	value = {},
	onChange = () => {},
	units,
	isShownByDefault = true,
} ) {
	const onDimensionChange = ( dimension ) => ( nextDimension ) => {
		const nextValue = Object.assign( {}, value );
		// Empty strings or undefined may be passed and both represent removing the value.
		if ( ! nextDimension ) {
			delete nextValue[ dimension ];
		} else {
			nextValue[ dimension ] = nextDimension;
		}
		onChange( nextValue );
	};

	return (
		<>
			<SingleColumnToolsPanelItem
				label={ __( 'Width' ) }
				isShownByDefault={ isShownByDefault }
				hasValue={ () => value.width != null }
				onDeselect={ onDimensionChange( 'width' ) }
				panelId={ panelId }
			>
				<UnitControl
					label={ __( 'Width' ) }
					placeholder={ __( 'Auto' ) }
					labelPosition="top"
					units={ units }
					min={ 0 }
					value={ value.width }
					onChange={ onDimensionChange( 'width' ) }
				/>
			</SingleColumnToolsPanelItem>
			<SingleColumnToolsPanelItem
				label={ __( 'Height' ) }
				isShownByDefault={ isShownByDefault }
				hasValue={ () => value.height != null }
				onDeselect={ onDimensionChange( 'height' ) }
				panelId={ panelId }
			>
				<UnitControl
					label={ __( 'Height' ) }
					placeholder={ __( 'Auto' ) }
					labelPosition="top"
					units={ units }
					min={ 0 }
					value={ value.height }
					onChange={ onDimensionChange( 'height' ) }
				/>
			</SingleColumnToolsPanelItem>
		</>
	);
}
