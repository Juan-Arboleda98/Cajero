// variables globales 
let option
let registros = []
let movimientos = []
let saldo = 0
let intentos = 0
let maxIntentos = 3

// menu con do while y switch y logica para el inicio de sesion seguro de solo 3 intentos
do{
    option = parseInt(prompt(
        "====== Menú =======\n"+
        '1. Iniciar\n'+
        '2. Registrar\n'+
        '3. Salir\n'
    ))
    
    switch (option){
        case 1:
            if(intentos < maxIntentos){
            iniciar()
            }else{
                alert('vuelve en 24 horas')
                console.log('vuelve en 24 horas')
            }
            break;
        case 2:
            registro()
            break;
        case 3:
            console.log('Que tenga un buen día')
            alert('Que tenga un buen día')
            break;   
        default:   
        alert('Elija una opcion valida')      
    }
}while(option !== 3)

    


//funcion de registro con validaciones de campos vacios y arraylist para agregar nuevo usuario para inicio de sesion ylogica para registro seguro
function registro () {
    let id = prompt('Identificación')
    let user = prompt('Usuario')
    let mail = prompt('Correo')
    let pass = prompt('Clave')
    let repass = prompt('Repetir clave')

    //vlidacion de campos
    if(!id || !user || !mail || !pass || ! repass){
        alert(' Todos los campos son obligatorios')
        console.log(' Todos los campos son obligatorios')
        return
    }

    if(pass === repass){
        let nuevoUsuario = {
            id: id,
            usuario: user,
            correo: mail,
            clave: pass
        }
        registros.push(nuevoUsuario)
        alert('Su registro a sido exitoso')
        console.log('Su registro a sido exitoso')
    }else{
        alert('!LAS CLAVES NO COICIDEN')
        console.log('!LAS CLAVES NO COICIDEN')
    }
    
}

// funcion iniciar sesion con validacion de entrada y validacion de usuario registrado gracias ala arraylist busca el primer usuario registrado gracias al .fin y crea un objeto temporal que coincida con usser y el pass ya registrado tiene la logica de intentos de solo 3 si lo sobrepasa sale el mensaje de bloqueado por 24h  y hay que hacer un nuevo registro 
function iniciar(){
    
    do{

    let user = prompt('Usuario') 
    let pass = prompt('Clave') 

    // validación de entrada 
    if(!user || !pass){
        alert('Debe ingresar usuario y clave')
        console.log('Debe ingresar usuario y clave')
        return
    }

    let listaUsuarios = registros.find(u => u.usuario === user && u.clave === pass)

    if(listaUsuarios){
        alert('bienvenido  ' + listaUsuarios.usuario)
        console.log('bienvenido  ' + listaUsuarios.usuario)
        consultasMovimientos()
        return
    }else{
        intentos ++
        alert(`Usuario o clave incorrectos ${intentos} de ${maxIntentos} intentos permitidos`)
        console.log(`Usuario o clave incorrectos${intentos} de ${maxIntentos} intentos permitidos`)
    }

    }while(intentos < maxIntentos)

        alert(`Usuario no encontrado, volver a intentar en 24 horas`)
        console.log(`Usuario no encontrado, volver a intentar en 24 horas`)
}

// funcion consultarMovimientos esta funcion tiene un submenu con las opciones para usuario ya registrado y puede escogerllas gracias a un switch y llamar funciones
function consultasMovimientos(){

do{

     option = parseInt(prompt(
        "====== Menú =======\n"+
        '1. Retirar\n'+
        '2. Consignar\n'+
        '3. Consultar Saldo\n'+
        '4. Consultar Movimientos\n'+
        '5. cambio de contraseña\n'+
        '6. salir\n'
        
    ))

    switch(option){
        case 1:
            retirar()
            break;
        case 2:
            consignar()
            break;
        case 3:
            consultarSaldo()
            break;
        case 4:
            consultarMovimientos()
            break;
        case 5:
            cambioContraseña()
            break;
        case 6:  
            alert('Gracias por consultar')
            console.log('Gracias por consultar')
            break ;
        default: 
    }
    
}while(option !== 6)
}

// funcion consignar gracias a esta funcion el usuario puedo consignar dinero pero solo cuando ya este registrado hay una logica que el valor inicia desde 0 y gracias a un acomulador va subiendo el saldo gracias a la misma logica aparece mensajes de consignacion exitosa y si no consigana nada aparece un alerta que debe ser mayor de 0 y en esta funcion hay otra funcion que guarda los mivimientos entrada
function consignar(){
let valor = parseFloat(prompt('Ingrese valor a consignar: '))
if(valor > 0){
    saldo += valor
    registrarMovimientos('Congsignación', valor)
    alert('Consignación exitosa. Saldo actual ' + saldo)
    console.log('Consignación exitosa. Saldo actual ' + saldo)
}else{
    alert('el valor debe ser mayor que 0')
    console.log('el valor debe ser mayor que 0')
}
}

// funcion retirar con esta funcion podemos retirar el dinero que se consigno, se hace gracias la variable valor que guarda el monto en la variable saldo que esta global hay una logica que si el valor a retirar es mayor a saldo aparece una alerta que dice No tiene suficiente saldo y si el valor a retirar es mayor a 0 se descuenta del saldo actual asta llegar 0 gracias ala resta acomulada en esta funcion hay otra funcion que guarda los mivimientos de salida
function retirar(){
    let valor = parseFloat(prompt(' Ingrese el valor a retirar'))

    if(valor > saldo){
        alert('No tiene suficiente saldo')
        console.log('No tiene suficiente saldo')
    }else if(valor > 0){
        saldo -= valor
        registrarMovimientos('Retiro',valor)
        alert('Retiro exitoso. saldo actual ' + saldo )
        console.log('Retiro exitoso. saldo actual ' + saldo )
    }else{
        alert('El valor debe de ser mayor que 0')
        console.log('El valor debe de ser mayor que 0')
    }
}

//funcion consultar saldo con esta funcion podemos acceder ala variable global saldo que dependiendo del las entradas o salidas nos muestra el valor actual
function consultarSaldo(){
    alert('Su saldo actual es: ' + saldo)
    console.log('Su saldo actual es: ' + saldo)
}

//funcion registrar movimientos en esta funcion recibo 2 parametros que estan esatecidos en consignar y retirar consepto segundo la operacion consignar o retiro tengo un objeto de js que me da la hora y la fecha exacta del retiro tambien hay un objeto donde donde voy a guardar los datos de transacsion y guardo este objeto en la lista que tengo gobal para consultar movimientos
function registrarMovimientos(concepto,valor){
    let fecha = new Date().toLocaleString();
    // objeto
    let movimiento = {
        fecha: fecha,
        concepto: concepto,
        valor:valor,
        saldo:saldo
        
    }
    movimientos.push(movimiento)
}

// funcion consultarMovimientos   con esta funcion puedo recorrer el array de movimientos que esta global secrea una variable tempora donde se le asignan los datos de transaccion. que se creo en el objeto  en la funcion registrarMovimientos osea se llaman y se guardan en la variable m para mostrar la infomación de la transaccion y tiene una logica que si aun no hay movimentos le de un alert a l usuario
function consultarMovimientos(){
    if(movimientos.length === 0){
        alert('Aun no hay movimientos')
        console.log('Aun no hay movimientos')
        return
    }
    console.log('Movimientos')
    movimientos.forEach(m => {
        alert(`${m.fecha} | ${m.concepto}: | ${m.valor} | Saldo: ${m.saldo}`)
        console.log(`${m.fecha} | ${m.concepto}: | ${m.valor} | Saldo: ${m.saldo}`)
    })
    
}
//funcion cambio de contraseña gracias a esta funcion podemos darle al usuario la opcion de cambio de contraseña validando el usuario y la contraseña ya existente miramos en la lista con registro.find. y accedemos a la arraylist  registro que esta global y gracias a usuario.clave se puede cambiar los registros 
function cambioContraseña(){
    let user = prompt('Ingrese usuario')
    let contraseñaActual = prompt('Ingrese contraseña actual')

    let usuario = registros.find(u => u.usuario === user && u.clave === contraseñaActual)

    if (usuario){
        let nuevaContraseña = prompt('Ingrese su nueva contraseña')
        let confirmNuevaContraseña = prompt('confirme su nueva contraseña')

        if(nuevaContraseña === confirmNuevaContraseña){ 
        usuario.clave = nuevaContraseña
        alert('Contraseña cambiada con exito')
        }else{
            alert('Contraseña cambiada con exito')
        }
    }else{
        alert('Usuario o contraseña incorrectos')
    }
}




