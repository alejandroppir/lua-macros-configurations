module ("keys_constants", package.seeall)

local key = {
    --esc
    esc = 27,


    --function_keys
    f1 = 112,
    f2 = 113,
    f3 = 114,
    f4 = 115,
    f5 = 116,
    f6 = 117,
    f7 = 118,
    f8 = 119,
    f9 = 120,
    f10 = 121,
    f11 = 122,
    f12 = 123,


    --special_keys
    --row1
    impr = 44,
    despl = 145,
    pausa = 19,
    --row2
    insert = 45,
    home = 36,
    pageup = 33,
    --row3
    supr = 46,
    fin = 35,
    pagedown = 34,


    --num_pad
    --specials
    bloqnum = 144,
    num_divide = 111,
    num_multiply = 106,
    num_substract = 109,
    num_plus = 107,
    num_enter = 13,
    num_dot = 110,
    --numbers
    num_one = 97,
    num_two = 98,
    num_three = 99,
    num_four = 100,
    num_five = 101,
    num_six = 102,
    num_seven = 103,
    num_eight = 104,
    num_nine = 105,


    --arrow_keys
    up = 38,
    down = 40,
    left = 37,
    right = 39,


    --main_keyboard
    --numbers
    one = 49,
    two = 50,
    three = 51,
    four = 52,
    five = 53,
    six = 54,
    seven = 55,
    eight = 56,
    nine = 57,
    zero = 48,

    --special characters
    --row1
    backslash = 220,
    simplequote = 219,
    open_exclamation = 221,
    del = 8,

    --row2
    tab = 9,
    backquote = 186,
    plus = 187,
    enter = 13,
    --row3
    caps = 20,
    forwardquote = 222,
    cedilla = 191,
    --row4
    left_shift = 16,
    compare_simbol = 226,
    comma = 188,
    dot = 190,
    hyphen = 189,
    right_shift = 16,
    --row5
    control = 17,
    left_win = 91,
    alt = 18,
    space = 32,
    altgr = 18,
    right_win = 92,
    secondary_button = 93,
    right_control = 17,
    --leters
    a = 65,
    b = 66,
    c = 67,
    d = 68,
    e = 69,
    f = 70,
    g = 71,
    h = 72,
    i = 73,
    j = 74,
    k = 75,
    l = 76,
    m = 77,
    n = 78,
    enhe = 192,
    o = 79,
    p = 80,
    q = 81,
    r = 82,
    s = 83,
    t = 84,
    u = 85,
    v = 86,
    w = 87,
    x = 88,
    y = 89,
    z = 90
}
function keys()
return key
end
