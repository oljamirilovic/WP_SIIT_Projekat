package services;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Kupac;
import beans.Manifestacija;
import dao.KupacDAO;
import dao.ManifestacijaDAO;

@Path("/events")
public class ManifestacijaServices {
	
	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;
	
	public ManifestacijaServices() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("eventsDAO")==null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("eventsDAO", new ManifestacijaDAO(contextPath)); 
		}
	}

	@GET
	@Path("/getEvents")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Manifestacija> getEvents(){
		ManifestacijaDAO dao = (ManifestacijaDAO) ctx.getAttribute("eventsDAO");
		Collection<Manifestacija> us = dao.findAll();
		if(us == null) {
			dao = new ManifestacijaDAO(ctx.getRealPath("")); 
			ctx.setAttribute("eventsDAO", dao);
		}
		return us;
		//vraca listu svih korisnika koje imamo kao json
	}
	
	//TODO add
	
	
	@POST
	@Path("/searchEvent")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Manifestacija searchEvent(String name) {
		ManifestacijaDAO dao = (ManifestacijaDAO) ctx.getAttribute("eventsDAO");
		
		String s = name.substring(7, name.length()-2);
		Manifestacija user = dao.find(s);
		
		return user;
	}
	
	@POST
	@Path("/setCurrentEvent")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void setCurrentEvent(Manifestacija m) {
		ctx.setAttribute("currentEvent", m); 
		
	}
	
	@GET
	@Path("/getCurrentEvent")
	@Produces(MediaType.APPLICATION_JSON)
	public Manifestacija getCurrentEvent(){
		Manifestacija m = (Manifestacija)ctx.getAttribute("currentEvent");
		return m;
	}
	
	
}
