/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.cinema.services;

import edu.eci.arsw.cinema.filter.*;
import edu.eci.arsw.cinema.model.*;
import edu.eci.arsw.cinema.persistence.*;
import java.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.Service;

/**
 * The type Cinema services.
 *
 * @author cristian
 */
@Service("cService")
public class CinemaServices {
    /**
     * The Cps.
     */
    @Autowired
    @Qualifier("inMemoryCP")
    CinemaPersitence cps;
    /**
     * The Cf.
     */
    @Autowired
    @Qualifier("FilterByA")
    CinemaFilterI cf;


    /**
     * Gets all cinemas.
     *
     * @return the all cinemas
     * @throws CinemaException the cinema exception
     */
    public Set<Cinema> getAllCinemas() throws CinemaException {
        return cps.getAllCinemas();
    }

    /**
     * Gets cinema by name.
     *
     * @param name cinema's name
     * @return the cinema of the given name created by the given author
     * @throws CinemaException            the cinema exception
     * @throws CinemaPersistenceException the cinema persistence exception
     */
    public Cinema getCinemaByName(String name) throws CinemaException, CinemaPersistenceException {
        return cps.getCinema(name);
    }


    /**
     * Buy ticket.
     *
     * @param row       the row
     * @param col       the col
     * @param cinema    the cinema
     * @param date      the date
     * @param movieName the movie name
     * @throws CinemaException the cinema exception
     */
    public void buyTicket(int row, int col, String cinema, String date, String movieName) throws CinemaException {
        cps.buyTicket(row, col, cinema, date, movieName);
    }

    /**
     * Gets functions by cinema and date.
     *
     * @param cinema the cinema
     * @param date   the date
     * @return the functions by cinema and date
     * @throws CinemaPersistenceException the cinema persistence exception
     */
    public List<CinemaFunction> getFunctionsByCinemaAndDate(String cinema, String date) throws CinemaPersistenceException {
        return cps.getFunctionsbyCinemaAndDate(cinema, date);
    }


    /**
     * Filter list.
     *
     * @param cinema the cinema
     * @param date   the date
     * @param filter the filter
     * @return the list
     * @throws CinemaException            the cinema exception
     * @throws CinemaPersistenceException the cinema persistence exception
     * @throws CinemaFilterException      the cinema filter exception
     */
    public List<Movie> filter(String cinema, String date, String filter) throws CinemaException, CinemaPersistenceException, CinemaFilterException {
        Cinema cinemA = this.getCinemaByName(cinema);
        return cf.filerMovie(cinemA, date, filter);
    }

    /**
     * Gets function by cinema date and movie name.
     *
     * @param cinema    the cinema
     * @param date      the date
     * @param movieName the movie name
     * @return the function by cinema date and movie name
     * @throws CinemaPersistenceException the cinema persistence exception
     */
    public CinemaFunction getFunctionByCinemaDateAndMovieName(String cinema, String date, String movieName) throws CinemaPersistenceException {
        return cps.getFunctionByCinemaDateAndMovieName(cinema, date, movieName);

    }


    /**
     * Add function to cinema.
     *
     * @param name           the name
     * @param cinemaFunction the cinema function
     * @throws CinemaPersistenceException the cinema persistence exception
     */
    public void addFunctionToCinema(String name, CinemaFunction cinemaFunction) throws CinemaPersistenceException {
        Cinema cinema = cps.getCinema(name);
        cinema.addFuncion(cinemaFunction);

    }

    /**
     * Update or create funcion cinema function.
     *
     * @param name           the name
     * @param cinemaFunction the cinema function
     * @return the cinema function
     * @throws CinemaPersistenceException the cinema persistence exception
     */
    public CinemaFunction updateOrCreateFunction(String name, CinemaFunction cinemaFunction) throws CinemaPersistenceException {
        return cps.updateOrCreateFunction(name, cinemaFunction);

    }
}
