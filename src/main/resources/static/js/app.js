var app = (function () {
        var api = apiclient;
        var nombreCine = "";
        var fechaFuncion = "";
        var listaFunciones = [];
        var listaSillas = [];
        var numberSeats = 0;


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
            numberSeats = 0;
            lapiz.strokeStyle = 'lightgrey';
            for (let i = 0; i < 7; i++) {
                for (let j = 0; j < 12; j++) {
                    if (sillitas[i][j] === true) {
                        lapiz.fillStyle = "#34BF49";
                        numberSeats++;
                        console.log(numberSeats)
                    } else {
                        lapiz.fillStyle = "#FF4C4C";
                    }
                    lapiz.fillRect(j * 65, i * 65, 60, 60);
                }
            }
            console.log(numberSeats)
        }

        return {
            dibujarObjetos(nombre, fecha, nombrePelicula) {
                console.log(fecha)
                console.log(nombrePelicula)

                $("#availability").text("Availability of: " + nombrePelicula);

                api.getFunctionsByCinemaAndDate(nombre, fecha, (funciones) => {
                    for (const funcion of funciones) {
                        if (funcion.movie.name === nombrePelicula) {
                            dibujarObjetos(funcion.seats);
                            break;
                            //:3
                        }
                    }
                    $("#numSeats").text("Number of available chairs: " + numberSeats);
                    console.log(numberSeats + "---------------")
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
