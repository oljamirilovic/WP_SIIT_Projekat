package services;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
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
		Manifestacija m = (Manifestacija)ctx.getAttribute("currentEvent"); //TODO vrati na staroooo
		if(m!=null) {
		return m;}
		return ((ManifestacijaDAO)ctx.getAttribute("eventsDAO")).getManifestacije().get("Virtual Big Art Show");
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
	
	@GET
	@Path("/aproveCurrentEvent")
	public void aproveCurrentEvent() {		
		Manifestacija m = (Manifestacija)ctx.getAttribute("currentEvent");
		m.setStatus(true);
		ctx.setAttribute("currentEvent", m); 
		ManifestacijaDAO dao = (ManifestacijaDAO) ctx.getAttribute("eventsDAO");
		dao.updateOne(m);
		ctx.setAttribute("eventsDAO", dao);
		try {
			dao.generateJSON(ctx.getRealPath(""));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@GET
	@Path("/dismissCurrentEvent")
	public void dismissCurrentEvent() {		
		Manifestacija m = (Manifestacija)ctx.getAttribute("currentEvent");
		m.setStatus(false);
		m.setIzbrisana(true);
		ctx.setAttribute("currentEvent", m); 
		ManifestacijaDAO dao = (ManifestacijaDAO) ctx.getAttribute("eventsDAO");
		dao.updateOne(m);
		ctx.setAttribute("eventsDAO", dao);
		try {
			dao.generateJSON(ctx.getRealPath(""));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	

	@POST
	@Path("/add")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Manifestacija  add(HashMap<String, String>  event1) {
		Manifestacija event=new Manifestacija(event1);//{fan=3, datumVreme=2021-06-20, brojMesta=3, cenaKarte=3444, naziv=f, tip=3, vip=3, krajProslave=2021-06-26}
		System.out.println(event1);
		ManifestacijaDAO dao = (ManifestacijaDAO) ctx.getAttribute("eventsDAO");
		Manifestacija retVal = dao.addEvent(event);
		return retVal;
	}
	@POST
	@Path("/exists")
	@Consumes({ MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Manifestacija findOne(HashMap<String,String> name1) {
		ManifestacijaDAO dao = (ManifestacijaDAO) ctx.getAttribute("eventsDAO");
		System.out.println(name1);//prbaj da na trazeni dodas  {"id":" "} za svaki slucaj
		Manifestacija m = dao.find(name1.get("id"));
		return m;
	}
	@DELETE
	@Path("/delete")
	@Produces(MediaType.APPLICATION_JSON)
	public void obrisi(Manifestacija m) {
		ManifestacijaDAO dao = (ManifestacijaDAO) ctx.getAttribute("eventsDAO");
		dao.obrisi(m.getNaziv());
	}
	@GET
	@Path("/getOneManifestation")
	@Produces(MediaType.APPLICATION_JSON)
	public Manifestacija getOneManifestation(){
		ManifestacijaDAO dao =  (ManifestacijaDAO) ctx.getAttribute("eventsDAO");
		for(Manifestacija m:dao.getManifestacije().values()) {
			return m;
		}
		return null;
		
		 
	}

	@POST
	@Path("/odobri")
	@Consumes({ MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public void odobri(HashMap<String,String> name1) {
		ManifestacijaDAO dao = (ManifestacijaDAO) ctx.getAttribute("eventsDAO");
		System.out.println(name1.get("id"));
		dao.odobri(name1.get("id"));
	}
	@POST
	@Path("/change")
	@Consumes({ MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public void izmeni(HashMap<String,String> name1) {//{dan=2021-05-31, fan=200, kraj=2021-05-31, ukupno=1000, naziv=Pink m, tip=Concert, cena=1000, vip=299}
		ManifestacijaDAO dao = (ManifestacijaDAO) ctx.getAttribute("eventsDAO");
		System.out.println(name1);
		dao.izmeni(name1.get("naziv"),name1.get("dan"),name1.get("fan"),name1.get("kraj"),name1.get("ukupno"),name1.get("tip"),name1.get("cena"),name1.get("vip"));
	}

}
