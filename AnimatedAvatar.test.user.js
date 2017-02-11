// ==UserScript==
// @name         Animated Avatar
// @namespace    http://steamcommunity.com/
// @version      3.0
// @description  Allows you to make your avatar animated using standart game avatars in Steam
// @author       Lite_OnE
// @match        *://steamcommunity.com/id/*
// @grant        unsafeWindow
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

var p=1500,   //!Dont modify this value or you will get banned!
    stop_flag=0,  //stop flag .-.
    p_number=10, //total number of all presets
    data_1 = '<a class="btn_profile_action btn_medium" id="disable_av"><span style="color: #E34234; display:none;">Disable Animated Avatar</span></a><a class="btn_profile_action btn_medium" id="enable_av"><span style="color: #01B1AF; display: block">Enable Animated Avatar</span></a>',
    data_2 = '<div class="popup_block_new"><div class="popup_body popup_menu" id="avatar_presets" style="display: none; position: static; z-index: 1000; width: 185px;"></div></div>';



function preset1(){
    if (stop_flag===0){
        $.post('http://steamcommunity.com/games/471220/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 0});
        setTimeout(function (){
            $.post('http://steamcommunity.com/games/471220/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 1});
            setTimeout(function (){
                $.post('http://steamcommunity.com/games/471220/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 2});
                setTimeout(function (){
                    $.post('http://steamcommunity.com/games/471220/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 3});
                    setTimeout(function (){
                        preset1();
                    }, p);
                }, p);
            }, p);
        }, p);
    }
}

function preset2(){
    if (stop_flag===0){
        $.post('http://steamcommunity.com/games/269570/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 0});
        setTimeout(function (){
            $.post('http://steamcommunity.com/games/269570/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 1});
            setTimeout(function (){
                $.post('http://steamcommunity.com/games/269570/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 2});
                setTimeout(function (){
                    $.post('http://steamcommunity.com/games/269570/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 3});
                    setTimeout(function (){
                        $.post('http://steamcommunity.com/games/269570/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 4});
                        setTimeout(function (){
                            $.post('http://steamcommunity.com/games/269570/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 5});
                            setTimeout(function (){
                                $.post('http://steamcommunity.com/games/269570/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 6});
                                setTimeout(function (){
                                    $.post('http://steamcommunity.com/games/269570/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 7});
                                    setTimeout(function (){
                                        preset2();
                                    }, p);
                                }, p);
                            }, p);
                        }, p);
                    }, p);
                }, p);
            }, p);
        }, p);
    }
}

function preset3(){
    if (stop_flag===0){
        $.post('http://steamcommunity.com/games/526800/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 0});
        setTimeout(function (){
            $.post('http://steamcommunity.com/games/526800/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 1});
            setTimeout(function (){
                $.post('http://steamcommunity.com/games/526800/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 2});
                setTimeout(function (){
                    $.post('http://steamcommunity.com/games/526800/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 3});
                    setTimeout(function (){
                        $.post('http://steamcommunity.com/games/526800/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 4});
                        setTimeout(function (){
                            preset3();
                        }, p);
                    }, p);
                }, p);
            }, p);
        }, p);
    }
}

function preset4(){
    if (stop_flag===0){
        $.post('http://steamcommunity.com/games/NinjasPlusPlus/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 0});
        setTimeout(function (){
            $.post('http://steamcommunity.com/games/NinjasPlusPlus/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 1});
            setTimeout(function (){
                $.post('http://steamcommunity.com/games/NinjasPlusPlus/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 2});
                setTimeout(function (){
                    $.post('http://steamcommunity.com/games/NinjasPlusPlus/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 3});
                    setTimeout(function (){
                        $.post('http://steamcommunity.com/games/NinjasPlusPlus/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 4});
                        setTimeout(function (){
                            $.post('http://steamcommunity.com/games/NinjasPlusPlus/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 5});
                            setTimeout(function (){
                                $.post('http://steamcommunity.com/games/NinjasPlusPlus/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 6});
                                setTimeout(function (){
                                    $.post('http://steamcommunity.com/games/NinjasPlusPlus/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 7});
                                    setTimeout(function (){
                                        $.post('http://steamcommunity.com/games/NinjasPlusPlus/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 8});
                                        setTimeout(function (){
                                            $.post('http://steamcommunity.com/games/NinjasPlusPlus/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 9});
                                            setTimeout(function (){
                                                $.post('http://steamcommunity.com/games/NinjasPlusPlus/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 10});
                                                setTimeout(function (){
                                                    $.post('http://steamcommunity.com/games/NinjasPlusPlus/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 11});
                                                    setTimeout(function (){
                                                        preset4();
                                                    }, p);
                                                }, p);
                                            }, p);
                                        }, p);
                                    }, p);
                                }, p);
                            }, p);
                        }, p);
                    }, p);
                }, p);
            }, p);
        }, p);
    }
}

function preset5(){
    if (stop_flag===0){
        $.post('http://steamcommunity.com/games/SuperDistro/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 0});
        setTimeout(function (){
            $.post('http://steamcommunity.com/games/SuperDistro/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 1});
            setTimeout(function (){
                $.post('http://steamcommunity.com/games/SuperDistro/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 2});
                setTimeout(function (){
                    $.post('http://steamcommunity.com/games/SuperDistro/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 3});
                    setTimeout(function (){
                        $.post('http://steamcommunity.com/games/SuperDistro/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 4});
                        setTimeout(function (){
                            $.post('http://steamcommunity.com/games/SuperDistro/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 5});
                            setTimeout(function (){
                                $.post('http://steamcommunity.com/games/SuperDistro/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 6});
                                setTimeout(function (){
                                    $.post('http://steamcommunity.com/games/SuperDistro/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 7});
                                    setTimeout(function (){
                                       preset5();
                                   }, p);
                                }, p);
                            }, p);
                        }, p);
                    }, p);
                }, p);
            }, p);
        }, p);
    }
}

function preset6(){
    if (stop_flag===0){
        $.post('http://steamcommunity.com/games/453830/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 0});
        setTimeout(function (){
            $.post('http://steamcommunity.com/games/453830/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 1});
            setTimeout(function (){
                $.post('http://steamcommunity.com/games/453830/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 2});
                setTimeout(function (){
                    $.post('http://steamcommunity.com/games/453830/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 3});
                    setTimeout(function (){
                        $.post('http://steamcommunity.com/games/453830/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 4});
                        setTimeout(function (){
                            $.post('http://steamcommunity.com/games/453830/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 5});
                            setTimeout(function (){
                                $.post('http://steamcommunity.com/games/453830/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 6});
                                setTimeout(function (){
                                    preset6();
                                }, p);
                            }, p);
                        }, p);
                    }, p);
                }, p);
            }, p);
        }, p);
    }
}

function preset7(){
    if (stop_flag===0){
        $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 0});
        setTimeout(function (){
            $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 1});
            setTimeout(function (){
                $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 2});
                setTimeout(function (){
                    $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 3});
                    setTimeout(function (){
                        $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 4});
                        setTimeout(function (){
                            $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 5});
                            setTimeout(function (){
                                $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 6});
                                setTimeout(function (){
                                    $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 7});
                                    setTimeout(function (){
                                        $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 8});
                                        setTimeout(function (){
                                            $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 9});
                                            setTimeout(function (){
                                                $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 10});
                                                setTimeout(function (){
                                                    $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 11});
                                                    setTimeout(function (){
                                                        $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 12});
                                                        setTimeout(function (){
                                                            $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 13});
                                                            setTimeout(function (){
                                                                $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 14});
                                                                setTimeout(function (){
                                                                    $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 15});
                                                                    setTimeout(function (){
                                                                        $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 16});
                                                                        setTimeout(function (){
                                                                            $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 17});
                                                                            setTimeout(function (){
                                                                                $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 18});
                                                                                setTimeout(function (){
                                                                                    $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 19});
                                                                                    setTimeout(function (){
                                                                                        $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 20});
                                                                                        setTimeout(function (){
                                                                                            $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 21});
                                                                                            setTimeout(function (){
                                                                                                $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 22});
                                                                                                setTimeout(function (){
                                                                                                    $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 23});
                                                                                                    setTimeout(function (){
                                                                                                        $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 24});
                                                                                                        setTimeout(function (){
                                                                                                            $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 25});
                                                                                                            setTimeout(function (){
                                                                                                                $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 26});
                                                                                                                setTimeout(function (){
                                                                                                                    $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 27});
                                                                                                                    setTimeout(function (){
                                                                                                                        $.post('http://steamcommunity.com/games/sentris/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 28});
                                                                                                                        setTimeout(function (){
                                                                                                                            preset7();
                                                                                                                        }, p);
                                                                                                                    }, p);
                                                                                                                }, p);
                                                                                                            }, p);
                                                                                                        }, p);
                                                                                                    }, p);
                                                                                                }, p);
                                                                                            }, p);
                                                                                        }, p);
                                                                                    }, p);
                                                                                }, p);
                                                                            }, p);
                                                                        }, p);
                                                                    }, p);
                                                                }, p);
                                                            }, p);
                                                        }, p);
                                                    }, p);
                                                }, p);
                                            }, p);
                                        }, p);
                                    }, p);
                                }, p);
                            }, p);
                        }, p);
                    }, p);
                }, p);
            }, p);
        }, p);
    }
}

function preset8(){
    if (stop_flag===0){
        $.post('http://steamcommunity.com/games/538410/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 0});
        setTimeout(function (){
            $.post('http://steamcommunity.com/games/538410/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 1});
            setTimeout(function (){
                $.post('http://steamcommunity.com/games/538410/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 2});
                setTimeout(function (){
                    $.post('http://steamcommunity.com/games/538410/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 3});
                    setTimeout(function (){
                        $.post('http://steamcommunity.com/games/538410/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 4});
                        setTimeout(function (){
                            $.post('http://steamcommunity.com/games/538410/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 5});
                            setTimeout(function (){
                                preset8();
                            }, p);
                        }, p);
                    }, p);
                }, p);
            }, p);
        }, p);
    }
}

function preset9(){
    if (stop_flag===0){
        $.post('http://steamcommunity.com/games/536470/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 0});
        setTimeout(function (){
            $.post('http://steamcommunity.com/games/536470/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 1});
            setTimeout(function (){
                $.post('http://steamcommunity.com/games/536470/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 2});
                setTimeout(function (){
                    $.post('http://steamcommunity.com/games/536470/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 3});
                    setTimeout(function (){
                        $.post('http://steamcommunity.com/games/536470/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 4});
                        setTimeout(function (){
                            $.post('http://steamcommunity.com/games/536470/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 5});
                            setTimeout(function (){
                                preset9();
                            }, p);
                        }, p);
                    }, p);
                }, p);
            }, p);
        }, p);
    }
}

function preset10(){
    if (stop_flag===0){
        $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 0});
        setTimeout(function (){
            $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 1});
            setTimeout(function (){
                $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 2});
                setTimeout(function (){
                    $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 3});
                    setTimeout(function (){
                        $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 4});
                        setTimeout(function (){
                            $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 5});
                            setTimeout(function (){
                                $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 6});
                                setTimeout(function (){
                                    $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 7});
                                    setTimeout(function (){
                                        $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 8});
                                        setTimeout(function (){
                                            $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 9});
                                            setTimeout(function (){
                                                $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 10});
                                                setTimeout(function (){
                                                    $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 11});
                                                    setTimeout(function (){
                                                        $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 12});
                                                        setTimeout(function (){
                                                            $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 13});
                                                            setTimeout(function (){
                                                                $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 14});
                                                                setTimeout(function (){
                                                                    $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 15});
                                                                    setTimeout(function (){
                                                                        $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 16});
                                                                        setTimeout(function (){
                                                                            $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 17});
                                                                            setTimeout(function (){
                                                                                $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 18});
                                                                                setTimeout(function (){
                                                                                    $.post('http://steamcommunity.com/games/432330/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 19});
                                                                                    setTimeout(function (){
                                                                                        preset10();
                                                                                   }, p);
                                                                                }, p);
                                                                            }, p);
                                                                        }, p);
                                                                    }, p);
                                                                }, p);
                                                            }, p);
                                                        }, p);
                                                    }, p);
                                                }, p);
                                            }, p);
                                        }, p);
                                    }, p);
                                }, p);
                            }, p);
                        }, p);
                    }, p);
                }, p);
            }, p);
        }, p);
    }
}

function preset_manager(n){
    switch(n) {
        case 1:
            preset1();
            break;
        case 2:
            preset2();
            break;
        case 3:
            preset3();
            break;
        case 4:
            preset4();
            break;
        case 5:
            preset5();
            break;
        case 6:
            preset6();
            break;
        case 7:
            preset7();
            break;
        case 8:
            preset8();
            break;
        case 9:
            preset9();
            break;
        case 10:
            preset10();
            break;
        default:
            alert ('I dunno how you did this, but IT IS AN ERROR!');

}
}

$(document).ready(function(){
    $('.profile_header_actions').append(data_1);
    $('#enable_av').append(data_2);
    for (i=1; i<=p_number; i++){
        $('#avatar_presets').append('<a class="popup_menu_item  btn_profile_action" style="text-align: center">Preset '+i+'</a>');
    }
    $('#enable_av').click(function() {
        if($('#avatar_presets').css("display")=="block"){
            $('#avatar_presets').css({"display":"none"});
        }else{
            $('#avatar_presets').css({"display":"block"});
        }
        if($('#enable_av').find('span').text()=='Enable Animated Avatar'){
            $('#enable_av').find('span').text('Choose Animated Preset');
        }else{
            $('#enable_av').find('span').text('Enable Animated Avatar');
        }
    });
    $('.popup_menu_item.btn_profile_action').click(function() {
        $('#enable_av').find('span').css({"display":"none"});
        $('#disable_av').find('span').css({"display":"block"});
        stop_flag=0;
        preset_manager($(this).index()+1);
        ShowAlertDialog ('Info','Animated avatar is enabled!');
    });
    $('#disable_av').click(function() {
        stop_flag=1;
        ShowAlertDialog ('Info','Animated avatar is disabled! Thanks for using this script! Any questions? Visit the support page: lite-one.tk/2017/02/05/animated-avatar');
        $('#enable_av').find('span').css({"display":"block"});
        $('#disable_av').find('span').css({"display":"none"});
        $('#enable_av').find('span').text('Enable Animated Avatar');
    });
});
