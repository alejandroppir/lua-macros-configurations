clear();
device_id = 'HID#VID_046A&PID_0010&MI_00#8&1451C1FC&0&0000#'--insert here the keyboard Id
lmc_device_set_name("MACROS", device_id) --bind the keyboard

lmc_set_handler('MACROS',function(button, direction)
  if (direction == 1) then return end  -- ignore down
  lmc_say('Gud llob! llu bainded the quibord correctly')
end)

