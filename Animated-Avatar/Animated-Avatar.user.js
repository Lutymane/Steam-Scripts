// ==UserScript==
// @name         Animated Avatar
// @icon         https://store.steampowered.com/favicon.ico
// @namespace    top_xex
// @version      5.0
// @description  Makes your profile picture animated using standard game avatars on Steam
// @author       Lite_OnE
// @match        https://steamcommunity.com/id/*
// @homepageURL  https://xeox.xyz
// @supportURL   https://github.com/LiteOnE/Steam-Scripts/issues
// @updateURL    https://github.com/LiteOnE/Steam-Scripts/raw/master/Animated-Avatar/Animated-Avatar.meta.js
// @downloadURL  https://github.com/LiteOnE/Steam-Scripts/raw/master/Animated-Avatar/Animated-Avatar.user.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

var timeout = 3000;   //!Dont modify this value or you will get VAC and community banned! As well SWAT will break into your house in few minutes
var isRunning = false;
var button = `
<a class="btn_darkred_white_innerfade btn_medium" id="enable_anim">
    <span>
        Enable Animated Avatar
    </span>
</a>`;

const presetsData = [
    [526800, 5, ["https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/db/db0d01b70afa148924acd3f391e3bd542ba000d1_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/54/542d3bf2beea870c0e01ca3a2ed24ff47e3a3fc4_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/92/92e6de9a111fb84b88dfb2ee7007c7cd1f03a0a3_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/81/811d913ac1ed8e24f488069be50980ef2c6fccef_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/6e/6e3e77e2007453543efbac19079ec072552e457e_medium.jpg",]],
    [269570, 7, ["https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0f/0f3ca8d724eaec3170564493b9d1a7860463778d_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/03/034415e73b0dbeb6fa4619073d77361d93e1f733_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/2c/2c5e6a8a0266e5f8f006327f95732c054f296b07_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f4/f4cc140b1c3536a0472f3f20109eb24bc32f0958_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/8b/8be2745538b66356aaded140723d4f1db8291473_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/8e/8e90795d6c41f51e0d0f859324ce3d89c72144a6_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/95/95cf157ccf12e3bf362419e4c9add5bdc5e748a6_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/27/2755c003813c860db3186e0491db326f6cef0fc9_medium.jpg",]],
    [453830, 7, ["https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b5/b59d15a18eb78d702573aa5694ba0fced7109b42_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/32/32089cf605720a3328c9c2baecd0295d759352ed_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/2f/2f7707e81810c0c937c5311bf81582515a1abf34_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/57/57559138b5de3d814a548115426b01027deae5a8_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/99/9901a21662cc5ec034d4d6c3457f440204bb16b8_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/8e/8ea44219ba9fc8adbfed8225260f5baa52a90fe5_medium.jpg",]],
    ['NinjasPlusPlus', 11, ["https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/7d/7df9c118ef15066ee406993651769849a8d2769b_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/25/25131075b333078c10d78d4d27ac6e66a93c70f3_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/01/018b94c330cb94c253f37dba04bffeee97db87d2_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/90/90b1b8e57830f1e5a362bf882b32c855cf814c70_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f8/f8036b713307b711391bf6d95fed91a8d22ffc96_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b8/b836ca804e0f338e7a35617ee54c20915333a8f4_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/7c/7ce0fd2d433817699113d97d787b48d2eba610e6_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/d4/d43d28584a79403796fa9fa1302af75f90a2b4fc_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/2c/2c6be004f0539bec65e48ced70e9dab9592421ca_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ee/eeb76270e0a8e69d9f93212865f65aa882bdee46_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/76/76202d1cce80dabfaeb5a927c88659a61ca5163b_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4d/4d84830db36b8002f9a4c0c3cd39f1ec6af4876b_medium.jpg",]],
    ['SuperDistro', 8, ["https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/36/36ff338d8015e08121451ba0d8faf873cd521b5d_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/03/03d9f5588297dc94bd5aef555b606f8e0a2982de_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/eb/eb02205ec5dc61031c03c98076e2ff162fc6067a_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b5/b5e256d411a1f2a346784747f999578454c3aa06_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/81/819965f3e186e7a34fb656c76de4f925654e8365_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0f/0fa25b420a165d8ab5e832f1cc33009d3731bbc7_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/6b/6b412a5d9f88dc13bb83bc0146e65beae7cb3d58_medium.jpg",]],
    [471220, 4, ["https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/89/894b255f35eb6a5b8081603d507c12893f0cf075_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/42/4252370ebe55dabc4a4ab171d67289f872bf8c54_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/7b/7bbba49627e3a20838214eef6f1580e96bfd30b6_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4e/4eeb15b84113a67648bc6bc1c6316531b18a90b9_medium.jpg",]],
    [536470, 4, ["https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c8/c82709d2b38665004703da19a7f1e7f486e6aed2_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e5/e5b457e0fd3a7b7c0673a66cab9a937b1c1f5bfb_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/03/0362f51df0665562d4b2c98e9c9de30c06a71b02_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/eb/eb81e26a4c4d928b614e78313d5b3bae0892ac65_medium.jpg",]],
    [432330, 20, ["https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ea/eafd7cec83089c5f5d6abd1b87bcfa44e0b86800_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/04/04ab8776488961ae0fb356b5715ea15b3350ef1c_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/12/12e22bcb24a53ed56bd4a4b7711ae5bd25611c73_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b2/b22126a65988020b5644e1cfb11d8af054a0e4a3_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/d4/d4de9b51abd545617d22f5a1375628235d3cba32_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e3/e37933d9a1be8e262bed4e8abb279f94e367ba79_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/dfa74392dcfd2bf536bec5af475065902336ba18_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/65/6551a9a2a36756db34edda090d94bb03a4c88eac_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/3e/3ee5b662623b549a649518c147ae7d53ef4c4bc2_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/a8/a86605fb74483e71a308905b57036aba2c086a65_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c4/c4414ddb3d262bcdd7428759e71055871e5cdaea_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/67/67a601c7048e887369edb399970801b371124019_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/d9/d93a7d16d55ed9c818f770bc6fc046e7ed7ba771_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/02/02f7d9953823b6ced8b624985b43f8038ffed1cb_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/dd/ddfdcea0e707631a68237b094735c2e1be05188e_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/18/181dceda89e2242f99a22b740bb8131046e008b5_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/47/4765bd0199ffa12a7b1bb7f8e2bfec766b572de5_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/6d/6d4c30600974946366c30bfb0cae86af5b41854c_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/80/80ad7639369a5f8bd65280906c2e88d03811a41a_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4f/4f02586e0e587879bf0d51102326d3e620a6bfa7_medium.jpg",]],
    ['sentris', 28, ["https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b6/b60b4612f7053c08e961b9fba2ddb0bbbf6df94d_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/92/9242ab9a702c3054cb4d15b9f3c32505a53b687d_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/a1/a11966cdcea7144bd5cd441c093c347245be84cc_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/5f/5ff77f23c4ed6a4c907e325be62d753aad8417c6_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f3/f317aad3e9d52d89b1593a3128ae4b3e445cb095_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/32/3265e4e75d518bc10a589e6833da05d73afcf21e_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/56/56694c30bb60c00bcf76703a52f54aa74b4e0428_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/07/07f2c40851434e3678dbc40403fb531ce6b26e2d_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/96/961ffbb477f8cc91f5a25ef78f2113598b901bf6_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/98/985c9782e248664b920a4b6e587de8aecc5e90ea_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/22/222a3f38391d53382e24de253f5939a4f1b30f88_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c7/c71471e82d2deb3e1333231d3e09fcf9ef49e8cb_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ff/ffaea0f09d13cba47364393946cdc529f1e5e7c6_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/8b/8b3f055c43a67babe4049874cebd1c07400dcf98_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ac/ac460a33f76aeb77375c3955f7eb7c5355fef91f_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/49/49d6ec912579644c149d5ca0e61d3c5e5935eca9_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c9/c9cebbf02b48af361ff82144c14b7bb5ae55ee0d_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/2c/2c3d1ee1888832f756ae1ae90c488ac631509fd0_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fecfa55fca04f51b59614eca8442e0b224843a89_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/8e/8eceb16c3c17e64d8652c2c86762ec0edece6cb6_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/46/4690960b5f5fd1059ecca387ceee4e0a687e0281_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/92/923fa024e8ccd4132ab2c63c490d980e8869c014_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f6/f640860794400c4062a729d74226b60f61c3b111_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/3a/3a63f85b9d765ee5880ec4b3a263c39f038fdf99_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/d5/d5809070eeee7b8f717138804a525f05a4b190e3_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fe8f0286d99c60a184d107bea6666376899a8d6c_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/50/505e004b6989509312fe0882ffd794cb357344b6_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0a/0a1052f22066ee2e2cfe8f3fad0c47439600a6a2_medium.jpg",]],
    [538410, 6, ["https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c3/c33aae92270c2a52d15d828f7733025758555a71_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/91/9161ac3da504edae89db110c9620190baa5a99e1_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/45/450060a43699113a2652365c21eff1a1986e55ee_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/48/48043e4053bdee9c9c9ccff03f22f444c6c661fa_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b0/b09c314ae784fbf278bea4b2308bda82ffd08921_medium.jpg", "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b4/b49e848439166c3e3a95b7e97bb3648a685cf5b4_medium.jpg",]],

];
/*
const presets = [
    [471220, 4],
    [269570, 8],
    [526800, 5],
    ['NinjasPlusPlus', 12],
    ['SuperDistro', 8],
    [453830, 7],
    ['sentris', 29],
    [538410, 6],
    [536470, 4],
    [432330, 20]
];

var arrayStr = '';
var loaded = 0;

function fetchAvatars(current) {
    if (current < presets.length) {
        $J.get(`https://steamcommunity.com/games/${presets[current][0]}/Avatar/List`).done(data => {
            var imgs = $J(data).find('#mainBodySingle').find('img');

            var preset_arr = '[';

            for (var i = 1; i < presets[current][1] * 3; i += 3) {
                preset_arr += '"' + imgs.eq(i).attr('src') + '", ';
            }

            preset_arr += ']';

            arrayStr += `[${presets[current][0]}, ${presets[current][1]}, ${preset_arr}],\n`;

            loaded += 1;

            if (loaded == presets.length) {
                console.log(arrayStr);
            }
        });

        fetchAvatars(current + 1)
    }
}

fetchAvatars(0);
*/

function selectAvatar(preset, num) {
    if (isRunning) {
        $.post(`https://steamcommunity.com/games/${presetsData[preset][0]}/selectAvatar`,
            {
                sessionid: g_sessionID,
                selectedAvatar: num
            }).done(data => { }).fail(data => { });

        setTimeout(() => {
            selectAvatar(preset, (num + 1) % presetsData[preset][1]);
        }, timeout);
    }
}

function runProcess(id) {
    isRunning = true;

    ShowAlertDialog('Your avatar is being animated', 'Click "Stop" to finish the process', 'Stop').done(e => {
        isRunning = false;
        updatePresetAnimations(0);
    });

    selectAvatar(id, 0);
}

var previewImgs = null;

function updatePresetAnimations(counter) {
    if (!isRunning) {
        for (var i = 0; i < presetsData.length; i += 1) {
            previewImgs.eq(i).attr('src', presetsData[i][2][counter % presetsData[i][1]]);
        }

        setTimeout(() => {
            updatePresetAnimations(counter + 1)
        }, timeout);
    }
}

function openAvatarsModal() {
    var innerContent = '';

    for (var i = 0; i < presetsData.length; i += 1) {
        innerContent += `<img style="margin: 5px" src="${presetsData[i][2][0]}" data-preset="${i}"></img>`;

        if (i % 5 == 0 && i > 0) {
            innerContent += '<br>';
        }
    }

    ShowAlertDialog('Choose preset', innerContent);

    $('[data-preset]').click(e => {
        var presetID = $(e.currentTarget).data('preset');

        if (presetID < presetsData.length) {
            runProcess(presetID);
        }
    });

    previewImgs = $J('.newmodal_content').find('img');

    updatePresetAnimations(0);
}

$(() => {
    $('.profile_header_actions').append(button);
    $('#enable_anim').click(openAvatarsModal);
});
