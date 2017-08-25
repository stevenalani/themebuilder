
<?php 
/*
Plugin Name: totiusIT Theme Builder
Description: Build your own Bootstrap 3 Theme for Wordpres. Presented by totiusIT
Version: 0.1.0
*/

function totiusit_themebuilder_styles(){
	wp_enqueue_script("ttbuilder-jq", "https://code.jquery.com/jquery-3.2.1.min.js",false,"3.2.1",false);
	wp_enqueue_script("ttbuilder-bootsrtap",plugins_url('bootstrap/js/bootstrap.min.js',__FILE__),array("jQuery"),false,"3.3.7",false);
	wp_enqueue_style("ttbuilder-bootsrtap-css",plugins_url('bootstrap/css/bootstrap.min.css',__FILE__),false,"3.3.7",false);
	wp_enqueue_style("ttbuilder-css",plugins_url('style.css',__FILE__),false,"1.0.0",false);
}
add_action( 'admin_enqueue_scripts', 'totiusit_themebuilder_styles' );


function my_plugin_menu() {
	add_options_page( 'totiusIT', 'Theme Builder', 'manage_options', 'my-unique-identifier', 'totiusit_themebuilder_options' );
}

function totiusit_themebuilder_options() {
	if ( !current_user_can( 'manage_options' ) )  {
		wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
	}
	?>
	<div class="wrap">
		<div class="container-fluid">
			<div class="row">
				<div class="col-xs-12" id="ttsOptions">
				</div>
			</div>
		</div>
	</div>
	<?php 
}
add_action( 'admin_menu', 'my_plugin_menu' );
?>
