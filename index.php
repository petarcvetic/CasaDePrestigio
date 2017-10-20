<?php
	include('header.inc.html');
	//
?>

<body class="home">
	<div>
		<div id="content">
			<div id="wrapper">
			
<!-- SLIKE --------------------------------------------------------------------------------------------------------->
				<div class="section" data-anchor="textiles-upholstery">
					<img src="img/zavese.jpg" class="background-image" data-index="1" alt="zavese"/>			
				</div><!-- /.section -->
			
				<div class="section" data-anchor="textiles-shade">
					<img src="img/garnisne.jpg" class="background-image" data-index="2" alt="garnisne"/>			
				</div><!-- /.section -->
				
				<div class="section" data-anchor="experiences-uncharted-waters">
					<img src="img/zavesa-zebra.jpg" class="background-image" data-index="3" alt="zebra"/>			
				</div><!-- /.section -->
			
				<div class="section" data-anchor="experiences-sunbrella-canopy">
					<img src="img/paketo.jpg" class="background-image" data-index="4" alt="paketo"/>			
				</div><!-- /.section -->
				
				<div class="section" data-anchor="experiences-future-of-shade">
					<img src="img/tapete.jpg" class="background-image" data-index="5" alt="tapete"/>			
				</div><!-- /.section -->
				
				<div class="section" data-anchor="experiences-sheila-hicks">
					<img src="img/mebli.jpg" class="background-image" data-index="6" alt="mebli"/>			
				</div><!-- /.section -->
				
				<div class="section" data-anchor="collaborations-sunbrella-products">
					<img src="img/dekoracija.jpg" class="background-image" data-index="7" alt="dekoracija"/>			
				</div><!-- /.section -->
				
				<div class="section" data-anchor="collaborations-designers">
					<img src="img/deciji-program.jpg" class="background-image" data-index="8" alt="deciji-program"/>			
				</div><!-- /.section -->
			</div><!-- /#wrapper -->

			

<!-- TRANSPARENTNI PANEL (levo)  ------------------------------------------------------------------>

			<div class="container-fixed">
				<div class="row">
					<div class="col-xs-8 col-md-5 col-sm-offset-1 padding-0 menu-main-wrapper">
						<div id="main-nav" class="nav-block">
							<a href="#"><img src="img/logo1.png" id="logo" class="logo pull-left" alt="logo" ></a>
							<div id="moto" class="design-performance">
								INOVATIVNI, IZAZOVNI I PRESTIŽNI				
							</div><!-- /.design-performance -->
							
							<nav>
								<ul class="nav nav-stacked">
									<li class="off-0">									
										<a class="section-link capitalize" href="#textiles">Zavese</a>
										<ul class="nav nav-stacked">
											<li>
												<a target="" class="slide-item" data-target="#textiles-upholstery" data-menuanchor="textiles-upholstery" href="zavese.php">Zavese i draperije</a>
											</li>
											<li>
												<a target="" class="slide-item" data-target="#textiles-shade" data-menuanchor="textiles-shade" href="garnisne.php">Garnišne</a>
											</li>
										</ul>
									</li>
									
									<li class="off-1">
										<a class="section-link capitalize" href="#experiences">Zavese Sa Mehanizmom</a>
										<ul class="nav nav-stacked">
											<li>
												<a target="" class="slide-item" data-target="#experiences-uncharted-waters" data-menuanchor="experiences-uncharted-waters" href="zebra.php">Zebra, Rolo i Panel</a>
											</li>
										
											<li>
												<a target="" class="slide-item" data-target="#experiences-sunbrella-canopy" data-menuanchor="experiences-sunbrella-canopy" href="paketo.php">Paketo, Plise i Rimska</a>
											</li>
										</ul>
									</li>
									
									<li class="off-2">
										<a class="section-link capitalize" href="#experiences">Tapete</a>
										<ul class="nav nav-stacked">
											<li>
												<a target="" class="slide-item" data-target="#experiences-future-of-shade" data-menuanchor="experiences-future-of-shade" href="tapete.php">Tapete</a>
											</li>
										</ul>
									</li>	
									
											
											
									<li class="off-3">
										<a class="section-link capitalize" href="#experiences">Mebli</a>
										<ul class="nav nav-stacked">	
											<li>
												<a target="" class="slide-item" data-target="#experiences-sheila-hicks" data-menuanchor="experiences-sheila-hicks" href="mebli.php">Mebli</a>
											</li>
										</ul>
									</li>
											
				
									<li class="off-4">
										<a class="section-link capitalize" href="#collaborations">Ostalo</a>
										<ul class="nav nav-stacked">
											<li>
												<a target="" class="slide-item" data-target="#collaborations-sunbrella-products" data-menuanchor="collaborations-sunbrella-products" href="dekoracija.php">Dekoracija</a>
											</li>
											<li>
												<a target="" class="slide-item" data-target="#collaborations-designers" data-menuanchor="collaborations-designers" href="decijiProgram.php">Dečiji program</a>
											</li>
										</ul>
									</li>
								</ul>
							</nav>
						</div><!-- /.col-xs-3 -->
					</div><!-- /#main-nav -->
<!-- END PANEL ---------------------------------------------------------------------------->

<?php
	include('menu.inc.php');
?>	

	<?php
	include('arrows.html');
?>				


		</div><!-- /.nav-utility -->
		
	</div><!-- /#content -->

<?php
	include('end.inc.html');
?>	
	

	</div>
</body>
</html>
