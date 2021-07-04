--clear the console
clear()

print("Setting configurations...")
--configurations
lmc.minimizeToTray = false --minimize the app
sound = false  --define if say the action in speakers
verbose = false  --define if write the action in console
lmc_device_set_name("MACROS", "13A4872C")
--route to scripts
package.path = package.path .. ";E:\\lua-macros-configurations\\scripts\\?.lua"
--lmc_print_devices()
print("Configurations setted...")

print("Configuring...")
--launch configurations
if (sound) then
    lmc_say("Lanzando macros")
end
if (lmc.minimizeToTray) then
    lmc_minimize()
end

print("initialize variables...")
kc = require "keys_constants"

print("Starting macros...")
lmc_set_handler(
    "MACROS",
    function(button, direction)
        if (direction == 0) then
            return
        end -- ignore down

        if (button == kc.keys().f1) then
            sound = not sound
        elseif (button == kc.keys().f2) then
            verbose = not verbose

        elseif (button == kc.keys().a) then
            hotkey("^a", "select all")
        elseif (button == kc.keys().c) then
            hotkey("^c", "copy")
        elseif (button == kc.keys().v) then
            hotkey("^v", "paste")
        elseif (button == kc.keys().e) then
            hotkey("#e")
        elseif (button == kc.keys().z) then
            hotkey("^a#e")
        else
            lmc_say(string.char(button))
        end
    end
)

function hotkey(keyaction, text_to_say)
    if (sound) then
        lmc_say(text_to_say)
    end
    if (verbose) then
       print('command: ' .. text_to_say)
    end
    lmc_send_keys(keyaction)
end
