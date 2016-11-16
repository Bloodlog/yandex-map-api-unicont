		 ymaps.ready(init);
		    var myMap,
				myPlacemark,
				myGeoObject;

		    function init(){     
		        myMap = new ymaps.Map("map", {
		            center: [59.864026,30.448251],
		            controls: ['rulerControl'],
		            zoom: 13,
		        }, {
		            minZoom: '11',
		        });
/*Создание маленького элемента управления масштабом карты и добавление его на карту.*/
			var zoomControl = new ymaps.control.ZoomControl({
			    options: {
			        size: "small",
			    }
			});
			myMap.controls.add(zoomControl);
			        
// Добавим элемент управления на карту
			var fullscreenControl = new ymaps.control.FullscreenControl();

			myMap.controls.add(fullscreenControl);
// Добавление на карту элемента управления пробками
			var trafficControl = new ymaps.control.TrafficControl();
			myMap.controls.add(trafficControl, {top: 10, left: 10});
//Слои
			myMap.controls.add(new ymaps.control.TypeSelector(['yandex#map', 'yandex#publicMap','yandex#satellite','yandex#hybrid','yandex#publicMapHybrid']));

/*Маршруты*/

// На автомобиле чеез мост Александр. фермы
		route1 = ymaps.route([
        [59.853168,30.440483],
        [59.858031,30.446138]
   		]).then(function (route) {
   			myMap.geoObjects.add(route.getPaths());
   			route.getPaths().options.set({
						// можно выставить настройки графики маршруту
						strokeColor: '#f15858',
						opacity: 0.5,
						strokeWidth: 5,
						mapStateAutoApply: true,
					});
   			//Ссылки на маршрут подсвечиваются
   			$( '#route1' ).mouseenter( function(){
					route.getPaths().options.set({
						opacity: 0.9,

					});
   			} ).mouseleave( function(){
   					route.getPaths().options.set({
   						opacity: 0.5,
   					});
   			} );
   			//При наведении на карте по маршруту, он подсвечивается
   			route.getPaths().events
			.add('mouseenter', function (e) {
					route.getPaths().options.set({
						opacity: 0.9,
					});
			})
			.add('mouseleave', function (e) {
						route.getPaths().options.set({
							opacity: 0.5,
						});
			});
        	
        	
    }, function (error) {
        alert('Возникла ошибка: ' + error.message);
    });


// На автомобиле с проспекта Славы
   		route2 = ymaps.route([
        [59.864053,30.410518],
        [59.858031,30.446138]
   		]).then(function (route) {
   			myMap.geoObjects.add(route.getPaths());
   			route.getPaths().options.set({
   						strokeColor: '#2d5f71',
   						opacity: 0.5,
   						strokeWidth: 5
   					});
   			//Ссылки на маршрут подсвечиваются
   			$( '#route2' ).mouseenter( function(){
					route.getPaths().options.set({
					     opacity: 0.9,
					 });
   			} ).mouseleave( function(){
   					route.getPaths().options.set({
   						opacity: 0.5,
   					});
   			} );
   			//При наведении на карте по маршруту, он подсвечивается
   			route.getPaths().events
			.add('mouseenter', function (e) {
					route.getPaths().options.set({
						opacity: 0.9,
					});
			})
			.add('mouseleave', function (e) {
						route.getPaths().options.set({
							opacity: 0.5,
						});
			});
    }, function (error) {
        alert('Возникла ошибка: ' + error.message);
    });

// На втомобиле через невский путепровод
		route3 = ymaps.route([
		        [59.864053,30.410518],
		        {
		            point: [59.866546,30.425667],
		            // метро "Молодежная" - транзитная точка
		            // (проезжать через эту точку, но не останавливаться в ней).
		            type: 'viaPoint'
		        },
		        [59.858031,30.446138]
		   		]).then(function (route) {
		   	
		   	myMap.geoObjects.add(route.getPaths());
		        	route.getPaths().options.set({
				        // можно выставить настройки графики маршруту
				        strokeColor: '#00ffff',
				        opacity: 0.5,
						strokeWidth: 5
			});
		    //Ссылки на маршрут подсвечиваются
   			$( '#route3' ).mouseenter( function(){		   			
		        	myMap.geoObjects.add(route.getPaths());
		        	route.getPaths().options.set({
				        opacity: 0.9,
				     });
   			} ).mouseleave( function(){
   					route.getPaths().options.set({
   						opacity: 0.5,
   					});
   			} );
   			//При наведении на карте по маршруту, он подсвечивается
   			route.getPaths().events
			.add('mouseenter', function (e) {
					route.getPaths().options.set({
						opacity: 0.9,
					});
			})
			.add('mouseleave', function (e) {
						route.getPaths().options.set({
							opacity: 0.5,
						});
			});
		}, function (error) {
		    alert('Возникла ошибка: ' + error.message);
		});

//*Маршруты на автобусе*/
//от Ломоносовской
 multiRoute4 = new ymaps.multiRouter.MultiRoute({
            referencePoints: [
                [59.87734,30.441771],
                [59.858031,30.446138]
            ],
        },{
        	wayPointDraggable: false,
   			viaPointDraggable: false,
        	// Задаем собственное оформление линий мультимаршрута.
		    routeStrokeColor: "#d8fdcc",
		    routeActiveStrokeColor: "#77d258",
		    pinIconFillColor: "ff0000",
		    boundsAutoApply: false,
		    zoomMargin: 30

        });
 multiRoute4.model.setParams({
                // Тип маршрутизации - на общественном транспорте.
                routingMode: 'masstransit',
            });
$( '#route4' ).mouseenter( function(){		   			
 						myMap.geoObjects.add(multiRoute4);
   			} ).mouseleave( function(){
 						myMap.geoObjects.remove(multiRoute4);
   			} );






//От Пролетарской
multiRoute5 = new ymaps.multiRouter.MultiRoute({
            referencePoints: [
                [59.86517,30.470438],
                [59.858031,30.446138]
            ],
        },{
        	// Задаем собственное оформление линий мультимаршрута.
		    routeStrokeColor: "#f4dfff",
		    routeActiveStrokeColor: "#d484fe",
		    pinIconFillColor: "ff0000",
		    boundsAutoApply: false,
		    zoomMargin: 30
		    
        });
 multiRoute5.model.setParams({
                // Тип маршрутизации - на общественном транспорте.
                routingMode: 'masstransit',
            });
 $( '#route5' ).mouseenter( function(){		   			
 						myMap.geoObjects.add(multiRoute5);
   			} ).mouseleave( function(){
 						myMap.geoObjects.remove(multiRoute5);
   			} );

/*Геообъекты*/
            myPlacemark2 = new ymaps.Placemark([59.858142,30.445980], { 
			hintContent: '<span class="map-text">Въезд на территорию Unicont</span>',
			balloonContent: '<img class="map-image" src="img/enter.jpg"><br><span class="map-text">Въезд на территорию Unicont</span>'
		        }, {
		            // Опции.
		            // Необходимо указать данный тип макета.
		            iconLayout: 'default#image',
		            // Своё изображение иконки метки.
		            iconImageHref: 'img/kpp.png',
		            // Размеры метки.
		            iconImageSize: [32, 32],
        });
        if(myMap.getZoom() <= 10){
       		myMap.geoObjects.add(myPlacemark2);
    		myMap.redraw();
    	}


        myPlacemark = new ymaps.Placemark([59.858983,30.444896], { 
			hintContent: '<span class="map-text">Unicont</span>',
			balloonContent: '<span class="map-text">Unicont</span>'
		        }, {
		            // Опции.
		            // Необходимо указать данный тип макета.
		            iconLayout: 'default#image',
		            // Своё изображение иконки метки.
		            iconImageHref: 'img/objectunicont.png',
		            // Размеры метки.
		            iconImageSize: [40, 52],
		            iconImageOffset: [-20, -52],
		            hideIconOnBalloonOpen: false,
		            openBalloonOnClick: false,
		            zIndex: 999,
		          
		            // Смещение левого верхнего угла иконки относительно
		            // её "ножки" (точки привязки).
		            //iconImageOffset: [0, 0]
        });
        myMap.geoObjects.add(myPlacemark);
	}

