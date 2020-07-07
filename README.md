- Access Token (AT) = JWT
- Refresh Token (RT) = Crypto Module
- Blacklisting. Consiste pasar los toquen que llegan por el filtro de la blacklist y asi poder rechazarlos apens lleguen. La lista se almacena preferiblemente con Redis pero lo voy a implementar con un array in-memory para probar. El tiempo de duracion de un registro en el blacklist debe ser igual o menor al tiempo de expiracion que se asigna a los JWT = AT
- CronJob que genere una nueva key (secret) cada 24 horas para generar los JWT. En las madrugadas para afectar pocos usuarios.

  \*\*0.- Registro. Enviar correo de confirmacion.
  1.- Request con user y pass (Authentication) o AT y RT si existe una sesion activa.
  2.- Autentico los datos con la BD, incluido Blacklist y los datos del dispositivo en BD.
  3.- Genero AT y RT para enviarlos en el response. (Ver como generar RT jerarquicos, que la generacion de uno nuevo anule automaticamente los anteriores).
  -Incluir una porcion del principio del RT (entre 3 y 5 caracteres) en el payload del AT con la key jti (JWT ID). Con eso y el user, cuyo id va en la key aud se puede asociar el AT al RT, asi cuando se invalide un RT se puede invalidar el AT asociado a el.

  4.- Aviso al usuario por correo y/o sms, que se inicio una nueva sesion (enviar los datos de la sesion).
  5.- Almaceno ambos token en una secure cookie en el frontend, same domain (leer MDN)
  6.- Desde el frontend envio el AT en cada request. Cuando expira entonces pido el RT desde el backend.
  7.- El frontend envia el RT para renovar sus tokens.
  8.- El backend vuelve a hacer los chequeos del paso 2 para generar nuevos tokens y enviarlos al frontend.
  9.- Se mantiene en BD un solo RT, el mas reciente, y en lru-cache con un expiration time igual al AT el RT anterior. Hasta que el frontend no haga una request con el AT nuevo no se recomienda invalidar (borrar) el RT anterior porque puede que no le haya llegado en buena forma el RT nuevo y eso provoque un cierre de sesion no deseado. Una opcion para un proyecto que escale puede ser Redis.
  10.- Invalidar el RT anterior cuando se reciba el nuevo AT.
  11.- Thetf Detection. Si se detecta que alguien distinto al usuario uso el RT entonces se cierra la sesion y se le notifica al usuario via correo y se pide una recuperacion de contraseña.
  .- En logout remover los tokens del frontend y la BD.

//fingerprint = { navigator.userAgent, navigator.languages, navigator.platform,Intl.DateTimeFormat().resolvedOptions().timeZone }
se puede agregar ip del request tambien

Authentication:
Github. Verify email (admit resend the code and expires in 1 hour).
Upwork. Ask for your secret question.
