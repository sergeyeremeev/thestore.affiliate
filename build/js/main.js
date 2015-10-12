/*jslint devel: true */
/*global $, jQuery */
(function ($) {
    'use strict';

    var $this;

    // choose account type on register page
    $(document).on('click', '.account-type-selector', function (e) {
        e.preventDefault();
        $this = $(this);

        if ($this.children('.account-type-select').hasClass('selected')) {
            $this.closest('.choose-account-type').find('.account-type-select').removeClass('non-selected selected');
            $('.account-or').addClass('visible');
            $('.create-account-form').removeClass('enabled');
        } else if ($this.children('.account-type-select').hasClass('non-selected')) {
            $this.closest('.choose-account-type').find('.account-type-select').removeClass('selected').addClass('non-selected');
            $this.children('.account-type-select').removeClass('non-selected').addClass('selected');
        } else {
            $this.closest('.choose-account-type').find('.account-type-select').addClass('non-selected');
            $this.children('.account-type-select').addClass('selected').removeClass('non-selected');
            $('.account-or').removeClass('visible');
            $('.create-account-form').addClass('enabled');
        }
    });

    // mobile menu toggle
    $(document).on('click touchend', '.mobile-menu-toggle', function (e) {
        e.preventDefault();
        $('.toggler').toggleClass('active');
        $('.mobile-menu').toggleClass('visible');
        $('body').toggleClass('mobile-menu-open');
    });
}(jQuery));
