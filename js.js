let option
let registros = []
let movimientos = []
let saldo = 0
let intentos = 0
let maxIntentos = 3

do{
    option = prompt(
        "====== Menú =======\n"+
        '1. Iniciar\n'+
        '2. Registrar\n'+
        '3. Elija Respuesta\n'
    )
    switch (option){
        case '1':
            if(intentos < maxIntentos){
            iniciar()
            }else{
                alert('vuelve en 24 horas')
                console.log('vuelve en 24 horas')
            }
            break;
        case '2':
            registro()
            break;
        case '3':
            console.log('Elija una opción valida')
            alert('Eliga una opcion valida')
            break;   
        default:         
    }
}while(option !== '4')



function registro () {
    let id = prompt('Identificación')
    let user = prompt('Usuario')
    let mail = prompt('Correo')
    let pass = prompt('Clave')
    let repass = prompt('Repetir clave')

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

function iniciar(){
    
    do{

    let user = prompt('Usuario') 
    let pass = prompt('Clave') 

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

function consultasMovimientos(){

do{

     option = prompt(
        "====== Menú =======\n"+
        '1. Retirar\n'+
        '2. Consignar\n'+
        '3. Consultar Saldo\n'+
        '4. Consultar Movimientos\n'+
        '5. salir\n'
        
    )

    switch(option){
        case '1':
            retirar()
            break;
        case '2':
            consignar()
            break;
        case '3':
            consultarSaldo()
            break;
        case '4':
            consultarMovimientos()
            break;
        case '5':
            alert('Gracias por consultar')
            console.log('Gracias por consultar')
            break ;
        default: 
    }
    
}while(option !== '5')
}

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

function consultarSaldo(){
    alert('Su saldo actual es: ' + saldo)
    console.log('Su saldo actual es: ' + saldo)
}
function consultarMovimientos(){
    console.log('Movimientos')
    movimientos.forEach(m => {
        alert(`${m.fecha} | ${m.concepto}: | ${m.valor} | Saldo: ${m.saldo}`)
        console.log(`${m.fecha} | ${m.concepto}: | ${m.valor} | Saldo: ${m.saldo}`)
    })
}

function registrarMovimientos(concepto,valor){
    let fecha = new Date().toLocaleString();

    let movimiento = {
        fecha: fecha,
        concepto: concepto,
        valor:valor,
        saldo:saldo
        
    }
    movimientos.push(movimiento)
}


