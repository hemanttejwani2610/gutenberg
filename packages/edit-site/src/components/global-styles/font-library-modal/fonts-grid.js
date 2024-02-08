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
		<VStack className="font-library-modal__fonts-grid" as="fieldset">
			{ title && (
				<legend className="font-library-modal__fonts-grid-legend">
					<h2 className="font-library-modal__fonts-grid-title">
						{ title }
					</h2>
				</legend>
			) }
			<ul className="font-library-modal__fonts-grid__list">
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
		</VStack>
	);
}

export default FontsGrid;
