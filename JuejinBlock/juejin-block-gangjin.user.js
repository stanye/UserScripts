// ==UserScript==
// @name         Juejin Gangjin Block
// @namespace    https://github.com/stanye/UserScripts/
// @version      0.1.1
// @description  屏蔽钢筋
// @author       stanye
// @include      /^https?:\/\/(\w+\.)?juejin\.im\//
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

$.noConflict();
(($) => {
    'use strict';

    let blockList = localStorage.getItem('juejin-blocklist');
    blockList = JSON.parse(blockList) || [];
   
    const blockTask = () => {
      blockList.forEach((id) => {
        // block当前人的item
        $(`.username[href="/user/${id}"]`).parents('.item').remove();
      });
    }


    const block = function() {
      const item = $(this).parents('.item');
      const username = item.find('.username');
      const url = username.attr('href');
      const id = url.split('/')[2];
      let blockList = localStorage.getItem('juejin-blocklist');
      blockList = JSON.parse(blockList) || [];
      blockList.push(id);
      localStorage.setItem('juejin-blocklist', JSON.stringify(blockList));
      item.remove();
    }


    const addBlockButton = () => {
      const menuNode = $('.pin-header-more.header-menu')[0];
      let scope;
      if (menuNode) {
        scope = menuNode.attributes.item(0).nodeName;
      }
      
      $('.header-menu .dropdown-menu').each(function() {
        if ($(this).has('.block-btn').length === 0) {
          // 获取当前btn的scope
          $(this).append(`<li ${scope} class="block-btn">Block</li>`);
        }
      })
    }

    const startClear = () => {
      addBlockButton();
      blockTask();
    }

    $('#juejin').on('click', '.block-btn', block);
    
    $(window).on('scroll', () => {
      startClear();
    });

    startClear();
    
})(jQuery);

