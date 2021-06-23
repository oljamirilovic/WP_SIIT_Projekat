package services;

import java.io.IOException;
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
import beans.Prodavac;
import dao.KupacDAO;
import dao.ProdavacDAO;

@Path("/salesmen")
public class ProdavacService {
	
	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;	

	public ProdavacService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("salesmenDAO")==null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("salesmenDAO", new ProdavacDAO(contextPath)); 
		}
	}
	
	@GET
	@Path("/getSalesman")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Prodavac> getSalesman(){
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		Collection<Prodavac> us = dao.findAll();
		if(us == null) {
			dao = new ProdavacDAO(ctx.getRealPath("")); 
			ctx.setAttribute("salesmenDAO", dao);
		}
		return us;
	}
	
	@POST
	@Path("/searchUsername")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Prodavac searchUsername(String name) {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		
		String s = name.substring(7, name.length()-2);
		Prodavac user = dao.find(s);
		
		return user;
	}
	
	@POST
	@Path("/setCurrentSalesmen")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void setCurrentSalesmen(Prodavac m) {
		ctx.setAttribute("currentSalesmen", m); 
		
	}
	
	@GET
	@Path("/getCurrentSalesmen")
	@Produces(MediaType.APPLICATION_JSON)
	public Prodavac getCurrentSalesmen(){
		Prodavac m = (Prodavac)ctx.getAttribute("currentSalesmen");
		return m;
	}
	
	@POST
	@Path("/saveProfileChanges")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Prodavac saveProfileChanges(Prodavac user) {
		Prodavac k = (Prodavac)ctx.getAttribute("currentSalesmen");
		k.setDatumRodjenja(user.getDatumRodjenja());
		k.setIme(user.getIme());
		k.setLozinka(user.getLozinka());
		k.setPol(user.getPol());
		k.setPrezime(user.getPrezime());
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		ctx.setAttribute("currentSalesmen", k); 
		dao.updateOne(k);
		ctx.setAttribute("salesmenDAO", dao);
		try {
			dao.generateJSON(ctx.getRealPath(""));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return k;
	}
	
}
