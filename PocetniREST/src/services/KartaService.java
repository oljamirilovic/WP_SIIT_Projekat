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

import com.sun.xml.internal.ws.util.StringUtils;

import beans.Karta;
import beans.Kupac;
import beans.Manifestacija;
import beans.TipKupca;
import dao.KartaDAO;
import dao.KupacDAO;
import dao.ManifestacijaDAO;

@Path("/tickets")
public class KartaService {

	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;
	
	public KartaService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("ticketsDAO")==null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("ticketsDAO", new KartaDAO(contextPath)); 
		}
	}
	
	@GET
	@Path("/getTickets")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Karta> getTickets(){
		KartaDAO dao = (KartaDAO) ctx.getAttribute("ticketsDAO");
		Collection<Karta> us = dao.findAll();
		if(us == null) {
			dao = new KartaDAO(ctx.getRealPath("")); 
			ctx.setAttribute("ticketsDAO", dao);
		}
		return us;
		
	}
	
	@POST
	@Path("/searchOwner")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Karta> searchOwner(String customerName) {
		KartaDAO dao = (KartaDAO) ctx.getAttribute("ticketsDAO");
		
		String s = customerName.substring(7, customerName.length()-2);
		
		return dao.searchCustomer(s);
	}
	
	
	@POST
	@Path("/add")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void add(Karta karta) {
		KartaDAO dao = (KartaDAO) ctx.getAttribute("ticketsDAO");
		Collection<Karta> us = dao.findAll();
		int id = us.size()+1;
		String id_str = String.valueOf(id);
		String ten_lenght = "";
		for(int i =0 ; i <= 10 - id_str.length(); i++) {
			ten_lenght += "0";
		}
		ten_lenght += id_str;
		
		karta.setId(ten_lenght);
		
		Karta retval = dao.addKarta(karta);
		
		ctx.setAttribute("ticketsDAO", dao);
		try {
			dao.generateJSON(ctx.getRealPath(""));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@POST
	@Path("/addAllReservedAndSetCustomerPoints")
	public void addAllReservedAndSetCustomerPoints() {
		KartaDAO dao = (KartaDAO) ctx.getAttribute("ticketsDAO");
		KupacDAO kupacdao = (KupacDAO) ctx.getAttribute("customersDAO");
		ManifestacijaDAO manifdao = (ManifestacijaDAO) ctx.getAttribute("eventsDAO");
		Kupac kupac = (Kupac)ctx.getAttribute("currentCustomer");
		Manifestacija manif = (Manifestacija)ctx.getAttribute("currentEvent");
		
		double points = 0;
		Collection<Karta> us = dao.findAll();
		int size = us.size();
		for (String type : kupac.getTempReservedTypes()) {			
			String id_str = String.valueOf(++size);
			String ten_lenght = "";
			for(int i =0 ; i < 10 - id_str.length(); i++) {
				ten_lenght += "0";
			}
			ten_lenght += id_str;
			
			double cena = 0;
			if(type.equalsIgnoreCase("Regular")) {
				manif.setPreostaloRegular(manif.getPreostaloRegular()-1);
				cena = manif.getCenaKarte();
			}
			else if(type.equalsIgnoreCase("VIP")) {
				manif.setPreostaloVip(manif.getPreostaloVip()-1);
				cena = manif.getCenaKarte()*4;
			}
			else {
				manif.setPreostaloFanpit(manif.getPreostaloFanpit()-1);
				cena = manif.getCenaKarte()*2;
			}
			
			Karta novaKarta = new Karta(ten_lenght, manif.getDatumPocetka(), cena, true, type, false, kupac.getKorisnickoIme(), manif.getNaziv());
			Karta retval = dao.addKarta(novaKarta);
			ctx.setAttribute("ticketsDAO", dao);
			try {
				dao.generateJSON(ctx.getRealPath(""));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			kupac.addKarta(novaKarta);
			
			//AddCustomerPoints
			points = cena/1000*133;
			double current = kupac.getSakupljeniBodovi() + points;
			kupac.setSakupljeniBodovi(current);
			if(kupac.getTip().getBodovi()<=current) {
				TipKupca tipk = new TipKupca();
				if(kupac.getTip().getTipKupca().equals("Bronze")) {
					tipk.setIme("Silver");
					tipk.setBodovi(4000);
					tipk.setPopust(3);
				}else if(kupac.getTip().getTipKupca().equals("Silver")) {
					tipk.setIme("Gold");
					tipk.setBodovi(4000);
					tipk.setPopust(5);
				}
				kupac.setTip(tipk);
			}
		}
		
		
		
		kupac.setTempReservedTypes(new ArrayList<String>());
		ctx.setAttribute("currentCustomer", kupac);
		
		kupacdao.updateOne(kupac);
		ctx.setAttribute("customersDAO", kupacdao);
		
		ctx.setAttribute("currentEvent", manif);
		
		manifdao.updateOne(manif);
		ctx.setAttribute("eventsDAO", manifdao);
		
		try {
			kupacdao.generateJSON(ctx.getRealPath(""));
			manifdao.generateJSON(ctx.getRealPath(""));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
