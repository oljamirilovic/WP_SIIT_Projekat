package services;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

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
import beans.TipoviManifestacije;
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
		ManifestacijaDAO dao = null;
		Collection<Manifestacija> us = new ArrayList<Manifestacija>();
		
			dao= (ManifestacijaDAO) ctx.getAttribute("eventsDAO");
			us = dao.findAll();
			if(us == null) {
				dao = new ManifestacijaDAO(ctx.getRealPath("")); 
				ctx.setAttribute("eventsDAO", dao);
			}
		
		
		return us;
	}
	
	
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
	
		
	@GET
	@Path("/getTotalCost")
	@Produces(MediaType.APPLICATION_JSON)
	public double getTotalCost() {		
		Manifestacija m = (Manifestacija)ctx.getAttribute("currentEvent");
		Kupac k = (Kupac)ctx.getAttribute("currentCustomer");
		double totalCost = 0;
		for (String s : k.getTempReservedTypes()) {
			if(s.equalsIgnoreCase("Regular")) {
				totalCost += m.getCenaKarte();
			}
			else if(s.equalsIgnoreCase("VIP")) {
				totalCost += m.getCenaKarte()*4;
			}
			else {
				totalCost += m.getCenaKarte()*2;
			}
		}
		return totalCost;
	}
	
	@GET
	@Path("/getEventTypes")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<String> getEventTypes() {		
		Collection<String> ret = new ArrayList<String>();
		for (TipoviManifestacije tip : TipoviManifestacije.values()) {
			ret.add(tip.toString());
		}
		return ret;
	}
	
}
