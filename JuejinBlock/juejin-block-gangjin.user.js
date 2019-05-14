// ==UserScript==
// @name         Juejin Gangjin Block
// @namespace    https://github.com/stanye/UserScripts/
// @version      0.1.0
// @description  屏蔽钢筋
// @author       stanye
// @include      /^https?:\/\/(\w+\.)?juejin\.im\//
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

$.noConflict();
(($) => {
    'use strict';

    const blockList = [
      '55f981bcddb2e44a4824f38c'
    ];
   
    const blockTask = () => {
      blockList.forEach((id) => {
        // block当前人的item
        $(`.username[href="/user/${id}"]`).parents('.item').remove();
      });
    }

    const startClear = () => {
      blockTask();
    }

    
    $(window).on('scroll', () => {
      startClear();
    });

    startClear();
    
})(jQuery);

