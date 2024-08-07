<?php
/**
 * Plugin Name:       GutenSlider Block
 * Description:       GutenSlider block is a custom Gutenberg Block that provides multiple images slider with text.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:          <a href="https://profiles.wordpress.org/patelmohip/">Mohip Patel</a>
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html   
 *
 * @package           gurenberg
 */

function slider_block_init()
{
	wp_register_style(
		'gurenberg-slides-style-css',
		plugin_dir_url(__FILE__).'assets/css/swiper-bundle.min.css',
		is_admin() ? array('wp-editor') : null,
		null
	);
	wp_register_script(
		'gurenberg-slides-block-js',
		plugin_dir_url(__FILE__).'assets/js/swiper-bundle.min.js',
		is_admin() ? array('wp-editor') : null,
		null,
		false
	);

	register_block_type(
		__DIR__,
		array(
			'style'           => 'gurenberg-slides-style-css',
			'script'          => 'gurenberg-slides-block-js',
			'render_callback' => 'slider_block_slideshow_render_callback',

			'attributes'      => array(
				'title'        => array(
					'type'    => 'array',
					'default' => '',
				),
				'description'  => array(
					'type'    => 'array',
					'default' => '',
				),
				'images' => array(
					'type'    => 'array',
					'default' => '',
				),
				'titleColor' => array(
					'type' => 'string',
					'default' => 'white'
				),
				'descriptionColor' => array(
					'type' => 'string',
					'default' => 'gray'
				),
				'backgroundColor' => array(
					'type' => 'string',
					'default' => 'black'
				),
				'position' => array(
					'type' => 'string',
					'default' => 'row-reverse'
				),
				'loop' => array(
					'type' => 'boolean',
					'default' => true
				),
				'effect' => array(
					'type' => 'string',
					'default' => 'fade'
				),
				'autoplay' => array(
					'type' => 'boolean',
					'default' => true
				),
				'delay' => array(
					'type' => 'number',
					'default' => 3
				),
			),
		)
	);
}
add_action('init', 'slider_block_init');

function slider_block_scripts() {
	wp_enqueue_style(
		'style-css',
		plugins_url( 'assets/css/style.css', __FILE__ ),
		[],
	);
}
add_action( 'enqueue_block_assets', 'slider_block_scripts' );

function slider_block_slideshow_render_callback($attributes)
{
	ob_start();
	if (!$attributes['images'] == '') {
?>
		<div class="swiper">
			<div class="swiper-wrapper" id="sliderBlock" data-loop="<?php esc_attr_e($attributes['loop']); ?>" data-autoplay="<?php esc_attr_e($attributes['autoplay']); ?>" data-effect="<?php esc_attr_e($attributes['effect']); ?>" data-delay="<?php esc_attr_e($attributes['delay']); ?>">
				<?php
				foreach ( $attributes['images'] as $index=>$item ) {
					?>
					<div class="swiper-slide" style=" flex-direction: <?php esc_attr_e($attributes['position']); ?>; background-color: <?php esc_attr_e($attributes['backgroundColor']); ?>">
						<div style="width: 100%; float: left;  ">
							<img class="swiper-image" src="<?php echo esc_url($item['url'], 'slider_block'); ?>"  />
						</div>
						<div class="swiper-text" >
							<?php
								if(isset($attributes['title'][$index])) { ?>
									<h2 style=" color: <?php esc_attr_e($attributes['titleColor']); ?> "><?php esc_html_e( $attributes['title'][$index], 'slider_block' ); ?></h2>
									<?php
								}
								if( isset( $attributes['description'][$index] ) ) {?>
										<p style=" color: <?php esc_attr_e($attributes['descriptionColor']); ?> "><?php esc_html_e( $attributes['description'][$index], 'slider_block' ); ?></p>
									<?php
								}
							?>
						</div>
					</div>
					<?php
				}
				?>
			</div>
			<div class="swiper-pagination"></div>
			<?php
			if (count($attributes['images']) !== 1) {
				?>
				<div class="swiper-button-prev"></div>
				<div class="swiper-button-next"></div>
				<?php
			}
			?>
		</div>

		<script>
			var slideLoop = document.getElementById("sliderBlock").getAttribute("data-loop");
			var slideAutoplay = document.getElementById("sliderBlock").getAttribute("data-autoplay");
			var slideEffect = document.getElementById("sliderBlock").getAttribute("data-effect");
			var slideDelay = document.getElementById("sliderBlock").getAttribute("data-delay");

			var autoplayData = slideAutoplay ? {
				delay: 1000 * slideDelay,
				disableOnInteraction: false,
			} : '';
			var loopData = slideLoop ? true : false;
			const swiper = new Swiper('.swiper', {
				loop: loopData,

				pagination: {
					el: '.swiper-pagination',
					"dynamicBullets": true
				},

				effect: slideEffect,

				cubeEffect: {
					shadow: false,
					slideShadows: false,
					shadowOffset: 1,
					shadowScale: 0.94,
				},
				creativeEffect: {
					prev: {
						shadow: true,
						translate: [0, 0, -400],
					},
					next: {
						translate: ["100%", 0, 0],
					},
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				keyboard: {
					enabled: true,
				},
				grabCursor: true,
				autoplay: autoplayData
			});
		</script>
<?php
	}
	return ob_get_clean();
}
