  $(function(){

    $(document).on('click', 'a[href^="#"]', function (e) {
      e.preventDefault();  
      $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
      }, 500);
      $('nav ul, .dim').removeClass('opened');
    });

    $('.burger, .dim').on('click', function(e){
      e.preventDefault();
      $('.burger i').toggleClass('fa-times');
      $('nav ul, .dim').toggleClass('opened');
    });

    $('#year_selector').yearselect({
        start: 1970,
        end: 2010,
        order:'desc'
      });

    $('#year_selector').customSelect({
      placeholder: '<span>Год рождения</span>'
    });

    $('.year_select label').on('click', function(){
      $('#year_selector').click()
    })

    // here can be $(window).on resize but it require some cpu
    // so I will ask is it really need before paste it here
    if($(window).outerWidth() < 767){
      noUiSlider.create(document.getElementById('range_slider'), {
        start: [0, 3],
        connect: true,
        step: 1,
        snap: true,
        orientation: 'vertical',
        direction: 'rtl',
        range: {
            'min': 0,
            '25%': 1,
            '50%': 2,
            'max': 4
        }
      });
    } else {
      noUiSlider.create(document.getElementById('range_slider'), {
        start: [0, 3],
        connect: true,
        step: 1,
        snap: true,
        range: {
            'min': 0,
            '25%': 1,
            '50%': 2,
            'max': 4
        }
      });
    }

    // material ui style
    $('input').on('change', function(){
      if($(this).val() != ''){
        $(this).siblings('label').addClass('active')
      } else {
        $(this).siblings('label').removeClass('active')
      };
    });


   // ==FORMS VALIDATION==
   function formValidation(formSelector, submitText, url, completeFunction){ // form selector - string
    $(formSelector + ' input[type="submit"]').on('click', function(e){
      e.preventDefault();
      var data = $(formSelector).serialize();
      $(formSelector + ' input').each(function(i, el){
        if($(el).val() == '' && $(el).attr('type') != 'hidden'){
          $(el).addClass('err')
        } else {
          $(el).removeClass('err')
        };
      });  
      if($(formSelector + ' input.err').length > 0){
    
      } else {
        $.ajax({
            type: 'post',
            // url: url,
            data: data,
            beforeSend: function(){
              $(formSelector +' input[type="submit"]').prop('disabled', true);
              $(formSelector + ' input[type="submit"]').val(submitText);
            },
            success: function() {
            },
            error: function() {
            },
            complete: function() {              
              completeFunction(formSelector)
            }
        });  
      };
    });
  };
  formValidation('form', 'Отправка...', submitReg);
  
  // ==FORMS COMPLETE SCRIPTS==
  function submitReg(formSelector){
    $(formSelector +' input[type="submit"]').prop('disabled', false);
    $(formSelector + ' input[type="submit"]').val('Готово');
  };


  })
  