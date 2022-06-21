clear()
--first you need to load the path
package.path = package.path .. ";E:\\lua-macros-configurations\\scripts\\?.lua"
local constName = require "filename"
print(constName.function())      