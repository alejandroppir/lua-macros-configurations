-------THIS IS THE CONFIGURATION OF THE SCRIPT---------
keyboard_id = '1451C1FC'
scripts_path = 'E:\\lua-macros-configurations\\scripts\\?.lua'

--clear the console
clear()

print("Setting configurations...")
--configurations
lmc.minimizeToTray = false --minimize the app
sound = false --define if say the action in speakers
verbose = false --define if write the action in console
disable_keyboard = false --define if the keyboard is disabled
unknown_to_key = false --define if an unknown key send as normal prints
disable_macro = false --define if the macros are disabled

lmc_device_set_name("MACROS", keyboard_id) --bind the keyboard
--route to scripts
package.path = package.path .. ";"..scripts_path -- path of the scripts
--lmc_print_devices()
print("Configurations setted...")

print("Configuring...")
--configure
if (sound) then
    lmc_say("Lanzando macros")
end
if (lmc.minimizeToTray) then
    lmc_minimize()
end

print("initialize constants...")
kc = require "keys_constants"

print("Starting macros...")
lmc_set_handler(
    "MACROS",
    function(button, direction)
        if (direction == 0) then --ignore keydown, only work on keyup
            return
        end

        --configuration
        if (button == kc.keys().f1) then
            sound = not sound
            return
        elseif (button == kc.keys().f2) then
            verbose = not verbose
            return
        elseif (button == kc.keys().f3) then
            unknown_to_key = not unknown_to_key
            return
        elseif (button == kc.keys().f4) then
            disable_macro = not disable_macro
            return
        elseif (button == kc.keys().f12) then
            disable_keyboard = not disable_keyboard
            return
        end
        --end configuring keys
        if (disable_keyboard) then
            return
        end
        if (disable_macro) then
            lmc_send_input(button, 0, 0)
            lmc_send_input(button, 0, 2)
            return
        end

        --first row
        if (button == kc.keys().q) then
            hotkey(": number", "type number")
        elseif (button == kc.keys().w) then
            hotkey(": string", "type string")
        elseif (button == kc.keys().e) then
            hotkey(": void", "type void")
        elseif (button == kc.keys().r) then
            hotkey(": any", "type any")
        elseif (button == kc.keys().t) then
            hotkey(": unknown", "type unknown")
        elseif (button == kc.keys().y) then
            hotkey(": AsseTagValue", "type Asse tag value")
        elseif (button == kc.keys().u) then
            hotkey("[ ]	", "array")
        elseif (button == kc.keys().i) then
            hotkey("= null", "equal null")
        elseif (button == kc.keys().o) then
            hotkey("= 0", "equal 0")
        elseif (button == kc.keys().p) then
            --second row
            hotkey("= []", "equal array")
        elseif (button == kc.keys().a) then
            hotkey("^l", "locate in visual")
        elseif (button == kc.keys().s) then
            hotkey("+%a", "Toogle comment")
        elseif (button == kc.keys().d) then
            hotkey("^+x", "to uppercase")
        elseif (button == kc.keys().f) then
            hotkey("^+y", "to lowercase")
        elseif (button == kc.keys().g) then
            --third row
            hotkey("^+r", "extractor")
        elseif (button == kc.keys().z) then
            --no macro
            hotkey("function{(}  {)}): void %>(´) {ENTER 2} %>(}){up 2}^{left}+(^{right})", "method")
        else
            if (unknown_to_key) then
                sendInput(button, "unknown key " .. string.char(button) .. " - " .. button)
            else
                log("unknown key " .. string.char(button) .. " - " .. button)
            end
        end
    end
)

function hotkey(keyaction, text_to_say)
    log(text_to_say)
    lmc_send_keys(keyaction)
end

function sendInput(keyaction, text_to_say)
    log(text_to_say)
    lmc_send_input(keyaction, 0, 0)
    lmc_send_input(keyaction, 0, 2)
end

function log(text_to_say)
    if (sound) then
        lmc_say(text_to_say)
    end
    if (verbose) then
        print("command: " .. text_to_say)
    end
end

