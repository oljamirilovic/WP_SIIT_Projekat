package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Kupac ;
import beans.Manifestacija;
import beans.Prodavac;
import dao.KupacDAO;
import dao.ProdavacDAO;

public class KupacServices { //blokiranje i brisanje
	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;
	
	public KupacServices() {
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("KupacDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			//ctx.setAttribute("ProdavacDAO", new ProdavacDAO(contextPath));  //ovo jenekako se prosledi
		}
	}
	
	
	
	
	@POST
	@Path("/add")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Kupac  add(Kupac  user) {
		KupacDAO dao = (KupacDAO) ctx.getAttribute("KupacDAO");
		Kupac retVal = dao.addKupac(user);
		ctx.setAttribute("ProdavacDAO", dao);
		return retVal;
	}
	
	
	@GET
	@Path("/search")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Kupac search(String lastname) {
		//TODO: razmisli
		return null;
		/*UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.findAll().stream().filter(user -> user.getPrezime()
				.equals(lastname)).findFirst().orElse(null);*/
				
	}
	

	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Kupac> getProdavci() {
		KupacDAO dao = (KupacDAO) ctx.getAttribute("KupacDAO");
		return dao.findAll();
	}
	
	

	@PUT
	@Path("/blokiraj")
	@Produces(MediaType.APPLICATION_JSON)
	public void blokiraj(Kupac kupac) {
		KupacDAO dao = (KupacDAO) ctx.getAttribute("KupacDAO");
		dao.blokirajKupca(kupac.getIme());
	}
	@DELETE
	@Path("/obrisi")
	@Produces(MediaType.APPLICATION_JSON)
	public void obrisi(Kupac kupac) {
		KupacDAO dao = (KupacDAO) ctx.getAttribute("KupacDAO");
		dao.obrisiKupca(kupac.getIme());
	}

}
