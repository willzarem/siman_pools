app.Screen = function() {
	var object = {};
	object.stageActive = {};
	object.templateMatch = ''+
	'<div class="partido">'+
	'<input id="match_{id}" type="hidden" data-empateWinner="false" value="{id}" name="matchId">'+
	'<input type="hidden" value="{oi}" name="officialId">'+
	'<input type="hidden" value="{id1}" name="team1Id">'+
	'<input type="hidden" value="{src1}" name="team1ImageUrl">'+
	'<input type="hidden" value="{src2}" name="team2ImageUrl">'+
	'<input type="hidden" value="{id2}" name="team2Id">'+
	'<input type="hidden" value="{name1}" name="team1Name">'+
	'<input type="hidden" value="{name2}" name="team2Name">'+
	'<div class="tus-datos">'+
	'<div class="large-3 medium-3 small-3 columns banderacol">'+
	'<div class="mask-bandera bandera-diagonal">'+
	'<div data-bg="{src1}" class="bandera">'+
	'<img src="{src1}" alt="">'+
	'</div>'+
	'</div>'+
	'<div class="nombre">'+
	'{name1}'+
	'</div>'+
	'</div>'+
	'<div class="large-2 medium-2 small-2 columns input center-top">'+
	'<div class="diagonal-input">'+
	'<input class="input_number" data-matchid="{oi}" placeholder="-" type="number" maxlength="2" name="team1PredictedScore" value="{sp1}">'+
	'</div>'+
	'</div>'+
	'<div class="large-2 medium-2 small-2 columns center-top">'+
	'<div class="vs">'+
	'VS'+
	'</div>'+
	'</div>'+
	'<div class="large-2 medium-2 small-2 columns input center-top">'+
	'<div class="diagonal-input-segundo">'+
	'<input class="input_number" data-matchid="{oi}" placeholder="-" type="number" maxlength="2" name="team2PredictedScore" value="{sp2}">'+
	'</div>'+
	'</div>'+
	'<div class="large-3 medium-3 small-3 columns banderacol-2">'+
	'<div class="mask-bandera bandera-diagonal-segunda">'+
	'<div data-bg="{src2}" class="bandera">'+
	'<img src="{src2}" alt="">'+
	'</div>'+
	'</div>'+
	'<div class="nombre">'+
	'{name2}'+
	'</div>'+
	'</div>'+
	'<div class="clear"></div>'+
	'</div>'+
	'<div class="datos-partido">'+
	'<span class="estadio">'+
	'<i class="fa fa-map-marker"></i> {estadio}'+
	'</span>'+
	'<span class="hora">'+
	'<i class="fa fa-clock-o"></i> {hora}'+
	'</span>'+
	'<span class="fecha">'+
	'<i class="fa fa-calendar-o"></i> {fecha}'+
	'</span>'+
	'</div>'+
	'<div class="clear"></div>'+
	'</div>';

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

	object.validarInputs = function(form){
		var error = false;

		form.find('input').each(function(){
			$(this).val($.trim($(this).val()));

			if ( $(this).val() === '' || $(this).val() === null || $(this).val() === 'null' || $(this).val() === '-') {
				object.createMsgError('¡Oops! parece que dejaste un marcador vacío.');
				$(this).addClass('error-data-fail');
				error = true;
				return false;
			}

			if ($(this).hasClass('input_number')) {
				if ( isNaN($($(this)).val()) ) {
					object.createMsgError('Vamos, ningún partido ha quedado A - 1 ¡Sólo puedes ingresar números!');
					$(this).addClass('error-data-fail');
					error = true;
					return false;
				}
			}

			if ( $(this).val() < 0 ) {
				object.createMsgError('Hay que ser positivos, no puede haber tantos autogoles. Dejaste un marcador con número negativo.');
				$(this).addClass('error-data-fail');
				error = true;
				return false;
			}

		});

		return error;
	};

	object.render = function (objJquery,i,data,i_array_img) {
		var data_group = {},
		fecha = moment(data.matches[i].datetime).format("DD/MM/YYYY hh:mm A").split(' ');

		var img1Array = data.matches[i].team1ImageURL.split('|');
		var img2Array = data.matches[i].team2ImageURL.split('|');

		data_group.estadio = data.matches[i].stadiumName;
		data_group.id      = data.matches[i].id;
		data_group.oi      = data.matches[i].officialId;
		data_group.g       = data.matches[i].groupId;
		data_group.id1     = data.matches[i].team1_Id;
		data_group.id2     = data.matches[i].team2_Id;
		data_group.name1   = data.matches[i].team1Name;
		data_group.name2   = data.matches[i].team2Name;
		data_group.src1    = app.config.imageUrl + img1Array[i_array_img];
		data_group.src2    = app.config.imageUrl + img2Array[i_array_img];
		data_group.sp1     = data.matches[i].team1PredictedScore;
		data_group.sp2     = data.matches[i].team2PredictedScore;
		data_group.rf1     = data.matches[i].team1Score;
		data_group.rf2     = data.matches[i].team2Score;
		data_group.fecha   = fecha[0];
		data_group.hora    = fecha[1]+ ' ' +fecha[2];
		objJquery.append(object.templateReplace(object.templateMatch, data_group));
	};

	object.getStage = function (callback){
		try{
			app.appManager.fetchStage(function(data){
				object.stageActive = data;
				if (typeof callback === 'function')	callback();
			},function(error){
				console.log("Error", error);
			});
		}catch(error){
			console.log(error);
		}
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
		$("#share2").click(function(event) {
			app.appManager.share(app.config.appFb);
		});
	};

	object.init = function() {

		$.fn.serializeObject = function(fase){
			if (fase === undefined) {console.log('fase undefined'); return false;}
			var partidos = {},
			matchIds = [],
			officialIds = [],
			teamId1s = [],
			teamId2s = [],
			team1PredictedScores = [],
			team2PredictedScores = [],
			team1Names = [],
			team2Names = [],
			winners = [],
			team1ImageUrls = [],
			team2ImageUrls = [],
			a = this.serializeArray(),
			countId = -1;

			function validarGanador (p_idTeam1,p_store1, p_idTeam2,p_store2,p_matchId){
				var result,
				matchIdEmpate = p_matchId,
				partido1 = [],
				partido2 = [];

				partido1.push([p_idTeam1,p_store1]);
				partido2.push([p_idTeam2,p_store2]);

				var t1 = parseInt(partido1[0][1],10);
				var t2 = parseInt(partido2[0][1],10);

				if (t1 > t2) {
					$('#match_' + matchIdEmpate + '').attr('data-empateWinner','false');
					result = partido1[0][0];
				} else if(t1 === t2){
					var empate = $('#match_' + matchIdEmpate + '').attr('data-empateWinner');
					result = (empate !== 'false') ? empate : false;
				} else {
					$('#match_' + matchIdEmpate + '').attr('data-empateWinner','false');
					result = partido2[0][0];
				}
				return result;
			}

			$.each(a, function() {
				if (this.name == 'matchId') {
					countId++;
					matchIds.push(this.value);
				}

				if (this.name == 'officialId') officialIds.push(this.value);

				if (this.name == 'team1PredictedScore') team1PredictedScores.push(this.value);
				if (this.name == 'team2PredictedScore') team2PredictedScores.push(this.value);

				if (this.name == 'team1Id') teamId1s.push(this.value);
				if (this.name == 'team2Id') teamId2s.push(this.value);

				if (this.name == 'team1Name') team1Names.push(this.value);
				if (this.name == 'team2Name') team2Names.push(this.value);

				if (this.name == 'team1ImageUrl') team1ImageUrls.push(this.value);
				if (this.name == 'team2ImageUrl') team2ImageUrls.push(this.value);

			});

			if (fase === 1) {
				for (var ix = 0; ix < matchIds.length; ix++) {
					partidos[ix] = {
						matchId: matchIds[ix],
						officialId: officialIds[ix],
						team1PredictedScore: team1PredictedScores[ix],
						team2PredictedScore: team2PredictedScores[ix],
						winner: 0
					};
				}
			} else {
				for (var i = 0; i < matchIds.length; i++) {
					partidos[i] = {
						matchId: matchIds[i],
						officialId: officialIds[i],
						team1PredictedScore: team1PredictedScores[i],
						team2PredictedScore: team2PredictedScores[i],
						team1Id: teamId1s[i],
						team2Id: teamId2s[i],
						team1Name: team1Names[i],
						team2Name: team2Names[i],
						team1ImageUrl: team1ImageUrls[i],
						team2ImageUrl: team2ImageUrls[i],
						winner: validarGanador(teamId1s[i], team1PredictedScores[i], teamId2s[i],team2PredictedScores[i],matchIds[i])
					};
				}
			}
			return partidos;
		};

	};

	////Seccion de validarTerminos y estado
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
		}catch(error){
			console.log(error);
		}
	};

	object.initFormulario = function(data){
		try{
			object.createFormulario();
			if(data.estado == 0){
				datos = $('#mis-datos');
				setTimeout(function() {
					$(".nano").nanoScroller();
					datos.show().animate({
						'top': '0',
						'opacity': '1'
					}, 800, 'easeOutExpo');
				}, 800);
				$('body').css('overflow', 'hidden');
				$('.bg-black').fadeIn(600);
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
					$("#close-terminos").bind("click",function(){
						$('body').css('overflow', 'hidden');
						$('.bg-black').fadeIn(600);
						setTimeout(function() {
							datos.show().animate({
								'top': '0',
								'opacity': '1'
							}, 800, 'easeOutExpo', function() {
								$(".nano").nanoScroller();
							});
						}, 800);
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
			$("#close-terminos").unbind("click");
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
					object.initTerminos(dataEstado);
				}else{
					$('#acepto').css({display:'none'});
					object.initFormulario(dataEstado);
				}
			},function(dataResponse){
				console.log('error',dataResponse);
			});
		}catch(error){
			console.log(error);
		}
	};
	///Termina seccion de validar
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
			var $grupo_a = $('#grupo-a-render'),
			$grupo_b = $('#grupo-b-render'),
			$grupo_c = $('#grupo-c-render'),
			$grupo_d = $('#grupo-d-render'),
			$grupo_e = $('#grupo-e-render'),
			$grupo_f = $('#grupo-f-render'),
			$grupo_g = $('#grupo-g-render'),
			$grupo_h = $('#grupo-h-render');

			app.appManager.saveUser(app.config.userSave,function(data){
				console.log('save user!');
				object.checkTerminos(data);
			}, function(data){
				object.createMsgError('¡Ocurio algún error al guardas tus datos. Por favor refresca tu navegador!');
			});
			object.createRanking();
			object.viewMover();
			object.getStage(function(){
				app.appManager.fetchUserdata({
					userId: app.config.userSave.uid,
					stage: object.stageActive.stage,
					idpool : app.config.appFb
				}, function(data){
					if (!data.error) {
						$grupo_a.html('');
						$grupo_b.html('');
						$grupo_c.html('');
						$grupo_d.html('');
						$grupo_e.html('');
						$grupo_f.html('');
						$grupo_g.html('');
						$grupo_h.html('');

						for (var i = 0; i < data.matches.length; i++) {
							if (data.matches[i].groupId === '2'){
								object.render($grupo_a,i, data,0);
							}
							if (data.matches[i].groupId === '3'){
								object.render($grupo_b,i, data,0);
							}
							if (data.matches[i].groupId === '4'){
								object.render($grupo_c,i, data,0);
							}
							if (data.matches[i].groupId === '5'){
								object.render($grupo_d,i, data,0);
							}
							if (data.matches[i].groupId === '6'){
								object.render($grupo_e,i, data,0);
							}
							if (data.matches[i].groupId === '7'){
								object.render($grupo_f,i, data,0);
							}
							if (data.matches[i].groupId === '8'){
								object.render($grupo_g,i, data,0);
							}
							if (data.matches[i].groupId === '9'){
								object.render($grupo_h,i, data,0);
							}
						}
					} else {
						console.log('fetch error db');
					}
				},function(data){
					object.createMsgError('¡Ocurrio algún error al traer los datos por favor refresca el navegador!');
				});
});
$('#form_pool').submit(function(event) {
	event.preventDefault();

	var	_form = $(this),
	error = object.validarInputs(_form);

	if (!error) {
		var matches = $(this).serializeObject(1);
		app.appManager.saveUserdata(matches, function(data){
			object.createMsgError('¡Tus resultados se guardaron correctamente!');
		}, function(data){
			var msg = ( data.errorMessage ||  data.errorMessage !== '' ) ? data.errorMessage : 'Intenta más tarde.';
			object.createMsgError('¡Solamente se guardaron las predicciones de los partidos que aún no han jugado.');
		});
	}

});

}catch(error){
	console.log("Error", error);
}
if(successCallback)successCallback();
};

object.init();
return object ;
};