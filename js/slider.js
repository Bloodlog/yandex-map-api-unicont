    var timer;
    var interval = 12000;
    var isTimer = {
        "rotator1": true,
        "rotator2": true,
        "rotator3": true,
        "rotator4": true
      };

    function rotate(id) { 
      // Берем первую картинку
      
      var current = ($( id+' ul li.show')?  $(id+' ul li.show') : $( id+' ul li:first'));
     
      // Берем следующую картинку, когда дойдем до последней начинаем с начала
      var next = ((current.next().length) ? ((current.next().hasClass('show')) ? $( id+' ul li:first') :current.next()) : $( id+' ul li:first')); 
     
      // Расскомментируйте, чтобы показвать картинки в случайном порядке
      // var sibs = current.siblings();
      // var rndNum = Math.floor(Math.random() * sibs.length );
      // var next = $( sibs[ rndNum ] );
     
      current.fadeOut(250, function(){
            //$('.desc').fadeOut(500);

            next.addClass('show')
                .fadeIn(250);
            //$('.desc').fadeIn(500);
        })
      .removeClass('show');
    };

    function theSlider() {
      var rotall = $('div.rotator').length;
      var id;
      var timeout = 0;
      // Берем первую картинку и показываем ее (по пути включаем полную видимость)
      var i = 1;
      while(i <= rotall){
        $('#rotator'+ i +' ul li:first').css({"display": "list-item"});
        i++;
      }

    $(".rotator").each(function()                {
        var id = $(this).attr("id");
        $("#"+id+' li').hover(function()  {
            isTimer[id] = false;
        },function()                {
            isTimer[id] = true;
        });

        setTimeout(function()         {
            setInterval(function()       {
                if(isTimer[id])
                    rotate("#"+id);
            }, interval);
        },timeout);
        timeout = (timeout >= interval) ? 0 : (timeout + (interval / rotall));
    });
    
     };
     
    $(document).ready(function() {    
      // Запускаем слайдшоу
      theSlider();
    });