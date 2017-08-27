<?php 
/*
Plugin Name: totiusIT Theme Builder
Description: Build your own Bootstrap 3 Theme for Wordpres. Presented by totiusIT
Version: 0.1.0
*/
function create_post_type(){
    register_post_type( 'tts_Layout',
        array(
            'labels' => array(
                    'name' => __( 'Layouts' ),
                    'singular_name' => __( 'Layout' )
                ),
            'public' => true,
            'has_archive' => true,
            'show_in_menu' => false,
            'supports' => array( 'title', 'thumbnail')
        )
    );
}
add_action( 'init', 'create_post_type' );
function totiusit_themebuilder_box_html($post){
?>
<div class="container-fluid">
    <div class="row ttsLayoutbuilder-controlwrapper">
        <div class="col-xs-12">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xs-4">
                    <h5>Layout Parts</h5>
                    <a class="tts-new-container ttsLayoutbuilder-toggleElement">container</a>
                    <a class="tts-new-column ttsLayoutbuilder-toggleElement">column</a>
                    <a class="tts-new-row ttsLayoutbuilder-toggleElement">row</a>
                    </div>
                    <div class="col-xs-4">
                    <h5>Edit active Part</h5>
                    <a class="tts-del ttsLayoutbuilder-toggleElement">delete</a>
                    <a class="tts-edit ttsLayoutbuilder-toggleElement">rename</a>
                    </div>
                </div>                
            </div>
        </div>
    </div>
    <div class="row ttsLayoutbuilder-editwrapper">
        <h4>Editor</h4>
        <div class="col-xs-12 ttsLayoutbuilder-editor">
            
            
        </div>
    </div>
</div>
<?php
}
function totiusit_themebuilder_add_custom_box()
{
    $screen = 'tts_Layout';
        add_meta_box(
            'LayoutView',           // Unique ID
            'Layouts for ThemeBuilder',  // Box title
            'totiusit_themebuilder_box_html',  // Content callback, must be of type callable
            $screen                   // Post type
        );
}
add_action('add_meta_boxes', 'totiusit_themebuilder_add_custom_box');
function totiusit_themebuilder_styles(){
	wp_enqueue_script("ttbuilder-jq", "https://code.jquery.com/jquery-3.2.1.min.js",false,"3.2.1",false);
	wp_enqueue_script("ttbuilder-bootsrtap",plugins_url('bootstrap/js/bootstrap.min.js',__FILE__),array("jQuery"),false,"3.3.7",false);
	wp_enqueue_script("tts",plugins_url('theBuilder.js',__FILE__));
        wp_enqueue_script("ttbuilder-jqui","https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js",false,"3.2.1",array("ttbuilder-jq"),false);
	wp_enqueue_style("ttbuilder-bootsrtap-css",plugins_url('bootstrap/css/bootstrap.min.css',__FILE__),false,"3.3.7",false);
	wp_enqueue_style("ttbuilder-css",plugins_url('style.css',__FILE__),false,"1.0.0",false);

}
add_action( 'admin_enqueue_scripts', 'totiusit_themebuilder_styles' );
function tts_themebuilder_menu() {
	add_menu_page( 'totiusIT menu', 'Theme Builder', 'manage_options', 'totiusIT-menu', 'totiusit_themebuilder_options' );
	add_submenu_page( 'totiusIT-menu', 'Layouts', 'Manage Layouts','manage_options' ,'edit.php?post_type=tts_layout', NULL);
        
}
function totiusit_themebuilder_subsite(){
	if ( !current_user_can( 'manage_options' ) )  {
		wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
	}
	?>
	<div class="wrap">
		<div class="container-fluid">
                    <div class="row">
                        <?php 
                       // foreach() ?>
                    </div>
		</div>
	</div>
	<?php 
}
function totiusit_themebuilder_options() {
	if ( !current_user_can( 'manage_options' ) )  {
		wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
	}
	?>
	<div class="wrap">
		<div class="container-fluid ttsBuilder">
			<div class="row">
				<div class="col-xs-12" id="ttsBuilderControls">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-xs-3"><button id>Bereich</button></div>
                                            
                                        </div>
                                    </div>
				</div>
			</div>
		</div>
	</div>
	<?php 
}
add_action( 'admin_menu', 'tts_themebuilder_menu' );
?>
