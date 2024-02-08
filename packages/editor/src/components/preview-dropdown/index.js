/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import {
	DropdownMenu,
	MenuGroup,
	MenuItem,
	VisuallyHidden,
	Icon,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { check, desktop, mobile, tablet, external } from '@wordpress/icons';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { store as preferencesStore } from '@wordpress/preferences';
import { store as blockEditorStore } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import PostPreviewButton from '../post-preview-button';

export default function PreviewDropdown( { forceIsAutosaveable, disabled } ) {
	const {
		deviceType,
		homeUrl,
		isTemplate,
		isViewable,
		showIconLabels,
		blockEditorMode,
	} = useSelect( ( select ) => {
		const { __unstableGetEditorMode } = select( blockEditorStore );
		const { getDeviceType, getCurrentPostType } = select( editorStore );
		const { getUnstableBase, getPostType } = select( coreStore );
		const { get } = select( preferencesStore );
		const _currentPostType = getCurrentPostType();
		return {
			blockEditorMode: __unstableGetEditorMode(),
			deviceType: getDeviceType(),
			homeUrl: getUnstableBase()?.home,
			isTemplate: _currentPostType === 'wp_template',
			isViewable: getPostType( _currentPostType )?.viewable ?? false,
			showIconLabels: get( 'core', 'showIconLabels' ),
		};
	}, [] );
	const { setDeviceType } = useDispatch( editorStore );
	const { __unstableSetEditorMode } = useDispatch( blockEditorStore );
	const isZoomedOutViewExperimentEnabled =
		window?.__experimentalEnableZoomedOutView;
	const isZoomedOutView = blockEditorMode === 'zoom-out';
	const isMobile = useViewportMatch( 'medium', '<' );

	if ( isMobile ) return null;

	const popoverProps = {
		placement: 'bottom-end',
	};
	const toggleProps = {
		className: 'editor-preview-dropdown__toggle',
		size: 'compact',
		showTooltip: ! showIconLabels,
		disabled,
		__experimentalIsFocusable: disabled,
	};
	const menuProps = {
		'aria-label': __( 'View options' ),
	};

	const deviceIcons = {
		mobile,
		tablet,
		desktop,
	};

	return (
		<DropdownMenu
			className="editor-preview-dropdown"
			popoverProps={ popoverProps }
			toggleProps={ toggleProps }
			menuProps={ menuProps }
			icon={ deviceIcons[ deviceType.toLowerCase() ] }
			label={ __( 'View' ) }
			disableOpenOnArrowDown={ disabled }
		>
			{ ( { onClose } ) => (
				<>
					<MenuGroup>
						<MenuItem
							onClick={ () => {
								setDeviceType( 'Desktop' );
								__unstableSetEditorMode( 'edit' );
							} }
							icon={ deviceType === 'Desktop' && check }
						>
							{ __( 'Desktop' ) }
						</MenuItem>
						<MenuItem
							onClick={ () => {
								setDeviceType( 'Tablet' );
								__unstableSetEditorMode( 'edit' );
							} }
							icon={ deviceType === 'Tablet' && check }
						>
							{ __( 'Tablet' ) }
						</MenuItem>
						<MenuItem
							onClick={ () => {
								setDeviceType( 'Mobile' );
								__unstableSetEditorMode( 'edit' );
							} }
							icon={ deviceType === 'Mobile' && check }
						>
							{ __( 'Mobile' ) }
						</MenuItem>
					</MenuGroup>
					{ isZoomedOutViewExperimentEnabled && (
						<MenuGroup>
							<MenuItem
								onClick={ () => {
									__unstableSetEditorMode( 'edit' );
								} }
								icon={ ! isZoomedOutView && check }
							>
								{ __( 'Zoom to 100%' ) }
							</MenuItem>
							<MenuItem
								onClick={ () => {
									setDeviceType( 'Desktop' );
									__unstableSetEditorMode( 'zoom-out' );
								} }
								icon={ isZoomedOutView && check }
								disabled={ deviceType !== 'Desktop' }
							>
								{ __( 'Zoom to 50%' ) }
							</MenuItem>
						</MenuGroup>
					) }
					{ isTemplate && (
						<MenuGroup>
							<MenuItem
								href={ homeUrl }
								target="_blank"
								icon={ external }
								onClick={ onClose }
							>
								{ __( 'View site' ) }
								<VisuallyHidden as="span">
									{
										/* translators: accessibility text */
										__( '(opens in a new tab)' )
									}
								</VisuallyHidden>
							</MenuItem>
						</MenuGroup>
					) }
					{ isViewable && (
						<MenuGroup>
							<PostPreviewButton
								className="editor-preview-dropdown__button-external"
								role="menuitem"
								forceIsAutosaveable={ forceIsAutosaveable }
								textContent={
									<>
										{ __( 'Preview in new tab' ) }
										<Icon icon={ external } />
									</>
								}
								onPreview={ onClose }
							/>
						</MenuGroup>
					) }
				</>
			) }
		</DropdownMenu>
	);
}
