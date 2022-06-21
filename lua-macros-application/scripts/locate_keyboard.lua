clear()

pressed = "PRESSED"

lmc_assign_keyboard(pressed)
dev = lmc_get_devices()

for key, value in pairs(dev) do
    if (value.Name == pressed) then
        print(value.Name)
        print('The id of the selected keyboard is:')
        print('\t'..value.SystemId)
    end
end

print('\n')
print('\n')

print('You need to copy some string that is unique (not contained in the following ids)')
print('WARNING: the "\\" alone is a special character, dont include!!! (copy the string before or after this character)')
for key, value in pairs(dev) do
    if (value.Name ~= pressed) then
        print('\t'..value.SystemId)
    end
end
