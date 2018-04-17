app.Screen = function() {
	var object = {};
	object.template_ranking = '<div class="user-ranking" >'+
	'<div class="number">{position}</div>'+
	'<div class="photo">'+
	'<img width="48" height="50" src="{url_img}" alt="">'+
	'</div>'+
	'<div class="name">'+
	'{first_name}<br>'+
	'{points}' +' PTS'+
	'</div>'+
	'</div>';

	object.templateFormulario = '<form method="post" id="form_user">'+
	'<label for="nombre">Nombre: *</label>'+
	'<div class="input-datos">'+
	'<input id="nombre" class="input_text" type="text" name="nombre" value="{first_name}">'+
	'</div>'+
	'<label for="apellido">Apellido: *</label>'+
	'<div class="input-datos">'+
	'<input id="apellido" class="input_text" type="text" name="apellido" value="{last_name}">'+
	'</div>'+
	'<label for="correo-electronico">Correo Electrónico: *</label>'+
	'<div class="input-datos">'+
	'<input id="correo-electronico" class="input_email" type="text" name="correo-electronico" value="{email}">'+
	'</div>'+
	'<label for="dpi">DPI: *</label>'+
	'<div class="input-datos">'+
	'<input id="dpi" class="input_number input_dpi" type="text" name="dpi" value="{dpi}">'+
	'</div>'+
	'<label for="telefono">Teléfono: *</label>'+
	'<div class="input-datos">'+
	'<input id="telefono" class="input_number input_telefono" type="text" name="telefono" value="{telefono}">'+
	'</div>'+
	'<label for="telefono">Número de Factura: *</label>'+
	'<div class="input-datos">'+
	'<input id="factura" class="input_text input_factura" type="text" name="factura" value="{factura}">'+
	'</div>'+
	'<div class="clear"></div>'+
	'<div class="boton-actualizar">'+
	'<input type="submit" class="input_button" name="send" value="Guardar mis Datos">'+
	'</div>'+
	'</form>';

	object.createMsgError = function(msg){
		var template = ''+
		'<div id="pop_msg_error" class="error">'+
			'<div class="close-error"><i class="fa fa-times"></i></div>'+
			'<p>'+ msg +'</p>'+
		'</div>';

		if ($('#pop_msg_error').length) {
			$('#pop_msg_error p').text(msg);
			$('#pop_msg_error').fadeIn();
		} else {
			$('body').append(template);
		}
		$('#pop_msg_error .close-error').click(function(event) {
			event.preventDefault();
			$('#pop_msg_error').fadeOut();
		});
	};

	object.templateReplace = function(template,data){
		return template.replace(/{([^}]+)}/g,function(match,group){
			return data[group.toLowerCase()];
		});
	};
	object.renderR = function(data, type, page){
		try{
			var contador;
			if (page !== undefined)
				contador = (page * 10) + 1;
			else
				contador = 1;

			for (var item in data){
				dataGroup = {};
				dataGroup.position = contador;
				dataGroup.url_img = 'https://graph.facebook.com/'+data[item].uid+'/picture?width=100&height=100';
				dataGroup.first_name = data[item].first_name;
				dataGroup.points = data[item].points;
				$("#users_content_"+type).append(object.templateReplace(object.template_ranking,dataGroup));
				contador++;
			}
		}catch(error){
			console.log(error);
		}
	};
	object.getGlobalRanking = function (p_page){
		try{
			var page = (p_page !== undefined) ? p_page : 0;
				app.appManager.fetchPoolsRanking({idpool: app.config.appFb, page: page },function(dataResponse){
				console.log("global");
				if (dataResponse.ranking.length > 0) {
					object.renderR(dataResponse.ranking, 'global', page);
				} else {
					object.createMsgError('¡Oops! parece que ya no hay más participantes.');
				}
			}, function(dataResponse){
				console.log('error',dataResponse);
			});
		}catch(error){
			console.log(error);
		}
	};
	object.getFriendsRanking = function (){
		try{
			app.appManager.fetchPoolsRankingFriends( app.config.appFb,function(dataResponse){
				console.log("render friends");
				object.renderR(dataResponse.rankingFriends, 'friends');
			},function(dataResponse){
				console.log('error',dataResponse);
			});
		}catch(error){
			console.log(error);
		}
	};
	object.createRanking = function(){
		object.getGlobalRanking();
		object.getFriendsRanking();
		$("#share").click(function(event) {
				app.appManager.share(app.config.appFb);
		});
		$("#share2").click(function(event) {
			app.appManager.share(app.config.appFb);
		});
	};

	object.validarInputs = function(form){
		var error = false;

		form.find('input').each(function(){
			$(this).val($.trim($(this).val()));

			if ( $(this).val() === '' || $(this).val() === null || $(this).val() === 'null' || $(this).val() === '-') {
				object.createMsgError('¡Oops! parece que dejaste un campo vacío.');
				$(this).addClass('error-data-fail');
				error = true;
				return false;
			}

			if ($(this).hasClass('input_number')) {
				if ( isNaN($($(this)).val()) ) {
					object.createMsgError('El contenido de estos campos debe ser un numero.');
					$(this).addClass('error-data-fail');
					error = true;
					return false;
				}
			}

			if ( $(this).hasClass('input_text')) {
				if($(this).val().length < 2){
					object.createMsgError('Tu nombre y apellido debe tenr por lo menos dos letras.');
					$(this).addClass('error-data-fail');
					error = true;
					return false;
				}
			}

			if($(this).hasClass('input_email')){
				if($(this).val().indexOf('@', 0) == -1 || $(this).val().indexOf('.', 0) == -1) {
					object.createMsgError('El correo electronico ingresado no es valido.');
					$(this).addClass('error-data-fail');
					error = true;
					return false;
				}
			}

			if($(this).hasClass('input_dpi')){
				if($(this).val().length < 10){
					object.createMsgError('El numero de DPI es demasiado corto.');
					$(this).addClass('error-data-fail');
					error = true;
					return false;
				}
			}

			if($(this).hasClass('input_telefono')){
				if($(this).val().length < 8){
					object.createMsgError('El numero de teléfono es demasiado corto.');
					$(this).addClass('error-data-fail');
					error = true;
					return false;
				}
			}

		});

		return error;
	};
	object.clickform = function(){
		try{
			$('#form_user').submit(function(event) {
				event.preventDefault();
				var user = {};
				user.uid = app.config.userSave.uid;
				user.first_name = '';
				user.last_name = '';
				user.email = '';
				user.dpi = '';
				user.phone = '';
				user.factura = '';
				user.idpool = app.config.appFb;
				var	_form = $(this),
				error = object.validarInputs(_form);

				if (!error) {
					_form.find('input').each(function(){
						$(this).val($.trim($(this).val()));
						if(!$(this).hasClass('input_button')){
							if ($(this)[0].name == 'nombre') user.first_name = $(this).val();
							if ($(this)[0].name == 'apellido') user.last_name = $(this).val();
							if ($(this)[0].name == 'correo-electronico') user.email = $(this).val();
							if ($(this)[0].name == 'dpi') user.dpi = $(this).val();
							if ($(this)[0].name == 'telefono') user.phone = $(this).val();
							if ($(this)[0].name == 'factura') user.factura = $(this).val();
						}
					});
					app.appManager.updateUser(user);
				}
			});
		}catch(error){
			console.log(error);
		}
	};

	object.createFormulario = function(control){
		try{
			console.log("Createformulario");
			if(control){
				var user = {};
				user.userId = app.config.userSave.uid;
				user.idpool = app.config.appFb;
				app.appManager.fetchUser(user,function(data){
					userTemp = data.user[0];
					dataGroup = {};
					dataGroup.first_name = userTemp.first_name;
					dataGroup.last_name = userTemp.last_name;
					dataGroup.email = userTemp.email;
					dataGroup.dpi = userTemp.dpi ? userTemp.dpi:' ';
					dataGroup.telefono = userTemp.phone? userTemp.dpi:' ';
					dataGroup.factura = userTemp.numerofactura? userTemp.dpi:' ';

					$('#datos-form').append(object.templateReplace(object.templateFormulario,dataGroup));

					object.clickform();
				},function(data){
					console.log('error',data);
				});
			}
		}catch(error){
			console.log(error);
		}
	};
	object.initFormulario = function(data,control){
		try{
			ctrl = control ? control:true;
			object.createFormulario(ctrl);
			if(data.estado == 0){
				datos = $('#mis-datos');
				setTimeout(function() {
					$('body').css('overflow', 'hidden');
					$('.bg-black').fadeIn(600);
					setTimeout(function() {
						$(".nano").nanoScroller();
						datos.show().animate({
							'top': '0',
							'opacity': '1'
						}, 800, 'easeOutExpo', function() {
							$(".nano").nanoScroller();
						});
					}, 800);
				}, 850);
			}
		}catch(error){
			console.log(error);
		}
	};

	object.clickAcepto = function(dataEstado){
		try{
			$('#acepto').click(function(event) {
				dataSend = {};
				dataSend.userId= app.config.userSave.uid;
				dataSend.idpool = app.config.appFb;
				app.appManager.setEstadoTerminos(dataSend,function(){
					terminos = $('#terminos');
					terminos.animate({
						'top': '-300px',
						'opacity': '0'
					}, 800, 'easeInExpo', function(){
						terminos.hide();
					});
					setTimeout(function() {
						$('.bg-black').fadeOut(600);
						$('body').css('overflow', 'auto');
					}, 800);
					$("#pool-menu").attr({href: 'pool.php'});
					$("#button-pool").click(function(){
						document.location.href = 'pool.php';
					});
					$("#form_user").remove();
					object.initFormulario(dataEstado);
				},function(dataResponse){
					console.log('error',dataResponse);
				});
			});
		}catch(error){
			console.log(error);
		}
	};

	object.initTerminos = function(dataEstado){
		try{
			terminos = $('#terminos');
			$('body').css('overflow', 'hidden');
			$('.bg-black').fadeIn(600);
			setTimeout(function() {
				terminos.show().animate({
					'top': '0',
					'opacity': '1'
				}, 800, 'easeOutExpo', function() {
					$(".nano").nanoScroller();
				});
			}, 800);
			$("#close-terminos").click(function(){
				object.createFormulario(true);
			});
			object.clickAcepto(dataEstado);
		}catch(error){
			console.log(error);
		}
	};
	object.checkTerminos = function(dataEstado){
		try{
			dataSend = {};
			dataSend.userId= app.config.userSave.uid;
			dataSend.idpool = app.config.appFb;
			app.appManager.fetchEstadoTerminos(dataSend,function(dataResponse){
				if(dataResponse.spResult[0].estadoTerminos == 0){
					$("#pool-menu").attr({href: '#'});
					$("#button-pool").removeAttr('onclick');
					object.initTerminos(dataEstado);
				}else{
					$('#acepto').css({display:'none'});
					object.initFormulario(dataEstado,true);
				}
			},function(dataResponse){
				console.log('error',dataResponse);
			});
		}catch(error){
			console.log(error);
		}
	};

	object.init = function() {

	};
	object.viewMover = function(){
		var page = 0;
		$('#ViewMore').on('click', function(event) {
			event.preventDefault();
			console.log('click');
			page++;
			console.log('page ', page);
			object.getGlobalRanking(page);
		});
	};

	object.startScreen = function(successCallback, errorCallback) {
		try{
			app.appManager.saveUser(app.config.userSave,function(data){
				console.log('save user!');
				object.checkTerminos(data);
			}, function(data){
				object.createMsgError('¡Ocurio algún error al guardas tus datos. Por favor refresca tu navegador!');
			});
			object.createRanking();
			object.viewMover();
		}catch(error){
			console.log("Error Fatal");
		}
		if(successCallback)successCallback();
	};

	object.init();
	return object ;
};