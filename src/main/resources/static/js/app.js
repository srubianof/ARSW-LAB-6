var app = (function () {
        var api = apiclient;
        var nombreCine = "";
        var fechaFuncion = "";
        var listaFunciones = [];
        var listaSillas = [];


        var mapObjetos = (funciones) => {
            listaFunciones = funciones.map(({movie: {name, genre}, date}) => ({
                    name: name,
                    genre: genre,
                    time: date.split(" ")[1],
                    date: date
                })
            )
            $("#tablaMovies > tbody").empty();
            listaFunciones.forEach(({name, genre, time, date}) => {
                $("#tablaMovies > tbody").append(
                    `<tr>
                    <td> ${name} </td>
                    <td> ${genre} </td>
                    <td> ${time} </td>
                    <td> <button type="button" class="btn btn-success btn-lg btn-block" onclick="app.dibujarObjetos($('#cinemaName').val(),'${date}','${name}')">Ver Sillas</button> </td>
                    </tr>`
                );
            });
        }
        var dibujarObjetos = function (sillitas) {
            var canvas = document.getElementById("myCanvas");
            var lapiz = canvas.getContext("2d");
            console.log(sillitas);
            lapiz.strokeStyle = 'lightgrey';
            for (let i = 0; i < 7; i++) {
                for (let j = 0; j < 12; j++) {
                    if (sillitas[i][j] === true) {
                        lapiz.fillStyle = "#FFC300";
                    } else {
                        lapiz.fillStyle = "#900C3F";
                    }
                    lapiz.fillRect(j * 85, i * 85, 80, 80);
                }
            }
        }

        return {
            dibujarObjetos(nombre, fecha, nombrePelicula) {
                console.log(fecha)
                console.log(nombrePelicula)
                api.getFunctionsByCinemaAndDate(nombre, fecha, (funciones) => {
                    for (const funcion of funciones) {
                        if (funcion.movie.name === nombrePelicula) {
                            dibujarObjetos(funcion.seats);
                            break;
                            //:3
                        }
                    }
                })
            },
            actualizarListadodeFunciones(nombre, fecha) {
                this.cambiarFecha(fecha);
                this.cambiarNombreCine(nombre);
                api.getFunctionsByCinemaAndDate(nombre, fecha, mapObjetos);
            },
            consultarAsientosDisponibles(nombreCine, fecha, nombrePelicula) {
                api.getFunctionsByCinemaAndDate(nombreCine, fecha, dibujarObjetos);
            },
            cambiarNombreCine(nombre) {
                nombreCine = nombre;
            },
            cambiarFecha(fecha) {
                fechaFuncion = fecha;
            }
        }
    }
)();
