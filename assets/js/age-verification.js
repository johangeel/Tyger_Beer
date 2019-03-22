/*!
 * Simple Age Verification (https://github.com/Herudea/age-verification))
 */

var modal_content,
modal_screen;

// Start Working ASAP.
$(document).ready(function() {
	av_legality_check();
});


av_legality_check = function() {
	if ($.cookie('is_legal') == "yes") {
		// legal!
		// Do nothing?
	} else {
		av_showmodal();

		// Make sure the prompt stays in the middle.
		$(window).on('resize', av_positionPrompt);
	}
};

av_showmodal = function() {
	modal_screen = $('<div id="modal_screen"></div>');
	modal_content = $('<div id="modal_content" style="display:none"></div>');
	var modal_content_wrapper = $('<div id="modal_content_wrapper" class="content_wrapper"></div>');
	var modal_regret_wrapper = $('<div id="modal_regret_wrapper" class="content_wrapper" style="display:none;"></div>');

	// Question Content
  var content_country = $('<span class="countries"><h3>Which country are you from?</h3><a href="#" class="flaglink select_usa"><img src="./images/US.png" class="flag"/></a><a href="#" class="flaglink select_be"><img src="./images/BE.png" class="flaglink flag"/></a><a href="#" class="flaglink select_nl"><img src="./images/NL.png" class="flag"/></a>');
  var content_heading = $('<h2 class="age_acceptance hidden">Are you <span class="beer_age">18</span> years or older?</h2></span>')
  var content_buttons = $('<nav class="age_acceptance hidden"><ul><li><a href="#nothing" class="av_btn av_go" rel="yes">Yes</a></li><li><a href="#nothing" class="av_btn av_no" rel="no">No</a></li></nav>');
  var content_text = $('<p class="age_acceptance hidden">You must verify that you are <span class="beer_age">18</span> years of age or older to enter this site.</p>');

	// Regret Content
	var regret_heading = $('<h2>We\'re Sorry.</h2>');
	var regret_buttons = $('<nav><ul><li></li></ul></nav>');
	var regret_text = $('<p>You must be <span class="beer_age">18</span> years of age or older to enter this site.</p>');

  modal_content_wrapper.append(content_country, content_heading, content_buttons, content_text);
	modal_regret_wrapper.append(regret_heading, regret_buttons, regret_text);
	modal_content.append(modal_content_wrapper, modal_regret_wrapper);

	// Append the prompt to the end of the document
	$('body').append(modal_screen, modal_content);

	// Center the box
	av_positionPrompt();

	modal_content.find('a.av_btn').on('click', av_setCookie);
	modal_content.find('a.select_usa').on('click', av_selectUSA);
	modal_content.find('a.select_be').on('click', av_selectBE);
	modal_content.find('a.select_nl').on('click', av_selectNL);
};

av_setCookie = function(e) {
	e.preventDefault();

	var is_legal = $(e.currentTarget).attr('rel');

	$.cookie('is_legal', is_legal, {
		expires: 30,
		path: '/'
	});

	if (is_legal == "yes") {
		av_closeModal();
		$(window).off('resize');
	} else {
		av_showRegret();
	}
};

const ages = {
  usa: 21,
  nl: 18,
  be: 16
}

av_selectUSA = function(e) {
  console.log('select USA');
  setAge(ages['usa']);
  hideAcceptance();
}

av_selectBE = function(e) {
  console.log('select BE');
  setAge(ages['be']);
  hideAcceptance();
}

av_selectNL = function(e) {
  console.log('select NL');
  setAge(ages['nl']);
  hideAcceptance();
}

setAge = function(age) {
  const x = document.getElementsByClassName('beer_age');
  for (var i = 0; i < x.length; i++) {
    x[i].innerText = age;
  }
}

hideAcceptance = function() {
    [].forEach.call(document.querySelectorAll(".age_acceptance"), function(el) {
        el.classList.remove("hidden");
    });

    [].forEach.call(document.querySelectorAll(".countries"), function(el) {
        el.classList.add("hidden");
    });
}

av_closeModal = function() {
	modal_content.fadeOut();
	modal_screen.fadeOut();
};

av_showRegret = function() {
	modal_screen.addClass('nope');
	modal_content.find('#modal_content_wrapper').hide();
	modal_content.find('#modal_regret_wrapper').show();
};

av_positionPrompt = function() {
	var top = ($(window).outerHeight() - $('#modal_content').outerHeight()) / 2;
	var left = ($(window).outerWidth() - $('#modal_content').outerWidth()) / 2;
	modal_content.css({
		'top': top,
		'left': left
	});

	if (modal_content.is(':hidden') && ($.cookie('is_legal') != "yes")) {
		modal_content.fadeIn('slow')
	}
};
