<?php
/**
 * WP_Style_Engine_CSS_Rules_Container
 *
 * A container for WP_Style_Engine_CSS_Rule objects.
 *
 * @package Gutenberg
 */
// @TODO new file and tests
// Should have same/similar interface to WP_Style_Engine_CSS_Rule or maybe even part of it?

if ( ! class_exists( 'WP_Style_Engine_CSS_Rules_Container' ) ) {
	/**
	 * Holds, sanitizes, processes and prints nested CSS rules for the Style Engine.
	 *
	 * @access private
	 */
	class WP_Style_Engine_CSS_Rules_Container {
		/**
		 * A parent CSS selector in the case of nested CSS, or a CSS nested @rule, such as `@media (min-width: 80rem)` or `@layer module`
		 *
		 * @var string
		 */
		protected $container;

		/**
		 * The container declarations.
		 *
		 * Contains a WP_Style_Engine_CSS_Rule object.
		 *
		 * @var WP_Style_Engine_CSS_Rule[]
		 */
		protected $rules = array();

		/**
		 * Constructor
		 *
		 * @param string                                              $container A parent CSS selector in the case of nested CSS, or a CSS nested @rule,
		 *                                                                       such as `@media (min-width: 80rem)` or `@layer module`.
		 * @param WP_Style_Engine_CSS_Rule[]|WP_Style_Engine_CSS_Rule $rule      A WP_Style_Engine_CSS_Rule object.
		 */
		public function __construct( $container = '', $rule ) {
			$this->set_container( $container );
			$this->add_rules( $rule );
		}

		/**
		 * Sets the container.
		 *
		 * @param string $container A parent CSS selector in the case of nested CSS, or a CSS nested @rule,
		 *                          such as `@media (min-width: 80rem)` or `@layer module`.
		 *
		 * @return WP_Style_Engine_CSS_Rules_Container Returns the object to allow chaining of methods.
		 */
		public function set_container( $container ) {
			if ( ! empty( $container ) ) {
				$this->container = $container;
			}
			return $this;
		}

		/**
		 * Gets the container.
		 *
		 * @return string Container.
		 */
		public function get_container() {
			return $this->container;
		}

		/**
		 * Gets all nested rules.
		 *
		 * @return WP_Style_Engine_CSS_Rule[]
		 */
		public function get_rules() {
			return $this->rules;
		}

		/**
		 * Gets a stored nested rules.
		 *
		 * @return WP_Style_Engine_CSS_Rule
		 */
		public function get_rule( $selector ) {
			return $this->rules[ $selector ] ?? null;
		}

		/**
		 * Adds the rules.
		 *
		 * @param WP_Style_Engine_CSS_Rule|WP_Style_Engine_CSS_Rule[] $container_rules An array of declarations (property => value pairs),
		 *                                                             or a WP_Style_Engine_CSS_Declarations object.
		 *
		 * @return WP_Style_Engine_CSS_Rules_Container Returns the object to allow chaining of methods.
		 */
		public function add_rules( $container_rules ) {
			if ( ! is_array( $container_rules ) ) {
				$container_rules = array( $container_rules );
			}

			foreach ( $container_rules as $rule ) {
				if ( ! $rule instanceof WP_Style_Engine_CSS_Rule ) {
					_doing_it_wrong(
						__METHOD__,
						__( 'Rules passed to WP_Style_Engine_CSS_Rules_Containermust be an instance of WP_Style_Engine_CSS_Rule', 'default' ),
						'6.6.0'
					);
					continue;
				}

				$container = $rule->get_container();

				if ( $container !== $this->container ) {
					_doing_it_wrong(
						__METHOD__,
						__( 'Rules passed to WP_Style_Engine_CSS_Rules_Container must have the same container as the container object', 'default' ),
						'6.6.0'
					);
					continue;
				}

				$selector  = $rule->get_selector();

				if ( isset( $this->rules[ $selector ] ) ) {
					$this->rules[ $selector ]->add_declarations( $rule->get_declarations() );
				} else {
					$this->rules[ $selector ] = $rule;
				}
			}

			return $this;
		}

		/**
		 * Gets the nested CSS.
		 *
		 * @param bool   $should_prettify Whether to add spacing, new lines and indents.
		 * @param number $indent_count    The number of tab indents to apply to the rule. Applies if `prettify` is `true`.
		 *
		 * @return string
		 */
		public function get_css( $should_prettify = false, $indent_count = 0 ) {
			$css                 = '';
			$indent_count         = $should_prettify ? $indent_count + 1 : $indent_count;
			$new_line            = $should_prettify ? "\n" : '';
			$spacer              = $should_prettify ? ' ' : '';
			foreach ( $this->rules as $rule ) {
				$css .= $rule->get_css( $should_prettify, $indent_count );
				$css .= $should_prettify ? "\n" : '';
			}

			if ( empty( $css ) ) {
				return '';
			}

			return "{$this->container}{$spacer}{{$new_line}{$css}}";
		}
	}
}
