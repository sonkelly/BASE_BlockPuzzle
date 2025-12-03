"use strict";
window.HALL_SCENE_NAME = "menu",
window.MENU_SCENE_NAME = "GameMenu",
window.GAME_SCENE_NAME = "game_killMonster",
window.STEP_SCENE_NAME = "GameStep",
window.RELIVE_COST_PIC_PATH = "sprite/icon_money",
window.RELIVE_COST_NUM = 50,
window.VIDEO_TIMES = 5,
window.SHARE_TIME = 2500,
window.bgmAudioID = -1,
window.BGM = "sound/bgm",
window.BUTTON_CLICK_MUSIC = "sound/button",
window.CHALLENG_VICTORY_MUSIC = "sound/win",
window.CHALLENG_FAIL_MUSIC = "sound/fail",
window.SKILL_ADD_HP = "sound/addhp",
window.GET_GOLD = "sound/getgoldmusic",
window.FENG = "sound/feng",
window.BOMB = "sound/boom",
window.BE_HIT = "sound/mon1hit",
window.SAY_3 = "sound/taibangle",
window.BOOM_EFFECT = "sound/explode3",
window.SERVER_TIME = 0,
window.GRID_WIDTH = 100,
window.GRID_HEIGHT = 100,
window.BOX_SHARE = !1,
window.SKIN_SHARE = !1,
window.BLOCKLIST = [[], [{
    tag: 0,
    hp: 1,
    name: "red_block"
}, {
    tag: 1,
    hp: 2,
    name: "blue_block"
}, {
    tag: 2,
    hp: 3,
    name: "green_block"
}, {
    tag: 3,
    hp: 4,
    name: "yellow_block"
}], [{
    tag: 0,
    hp: 999,
    name: "solider"
}], [{
    tag: 0,
    hp: 999,
    name: "block_stone"
}], [{
    tag: 0,
    hp: 1,
    name: "gold_block"
}], [{
    tag: 0,
    hp: 1,
    name: "hp1_block"
}, {
    tag: 1,
    hp: 3,
    name: "hp3_block"
}, {
    tag: 2,
    hp: 5,
    name: "hp5_block"
}]],
window.MONSTER_CONFIG = [{
    tag: 0,
    name: "monster0",
    scale: 2,
    bloodheight: 108,
    happy_talk: ["Ahaha", "It's OK,555", "Energetic, not tired at work!"],
    fail_talk: ["I'll be back", "I'm going to sneak away..."],
    normal_talk: ["emmmmm!", "Do you pay tolls?", "No way to knock me down", "I'm so cute, you hit me?", "Look an ad, dear"],
    angry_talk: ["So angry!"],
    victoy_talk: ["Haha, you can't beat me", "Haha, stupid mortal", "Long live the king of the hill!"],
    start_talk: ["I own the mountain here, otherwise...!", "Uh, who am I and where am I", "Long live the black magic~!", "My dear, Look an ad"],
    attack_talk: ["I will block your attack!", "Look at mine"]
}, {
    tag: 1,
    name: "monster1",
    scale: 1.7,
    bloodheight: 100,
    happy_talk: ["Ahaha", "It's OK, 555", "Energetic, not tired at work!"],
    fail_talk: ["I'll be back", "Wait and see"],
    normal_talk: ["emmmmm!", "Come and hit me!", "If you want to beat me, there is no way", "Actually, I am here to make a cameo", "Watch a video and change the batch"],
    angry_talk: ["I'm so mad!", "Die you", "I don't want to be eaten"],
    victoy_talk: ["Haha, you can't beat me", "Haha, stupid human"],
    start_talk: ["Storm chicken is eating chicken, cluck!", "Chicken lays eggs, eggs lay chickens", "Video asks for points"],
    attack_talk: ["I will block your attack!", "Watch my stone smash"]
}, {
    tag: 2,
    name: "monster2",
    scale: 1.7,
    bloodheight: 119,
    happy_talk: ["Ahaha", "It's OK, 555", "Energetic, not tired at work!"],
    fail_talk: ["I'll be back", "Yeah, I'll step back and redeploy"],
    normal_talk: ["emmmmm!", "Come and hit me!", "If you want to beat me, there is no way", "Where is Chang'e!", "Uh, please click the video"],
    angry_talk: ["I'm so mad!", "Our Tutu family will not let you go!"],
    victoy_talk: ["Haha, you can't beat me", "Haha, stupid human"],
    start_talk: ["Little Bunny is here, chug chug!", "Secretly, what can I steal", "Pretending to be a ghost and pretending to be a horse"],
    attack_talk: ["I will block your attack!", "Watch my stone smash"]
}, {
    tag: 3,
    name: "monster3",
    scale: 1.3,
    bloodheight: 196,
    happy_talk: ["Ahaha", "It's OK, 555", "Energetic, not tired at work!"],
    fail_talk: ["I'll be back", "Yeah, I'm stepping down, orcs will never be slaves"],
    normal_talk: ["emmmmm!", "Come and try Tiger Fist", "no way to defeat me", "It's too late for you to surrender now", "A mere bomb can't beat me!"],
    angry_talk: ["I'm so mad!", "Shame, shame!"],
    victoy_talk: ["Haha, you can't beat me", "Haha, stupid human", "You better come back in a few years"],
    start_talk: ["I am invincible, please give me more advice", "Who are you, come here", "The tribe will win!"],
    attack_talk: ["I will block your attack!", "Watch my stone smash"]
}],
window.TOOL_CONFIG = [{
    tag: 0,
    nickname: "bomb",
    tool_desc: "Choose a grid to place a bomb to destroy all candies around it.",
    name: "boom_block"
}, {
    tag: 1,
    nickname: "Armed Strengthening",
    tool_desc: "Fortify your candies to double attack damage.",
    name: "strong"
}],
window.SKIN_CONFIG = [{
    tag: 0,
    price: 0,
    name: "block",
    way: 0
}, {
    tag: 1,
    price: 100,
    name: "block_bian",
    way: 0
}, {
    tag: 2,
    price: 200,
    name: "block_di",
    way: 0
}, {
    tag: 3,
    price: 400,
    name: "block_star",
    way: 0
}, {
    tag: 4,
    price: 600,
    name: "block_monster",
    way: 1
}],
window.CONFIG_GUIDE = [[], [{
    type: 2,
    target: "Canvas/n_UI/sp_tool1",
    desc: "This shows little cute you have. If you run out of little cute and you haven't defeated the monster, you will lose!",
    descsize: [300, 200],
    dir: 2,
    delaytime: 0,
    offsetY: 0
}, {
    type: 1,
    target: 41,
    desc: "Click on the candy to place the cute thing, and the candy will automatically attack the monster!",
    descsize: [300, 200],
    dir: 1,
    delaytime: 1200,
    offsetY: 0
}, {
    type: 1,
    target: 37,
    desc: "Marvelous! Put another cute thing, and the candy between the two cute things will be swept away to attack the monster!",
    descsize: [310, 230],
    dir: 1,
    delaytime: 700,
    offsetY: 0
}, {
    type: 2,
    target: "Canvas/n_gamenode/n_target/sp_targetbg",
    desc: "Note that the candies shown here are valid for attacking monsters!",
    descsize: [310, 230],
    dir: 1,
    delaytime: 0,
    offsetY: -250
}, {
    type: 2,
    target: -1,
    desc: "Reminder, the effect of placing two cute creatures next to each other is greatly reduced! Do not place too close to Oh!",
    descsize: [310, 230],
    dir: 1,
    delaytime: 0,
    offsetY: 0
}], [{
    type: 2,
    target: 40,
    desc: "Pay attention, this candy will increase the blood volume of the monster, be careful not to touch it!",
    descsize: [300, 200],
    dir: 1,
    delaytime: 0,
    offsetY: 0
}], [{
    type: 2,
    target: 40,
    desc: "Be careful, the stone candy will prevent the cute creatures on the same line from taking away the candy, use the bomb to eliminate the stone candy",
    descsize: [300, 200],
    dir: 1,
    delaytime: 0,
    offsetY: 0
}, {
    type: 2,
    target: "Canvas/n_UI/sp_tool2",
    desc: "Use the bomb to eliminate the stone candy,try it",
    descsize: [300, 200],
    dir: 1,
    delaytime: 0,
    offsetY: 0
}], [{
    type: 2,
    target: "Canvas/n_gamenode/n_target/sp_targetbg",
    desc: "Pay attention, only these two kinds of candy attack monsters are effective in this level",
    descsize: [310, 230],
    dir: 1,
    delaytime: 0,
    offsetY: -250
}]],
window.MON_COLOR = [cc.Color.WHITE, cc.Color.WHITE, cc.Color.ORANGE, cc.Color.GREEN, cc.Color.BLUE, cc.Color.MAGENTA],
window.ENV = "release-yzkoh",
window.SHARE_RELIVE = !1,
window.LOGIN_REWARD = !1,
window.INVATION_REWARD = !1,
window.TOOL_NUM = [1, 1],
window.SKIN_CONFIG_STATE = [2, 0, 0, 0, 0],
window.GAME_SAVE_HANDLER = "handler_data",
window.GAME_UPDATE_DATA = "update_data",
window.GAME_RANK_LISTENER = "rank_listener",
window.ON_SHOW_BACK = "onshowback",
window.INIT_GAME_SAVE_DATA = {
    top_score: 0,
    gold_num: 0,
    top_level: 0,
    tool: window.TOOL_NUM,
    skin: window.SKIN_CONFIG_STATE,
    login_time: ""
};
