package services;

import java.io.IOException;
import java.util.ArrayList;
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

import beans.Karta;
import beans.Kupac;
import beans.Manifestacija;
import beans.TipKupca;
import dao.KupacDAO;

@Path("/customers")
public class KupacService {

	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;
	
	
	public KupacService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("customersDAO")==null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("customersDAO", new KupacDAO(contextPath)); 
		}
	}
	
	
	@GET
	@Path("/getCustomers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Kupac> getCustomers(){
		KupacDAO dao = (KupacDAO) ctx.getAttribute("customersDAO");
		Collection<Kupac> us = dao.findAll();
		if(us == null) {
			dao = new KupacDAO(ctx.getRealPath("")); 
			ctx.setAttribute("customersDAO", dao);
		}
		return us;
		
	}
	
	@POST
	@Path("/searchUsername")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Kupac searchUsername(String name) {
		KupacDAO dao = (KupacDAO) ctx.getAttribute("customersDAO");
		
		String s = name.substring(7, name.length()-2);
		Kupac user = dao.find(s);
		
		return user;
	}
		
	@POST
	@Path("/add")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Kupac add(Kupac user) {
		KupacDAO dao = (KupacDAO) ctx.getAttribute("customersDAO");
		TipKupca tip = new TipKupca("Bronze");
		user.setTip(tip);
		Kupac retVal = dao.addKupac(user);
		ctx.setAttribute("customersDAO", dao);
		try {
			dao.generateJSON(ctx.getRealPath(""));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return retVal;
	}
	
	
	@POST
	@Path("/setCurrentCustomer")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void setCurrentCustomer(Kupac m) {
		m.setTempReservedTypes(new ArrayList<String>());
		ctx.setAttribute("currentCustomer", m); 
		
	}
	
	@GET
	@Path("/getCurrentCustomer")
	@Produces(MediaType.APPLICATION_JSON)
	public Kupac getCurrentCustomer(){
		Kupac m = (Kupac)ctx.getAttribute("currentCustomer");
		return m;
	}
	
	@POST
	@Path("/searchTicketStatus")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public boolean searchTicketStatus(String eventname) {
		String s = eventname.substring(7, eventname.length()-2);
		Kupac k = (Kupac)ctx.getAttribute("currentCustomer");
		if(!k.getKarte().isEmpty()) {
			for (Karta karta : k.getKarte()) {
				if(karta.getNazivmanifestacije().equals(s) && karta.isStatus()) {
					return true;
				}
			}
		}
		
		return false;
	}

	@POST
	@Path("/saveProfileChanges")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Kupac saveProfileChanges(Kupac user) {
		Kupac k = (Kupac)ctx.getAttribute("currentCustomer");
		k.setDatumRodjenja(user.getDatumRodjenja());
		k.setIme(user.getIme());
		k.setLozinka(user.getLozinka());
		k.setPol(user.getPol());
		k.setPrezime(user.getPrezime());
		KupacDAO dao = (KupacDAO) ctx.getAttribute("customersDAO");
		ctx.setAttribute("currentCustomer", k); 
		dao.updateOne(k);
		ctx.setAttribute("customersDAO", dao);
		try {
			dao.generateJSON(ctx.getRealPath(""));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return k;
	}
	
	/*@POST
	@Path("/setCustomerPoints")
	@Consumes({ MediaType.TEXT_PLAIN,MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void setCustomerPoints(String p) {
		String s = p.substring(7, p.length()-2);
		int points = Integer.parseInt(s);
		KupacDAO dao = (KupacDAO) ctx.getAttribute("customersDAO");
		Kupac m = (Kupac)ctx.getAttribute("currentCustomer");
		int current = m.getSakupljeniBodovi() + points;
		m.setSakupljeniBodovi(current);
		if(m.getTip().getBodovi()<=current) {
			TipKupca tipk = new TipKupca();
			if(m.getTip().getTipKupca().equals("Bronze")) {
				tipk.setIme("Silver");
				tipk.setBodovi(4000);
				tipk.setPopust(3);
			}else if(m.getTip().getTipKupca().equals("Silver")) {
				tipk.setIme("Gold");
				tipk.setBodovi(4000);
				tipk.setPopust(5);
			}
			m.setTip(tipk);
		}
		ctx.setAttribute("currentCustomer", m); 
		
		dao.updateOne(m);
		ctx.setAttribute("customersDAO", dao);
		
		try {
			dao.generateJSON(ctx.getRealPath(""));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}*/
	
	@POST
	@Path("/addTempReservedTicketTypes")
	@Consumes({ MediaType.TEXT_PLAIN,MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void addTempReservedTicketTypes(String type) {
		String ss = type.substring(9, type.length()-2);
		String s = ss.split("_")[0];
		Kupac m = (Kupac)ctx.getAttribute("currentCustomer");
		m.addToTemp(s);
		ctx.setAttribute("currentCustomer", m); 
		
	}
	
	@POST
	@Path("/removeTempReservedTicketTypes")
	@Consumes({ MediaType.TEXT_PLAIN,MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void removeTempReservedTicketTypes(String type) {
		String ss = type.substring(9, type.length()-2);
		String s = ss.split("_")[0];
		Kupac m = (Kupac)ctx.getAttribute("currentCustomer");
		m.removeOneTemp(s);
		ctx.setAttribute("currentCustomer", m); 
		
	}
	
	@GET
	@Path("/getTempReservedTicketNumber")
	@Produces(MediaType.APPLICATION_JSON)
	public int getTempReservedTicketNumber(){
		Kupac m = (Kupac)ctx.getAttribute("currentCustomer");
		return m.getTempReservedTypes().size();
	}
	
	
	@POST
	@Path("/removeAllTempReservedTicketTypes")
	public void removeAllTempReservedTicketTypes() {
		Kupac m = (Kupac)ctx.getAttribute("currentCustomer");
		m.setTempReservedTypes(new ArrayList<String>());
		ctx.setAttribute("currentCustomer", m); 
		
	}
}
