//mainly consulted Jquery.com documentation.

// wrap everything in doc ready function so entire page loads before the script is run
$(document).ready(function() {

   $('#name').focus();  //place curson inside name field on page load.

   $('#other-title').hide();  // hide "other" job role text field by default

   //show the "other" job role field if user selects "other" in drop-down
   $('#title').change(function() {
      const $title = $('#title option:selected').val();
      if ($title === 'other') {
         $('#other-title').show();
      };
   });

   $('#colors-js-puns').hide(); //hide color selector drop-down by default

   // on change to the design dropdown, show/hide certain color selections based on
   // which design choice is made.

   $('#design').change(function(){

      $('#colors-js-puns').hide();
      switch($('#design option:selected').val()){
         case 'js puns':
            $('#color option[value="steelblue"]').attr('selected', null);
            $('#color option[value="cornflowerblue"]').attr('selected', true);
            $('#color option[value="cornflowerblue"]').show();
            $('#color option[value="darkslategrey"]').show();
            $('#color option[value="steelblue"]').hide();
            $('#color option[value="dimgrey"]').hide();
            $('#color option[value="tomato"]').hide();
            $('#color option[value="gold"]').show();
            $('#colors-js-puns').show();
            break;
         case 'heart js':
            $('#color option[value="cornflowerblue"]').attr('selected', null);
            $('#color option[value="steelblue"]').attr('selected', true);
            $('#color option[value="cornflowerblue"]').hide();
            $('#color option[value="darkslategrey"]').hide();
            $('#color option[value="steelblue"]').show();
            $('#color option[value="dimgrey"]').show();
            $('#color option[value="tomato"]').show();
            $('#color option[value="gold"]').hide();
            $('#colors-js-puns').show();
            break;

         default:
            $('#colors-js-puns').hide(); //default hide color list.
      } //End switch
   }); //end design

   // prevent scheduling conflicts in activities section.
   const $classTotal = $( '.activities input:checkbox' ).on( "click", function(){
      //set var for total cost for conference activities.
      let $totalFees = $('.activities input:checked').length *100;

      if ($('.activities input[name="all"]').is(':checked')){
         $totalFees = $totalFees + 100       // add $100 for main conference selection
      }

      // Tues 9-12 group -- js-frameworks, express
      if ($('.activities input[name="js-frameworks"]').is(':checked')) {
         $('.activities input[name="express"]').attr("disabled", true);
      } else {
         $('.activities input[name="express"]').removeAttr("disabled");
      }

      if ($('.activities input[name="express"]').is(':checked')) {
         $('.activities input[name="js-frameworks"]').attr("disabled", true);
      } else {
         $('.activities input[name="js-frameworks"]').removeAttr("disabled");
      }

      // Tues 1-4 group -- js-libs, node
      if ($('.activities input[name="js-libs"]').is(':checked')) {
         $('.activities input[name="node"]').attr("disabled", true);
      } else {
         $('.activities input[name="node"]').removeAttr("disabled");
      }

      if ($('.activities input[name="node"]').is(':checked')) {
         $('.activities input[name="js-libs"]').attr("disabled", true);
      } else {
         $('.activities input[name="js-libs"]').removeAttr("disabled");
      }
      // div to display the total costs for activities.
      const DisplayTotalFee = '<div id="fee"> Total: $' + $totalFees + '</div>';

      // if fee div exists, replace it in the dom, otherwise create it. prevents duplicates.
      if($("#fee").length == 0) {
         $('.activities').append(DisplayTotalFee);
      } else {
         $( "#fee" ).replaceWith(DisplayTotalFee);
      }

   }); //end $classTotal

   //set cc payment as default option, hide others.
   $('#payment option[value="credit card"]').prop("selected", true);
   $( 'fieldset:last-of-type > div:last-of-type ' ).hide();
   $( 'fieldset:last-of-type > div:nth-last-of-type(2) ' ).hide();

   // create spans for all field validation messages and set to hidden
   let $nameSpan = $('<span id="nameV"><p class="required_field_text">Your name is required.</p></span>').insertAfter('#name');
   $nameSpan.hide();

   let $emailRequiredSpan = $('<span id="mailV"><p class="required_field_text">Your email address is required.</p></span>').insertAfter('#mail');
   $emailRequiredSpan.hide();

   let $emailInvalidSpan = $('<span id="vMailV"><p class="required_field_text">This email address is invalid.</p></span>').insertAfter('#mail');
   $emailInvalidSpan.hide();

   $('.activities').append('<span id="checkboxV"><p class="required_field_text">Please select at least one activity.</p></span>');
   $('#checkboxV').hide();

   //cc num

   $('.col-6').append('<span id="ccNumExists"><p  class="required_field_text">Please enter a credit card number.</p></span>');
   $('#ccNumExists').hide();

   $('.col-6').append('<span id="ccNumValid"><p class="required_field_text">Credit Card number invalid.</p></span>');
   $('#ccNumValid').hide();

   //zip
   $('#credit-card > div:nth-last-of-type(2)').append('<span id="zipExists"><p  class="required_field_text">Zip Code Required</p></span>');
   $('#zipExists').hide();

   $('#credit-card > div:nth-last-of-type(2)').append('<span id="zipValid"><p  class="required_field_text">Zip Code Invalid</p></span>');
   $('#zipValid').hide();

   //cvv

   $('#credit-card > div:last-of-type').append('<span id="cvvExists"><p  class="required_field_text">CVV Required</p></span>');
   $('#cvvExists').hide();

   $('#credit-card > div:last-of-type').append('<span id="cvvValid"><p  class="required_field_text">CVV Invalid</p></span>');
   $('#cvvValid').hide();

   //submit button warning

   $('button').after('<div id="lastWarning"><p  class="required_field_text">Please complete required fields above.</p></div>');
   $('#lastWarning').hide();

   // create placeholder spans below cc forms to preserve formatting in html when warning messages appear.

   $('.col-6').append('<span id="ph1"><p  class="ph1">&nbsp;</p></span>');
   $('#credit-card > div:nth-last-of-type(2)').append('<span id="ph2"><p  class="ph2">&nbsp;</p></span>');
   $('#credit-card > div:last-of-type').append('<span id="ph3"><p  class="ph3">&nbsp;</p></span>');

   // realtime validation -- consulted https://wisdmlabs.com/blog/real-time-form-validation-using-regular-expressions-jquery/ for proper events to listen for.

   //name field realtime validation
   $('#name').on('keyup keypress keydown focusout',function(){
   	let nameExists=$(this).val();
   	if(!nameExists){
         $nameSpan.show();
         $('#name').addClass('invalid');
      } else {
         $nameSpan.hide();
         $('#name').removeClass('invalid');
      }
   });

   //email field realtime validation

      const emailRegEx =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ; // found regex at https://emailregex.com

   $('#mail').on('keyup keypress keydown focusout',function(){
   	let input=$(this);
      let isValid= emailRegEx.test(input.val());
   	let emailExists=$(this).val();

   	if(!emailExists){                     //check that text exists.
         $emailRequiredSpan.show();
         $('#mail').addClass('invalid');
      } else {
         $emailRequiredSpan.hide();
         $('#mail').removeClass('invalid');
      }
      if (!isValid && emailExists){       //check that it's a properly formatted email address.
         $emailInvalidSpan.show();
         $('#mail').addClass('invalid');
      } else {
         $emailInvalidSpan.hide();
      }

   });

      //verify that at least one activity is selected.
   $('.activities').change(function(){
      let v = $('input:checked').length;
       if (v < 1){
         $('#checkboxV').show();
      } else {
         $('#checkboxV').hide();
      }
   });

   // credit card number, zip, cvv field validations
   //for each field check that a value exists and then check that value is of proper length.
   //show red borders and display message for violations.
   //use empty placeholder spans to preserve formatting.

   const validNum = /^[0-9]{13,16}$/; //numeric betweeen 13 and 16 digits

      $('#cc-num').focusout(function(){
         let input=$(this);
         let ccExists=$(this).val();
         let isValidcc=validNum.test(input.val());
         if (!ccExists){
            $('#ccNumExists').show();
            $('#ph1').hide();
            $('#cc-num').addClass('invalid');
         } else {
            $('#ccNumExists').hide();
            $('#ph1').show();
            $('#cc-num').removeClass('invalid');
         }
         if (!isValidcc && ccExists){
            $('#ccNumValid').show();
            $('#ph1').hide();
            $('#cc-num').addClass('invalid');
         } else {
            $('#ccNumValid').hide();
         }
      });

      //zip validations

      const validZip = /^[0-9]{5}$/;      //numeric 5 digits
      $('#zip').focusout(function(){
         let input=$(this);
         let zipExists=$(this).val();
      //   let validNum = /^[0-9]{5}$/;
         let isValidZip=validZip.test(input.val());
          if (!zipExists){
            $('#zipExists').show();
            $('#ph2').hide();
            $('#zip').addClass('invalid');
         } else {
            $('#zipExists').hide();
            $('#ph2').show();
            $('#zip').removeClass('invalid');
         }
         if (!isValidZip && zipExists){
            $('#zipValid').show();
            $('#ph2').hide();
            $('#zip').addClass('invalid');
         } else {
            $('#zipValid').hide();
         }

      });

      //cvv validations

      const validCVV = /^[0-9]{3}$/;      //numeric 3 digits
      $('#cvv').focusout(function(){
         let input=$(this);
         let cvvExists=$(this).val();
         let isValidCVV = validCVV.test(input.val());
          if (!cvvExists){
            $('#cvvExists').show();
            $('#ph3').hide();
            $('#cvv').addClass('invalid');
         } else {
            $('#cvvExists').hide();
            $('#ph3').show();
            $('#cvv').removeClass('invalid');
         }
         if (!isValidCVV && cvvExists){
            $('#cvvValid').show();
            $('#ph3').hide();
            $('#cvv').addClass('invalid');
         } else {
            $('#cvvValid').hide();
         }
      }); //end validNum
      //show credit card option by default. hide non-selected payment options.
   const $payment = $( '#payment' ).change(function(){
      const $payOption = $('#payment option:selected').val();

      switch ($payOption) {
            case 'paypal':
               $( '#credit-card ' ).hide();
               $( 'fieldset:last-of-type > div:nth-last-of-type(2) ' ).show();
               $( 'fieldset:last-of-type > div:last-of-type ' ).hide();
               break;
            case  'bitcoin':
               $( '#credit-card ' ).hide();
               $( 'fieldset:last-of-type > div:last-of-type ' ).show();
               $( 'fieldset:last-of-type > div:nth-last-of-type(2) ' ).hide();
               break;
            default:
               $( '#credit-card ' ).show();
               $( 'fieldset:last-of-type > div:last-of-type ' ).hide();
               $( 'fieldset:last-of-type > div:nth-last-of-type(2) ' ).hide();
      }

   });

   let ccPayment = true;
   //Sumbit onlick handler
   //disable submit until all requirements are met

   $( 'form' ).on('submit',function(e){
      let $ccNum = $('#cc-num').val();
      let $zip = $('#zip').val();
      let $cvv = $('#cvv').val();
      let errorCount = 0;           //keep count of field errors

      //check that all required fields contain data and are valid.
      if (!$('#name').val()) {
         errorCount = errorCount + 1;
         e.preventDefault();
      } else {
         errorCount = errorCount - 1;
      }
      if (!$('#mail').val() || !emailRegEx.test($('#mail').val()) ) {
         $('#mail').addClass('invalid');
         errorCount = errorCount + 1;
         e.preventDefault();
      } else {
         $('#mail').removeClass('invalid');
         errorCount = errorCount - 1;
      }
      if ($('.activities input:checked').length < 1){
         $('#checkboxV').show();
         e.preventDefault();
         errorCount = errorCount + 1;
      } else {
         $('#checkboxV').hide();
         errorCount = errorCount - 1;
      }

      //only assess cc data fields if cc option is selected.
      if ($('#payment option:selected').val() === 'credit card')

      {
         ccPayment = true;
         if (!$ccNum || !validNum.test($ccNum)) {
            $('#cc-num').addClass('invalid');
            e.preventDefault();
            errorCount = errorCount + 1;
         } else {
            $('#cc-num').removeClass('invalid');
            errorCount = errorCount - 1;
         }
         if (!$zip || !validZip.test($zip)) {
            $('#zip').addClass('invalid');
            e.preventDefault();
            errorCount = errorCount + 1;
         } else {
            errorCount = errorCount - 1;
            $('#zip').removeClass('invalid');
         }
         if (!$cvv || !validCVV.test($cvv)) {
            $('#cvv').addClass('invalid');
            e.preventDefault();
            errorCount = errorCount + 1;
         } else {
            $('#cvv').removeClass('invalid');
            errorCount = errorCount - 1;
         }
      } else {ccPayment = false;}

         //if there is form info missing, display message
      if (
         (errorCount = -6 && ccPayment)
         ||
         (errorCount = -3 && !ccPayment)
      ){
      $('#lastWarning').show();
      }
   });
}); //end document ready.
