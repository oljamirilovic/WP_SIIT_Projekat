 package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Karta;
import beans.Manifestacija;
import dao.KartaDAO;
import dao.ManifestacijaDAO;

public class KartaServices {
	@Context
	ServletContext ctx;
	
	
	public KartaServices() {
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("KartaDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			//ctx.setAttribute("ManifestacijaDAO", new ManifestaDAO(contextPath));  //ovo jenekako se prosledi
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Karta> getKarte() {
		KartaDAO dao = (KartaDAO) ctx.getAttribute("KartaDAO");
		return dao.findAll();
	}
	
	

	
	
	@PUT
	@Path("/products/{ime}")
	@Produces(MediaType.APPLICATION_JSON)                 
	@Consumes(MediaType.APPLICATION_JSON)                
	public Karta update(Karta karta) {
		KartaDAO dao=(KartaDAO) ctx.getAttribute("KartaDAO");
		dao.izmeni(karta);
		
		return dao.nadjiJednuKartu(karta.getId());
		
	}
	@DELETE
	@Path("/products/{ime}")
	@Produces(MediaType.APPLICATION_JSON)
	public void delete(String ime) {
		KartaDAO dao=(KartaDAO) ctx.getAttribute("KartaDAO");
		if(dao.nadjiJednuKartu(ime)!=null) {
			dao.obrisi(ime);
		}
	}

}
