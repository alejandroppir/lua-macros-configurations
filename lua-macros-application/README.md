# Explanation/config

### Id teclado
Lo primero que debemos hacer es localizar el id del teclado
> Para localizar el id del teclado se puede lanzar el script locate_keyboard.lua
> Este script nos pide pulsar una tecla en el dispositivo que queremos usar para las macros y nos devuelve el ID de este dispositivo

Para comprobar si es un id valido podemos usar el script test_id.lua

Una vez tengamos el id localizado lo copiamos teniendo en cuenta las restricciones indicadas por locate_keyboard


### Configurar el script
El id que hemos obtenido previamente debemos asignarlo en el fichero de nuestro script. 
```sh
keyboard_id = '1451C1FC'
lmc_device_set_name("MACROS", keyboard_id)
```

Tambien es necesario asignar la ruta de los posibles scripts usados (ej. ficheros de constantes)(no substituir el '?' por nada, esto marca la ruta de la carpeta)
```sh
scripts_path = 'C:\\folder_path\\?.lua'
```

### Lanzar
Para lanzar el script es necesario lanzar la aplicacion LuaMacros.exe, cargar el script y darle a ejecutar

Otra opcion es programar su lanzamiento al inicio del sistema:
```sh
win + r
shell:startup
```
En la carpeta que se abre pegar un acceso directo a LuaMacros.exe
Editar este acceso y en el campo _destino_ añadir la direccion del script que queremos lanzar
```sh
C:\...\LuaMacros.exe -r C:\...\default-script.lua
```
----------------------------------------
### Keyboard id
The first thing we must do is locate the keyboard id
> To locate the keyboard id you can launch the locate_keyboard.lua script
> This script asks us to press a key on the device we want to use for macros and returns the ID of this device

To check if it is a valid id we can use the script test_id.lua

Once we have the id located we copy it taking into account the restrictions indicated by locate_keyboard


### Configure the script
The id that we have previously obtained must be assigned in the file of our script.
```sh
keyboard_id = '1451C1FC'
lmc_device_set_name ("MACROS", keyboard_id)
```

It is also necessary to assign the path of the possible scripts used (eg constant files) (do not replace the '?' With anything, this marks the folder path)
```sh
scripts_path = 'C:\\folder_path\\?.lua'
```

### Launch
To launch the script it is necessary to launch the LuaMacros.exe application, load the script and give it to execute

Another option is to schedule its launch at system startup:
```sh
win + r
shell: startup
```
In the folder that opens paste a shortcut to LuaMacros.exe
Edit this access and in the _destination_ field add the address of the script that we want to launch
```sh
C:\...\ LuaMacros.exe -r C:\...\default-script.lua
```