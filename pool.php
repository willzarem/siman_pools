<?php
include 'inc/config-facebook.php';
?>
<!doctype html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<title>Quiniela Futbolera - Siman</title>
	<!-- METAS -->
	<meta name="description" content="" />
	<meta name="keywords" content=""/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!--[if lt IE 9]>
		<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<!-- LINKS -->
	<link rel="author" href="humans.txt">
	<link rel="stylesheet" href="css/style.css">
	<!-- scripts -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="../common/js/vendor/jquery.min.js"><\/script>')</script>
	<script src="../common/js/vendor/moment-with-langs.min.js"></script>
	<script src="../common/js/core/config.js?v=3"></script>
	<script src="../common/js/core/appManager.js?v=3"></script>
	<script src="../common/js/core/core.js?v=3"></script>
	<script src="js/pool.js?v=4" ></script>
	<script src="js/vendor/jquery.nanoscroller.js"></script>
	<script src="js/vendor/jquery.easing.1.3.js"></script>
	<script src="js/vendor/hoverIntent.js"></script>
	<script src="js/vendor/superfish.js"></script>
	<script src="js/quiniela.js"></script>
</head>
<body>
	<?php
	include '../common/inst-facebook.php';
	include 'inc/header.php';
	include 'inc/quiniela.php';
	include 'inc/footer.php';
	include 'inc/lightbox-instrucciones.php';
	include 'inc/lightbox-ranking.php';
	include 'inc/mis-datos.php';
	include 'inc/premios.php';
	include 'inc/terminos.php';
	include 'inc/loader.php';
	include 'inc/analytic.php';
	?>
</body>
</html>