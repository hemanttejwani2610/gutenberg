/**
 * WordPress dependencies
 */
import { __experimentalVStack as VStack } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

function FontsGrid( { title, children, pageSize = 32 } ) {
	const [ lastItem, setLastItem ] = useState( null );
	const [ page, setPage ] = useState( 1 );
	const itemsLimit = page * pageSize;
	const items = children.slice( 0, itemsLimit );

	useEffect( () => {
		if ( lastItem ) {
			const observer = new window.IntersectionObserver( ( [ entry ] ) => {
				if ( entry.isIntersecting ) {
					setPage( ( prevPage ) => prevPage + 1 );
				}
			} );

			observer.observe( lastItem );

			return () => observer.disconnect();
		}
	}, [ lastItem ] );

	return (
		<VStack className="font-library-modal__fonts-grid">
			{ title && (
				<h2 className="font-library-modal__fonts-grid-title">
					{ title }
				</h2>
			) }
			{ /*
			 * Disable reason: The `list` ARIA role is redundant but
			 * Safari+VoiceOver won't announce the list otherwise.
			 */
			/* eslint-disable jsx-a11y/no-redundant-roles */ }
			<ul role="list" className="font-library-modal__fonts-grid__list">
				{ items.map( ( child, i ) => (
					<li
						className="font-library-modal__fonts-grid__list-item"
						key={ child.key }
						ref={ i === itemsLimit - 1 ? setLastItem : undefined }
					>
						{ child }
					</li>
				) ) }
			</ul>
			{ /* eslint-enable jsx-a11y/no-redundant-roles */ }
		</VStack>
	);
}

export default FontsGrid;
