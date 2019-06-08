
	const pantalla = document.getElementById('pantalla');
	const contenido = document.getElementById('contenido');
	const resultado = document.getElementById('resultado');
	const borrartodo =document.getElementById('borrartodo');
	const grid = document.getElementById('grid-container');
	let igualar = false;
	//pone en '0' las pantallas 
	let limpiar = () => {contenido.textContent = '0'; resultado.textContent = '0';}
	
	borrartodo.addEventListener('click', limpiar)
	grid.addEventListener('click', teclas);

	function operacion(numeros) {
		sobreescribirCero(numeros);
		
		if (isNaN(lastValue()) && isNaN(numeros)) {
			//reemplaza los símbolos de -,+,*,/ en caso de ser ingresados consecutivamente
			   contenido.textContent = contenido.textContent.substring(0, contenido.textContent.length - 1); 
		}       
		
		//sobreescribe el resultado luego de haber puesto ENTER o '=' para realizar nuevo operación

		igualar ? (contenido.textContent = numeros, igualar = false): contenido.textContent += numeros;
		escribeResultado();
		controlDePantalla();
	}

	function sobreescribirCero(num) {
			//permite 0 con decimales
		if (contenido.textContent == '0' && num != '.' && !isNaN(num)) {
			 //sobreescribir el 0 en la primer entrada (lo deja vacío para insertar un número a partir de 0 incluido)
			contenido.textContent = '';   
			igualar = false;
		}
	}
	//achica los números para no exceder el tamaño de pantalla
	function controlDePantalla() {
		if (contenido.textContent.length < 15 || resultado.textContent.length < 15) {
			contenido.style.fontSize='35px';
			resultado.style.fontSize='30px';
		}
		else if (contenido.textContent.length > 14|| resultado.textContent.length > 14) {
			contenido.style.fontSize='25px';
			resultado.style.fontSize='20px';
		}

		if (contenido.textContent.length == 20) {
			contenido.textContent=contenido.textContent.substring(contenido.textContent.length - 1);
		}
		
	}

	const escribeResultado = () => resultado.textContent = eval(contenido.textContent); //va mostrando el resultado mientras se ingresan números
	
	const resultadoAContenido = () => {/*pasa el resultado a la pantalla principal*/
		contenido.textContent = resultado.textContent; resultado.textContent = ''; igualar = true; }

	const lastValue = () => contenido.textContent.substring(contenido.textContent.length - 1); //devuelve el último ingresado. si el valor es 96, devuelve el 6 (String). para check si se ingresan 2 símbolos matem seguidos
	
	//tecla Del, borra el último ingreso. Si se ingresa 25, borra el 5
	function borrarUltimo() {
		contenido.textContent = contenido.textContent.substring(0,contenido.textContent.length - 1);
		resultado.textContent = resultado.textContent.substring(0,resultado.textContent.length - 1);
		controlDePantalla();
		if (contenido.textContent == '') {
			contenido.textContent = '0';
			resultado.textContent = '0';
		}
	}

	function teclas(e) {
		switch (e.target.textContent) {
			case 'C': limpiar();
				break;
			case 'Del': borrarUltimo();
				break;
			case ',':
				contenido.textContent += '.';
				break;
			case '=':
				resultadoAContenido();
				break;

			default:
				//evita que al clickear la pantalla se llene de números: resultado, contenido y patantalla resueltos con pointer events en CSS
			if (e.target.textContent != grid.textContent ) {
				//después de ejecutar un = o ENTER evita que los símbolos reemplacen al número ingresado para poder hacer (resultado) +,-,/,* (nuevo número)
				if (e.target.textContent == '+' || e.target.textContent == '-' || e.target.textContent == '*' || e.target.textContent == '/' ) {
					igualar = false;
				}
				//si son números se ejecuta la operación
				operacion(e.target.textContent); 
			}	
				break;
		}
	}

// Toma valores del teclado	físico  
//Ej: keyCode de 1 = 97. valor Unicode = 49. String.fromCharCode convierte el 49 en 1. 
document.onkeydown = function (e){
							/*Unicode charcode*/
		e.keyCode === 96 || e.keyCode === 48 ? (sobreescribirCero(), operacion(String.fromCharCode(48))) :								/*0*/
		e.keyCode === 97 || e.keyCode === 49 ? (sobreescribirCero(), operacion(String.fromCharCode(49))) : 								/*1*/
		e.keyCode === 98 || e.keyCode === 50 ? (sobreescribirCero(), operacion(String.fromCharCode(50))) :								/*2*/
		e.keyCode === 99 || e.keyCode === 51 ? (sobreescribirCero(), operacion(String.fromCharCode(51))) :								/*3*/
		e.keyCode === 100 || e.keyCode === 52 ? (sobreescribirCero(), operacion(String.fromCharCode(52))) :								/*4*/
		e.keyCode === 101 || e.keyCode === 53 ? (sobreescribirCero(), operacion(String.fromCharCode(53))) :								/*5*/
		e.keyCode === 102 || e.keyCode === 54 ? (sobreescribirCero(), operacion(String.fromCharCode(54))) :								/*6*/
		e.keyCode === 103 || e.keyCode === 55 ? (sobreescribirCero(), operacion(String.fromCharCode(55))) :								/*7*/
		e.keyCode === 104 || e.keyCode === 56 ? (sobreescribirCero(), operacion(String.fromCharCode(56))) :								/*8*/
		e.keyCode === 105 || e.keyCode === 57 ? (sobreescribirCero(), operacion(String.fromCharCode(57))) :								/*9*/	
		e.keyCode === 106 || e.keyCode === 42 ? (igualar = false, contenido.textContent += String.fromCharCode(42)) :					/* * */
		e.keyCode === 107 || e.keyCode === 43 ? (igualar = false, contenido.textContent += String.fromCharCode(43)) :					/*+*/
		e.keyCode === 109 || e.keyCode === 45 ? (igualar = false, contenido.textContent += String.fromCharCode(45)) :					/*-*/
		e.keyCode === 110 || e.keyCode === 46 ? (igualar = false, contenido.textContent += String.fromCharCode(46)) :					/* . */
		e.keyCode === 111 || e.keyCode === 47 ? (igualar = false, contenido.textContent += String.fromCharCode(47)) :					/* / */
		e.keyCode === 106 || e.keyCode === 42 ? (igualar = false, contenido.textContent += String.fromCharCode(42)) :					/* */
		e.keyCode === 13 ? resultadoAContenido():																						/*ENTER*/
		e.keyCode === 8 ? borrarUltimo(): void 0;																						/*backspace*/
}