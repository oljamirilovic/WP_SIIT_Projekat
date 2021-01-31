package services;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Manifestacija;
import dao.ManifestacijaDAO;

@Path("/events")
public class ManifestacijaServices {
	
	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;
	
	public ManifestacijaServices() {
		
	}
	
	/*TODO konstruktor bez parametara kod ManifestacijeDAO
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("eventsDAO")==null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("eventsDAO", new ManifestacijaDAO()); 
		}
	}*/

	@GET
	@Path("/getEvents")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Manifestacija> getUsers(){
		ManifestacijaDAO dao = (ManifestacijaDAO) ctx.getAttribute("eventsDAO");
		Collection<Manifestacija> us = dao.findAll();
		if(us == null) {
			//dao = new ManifestacijaDAO(); TODO konstruktor
			ctx.setAttribute("userDAO", dao);
		}
		return us;
		//vraca listu svih korisnika koje imamo kao json
	}
	
	//TODO saerch and add
	
	
	
}
