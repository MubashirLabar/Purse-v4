<?php 
/*Header.php*/ 
global $_USER, $_DEVICE; 
if(file_exists(__DIR__ . "/langs/en.php")){
	include_once(__DIR__ . "/langs/en.php");
	addToLang('client', $theme_lang_client);
}
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://opg.me/ns#" itemscope itemtype="http://schema.org/Article" xmlns:fb="http://www.facebook.com/2008/fmbl">
<head>
	<?php   
		getMeta(); 
		loadCSS(array(
			'core' => array('props.css', 'scrollbar.css', 'lightpick.css','uifonts.css','cropper.css'),
			'theme' => array('style.css', 'uifonts.css', 'media.css'),
			'remote' => array(
				'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&family=Varela+Round&display=swap',
				"https://i.icomoon.io/public/temp/319b96e644/UntitledProject/style.css"
			) 
		)); 
		loadCSSQue(); 
	?>
	<title><?php 
		$prefix = SITE_NAME;
		$suffix = SITE_SLOGAN;
		/*if($currentRequest->is==="page"){
			switch($currentRequest->page):
				case "index":
				break;
			endswitch;
		}*/
		echo $prefix . TITLE_SEPERATOR . $suffix;
	?></title>
	<?php GoogleAnalytics(); ?>
</head>
<body class="<?php echo $_DEVICE->isMobile() ? "m" : ""; echo getSetting("nav_mod", "sidebar") == "header" ? " with-header" : "" ?>">